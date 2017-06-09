import re
import logging

from django import http
from django.conf import settings

import requests

PRERENDER_TOKEN = getattr(settings, 'PRERENDER_TOKEN', None)
PRERENDER_UA_REGEX = getattr(settings, 'PRERENDER_UA_REGEX', "Ask Jeeves|baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator")
PRERENDER_GOOGLEBOT = getattr(settings, 'PRERENDER_GOOGLEBOT', False)
PRERENDER_BINGBOT = getattr(settings, 'PRERENDER_BINGBOT', False)
PRERENDER_PROXY = getattr(settings, 'PRERENDER_PROXY', 'https://service.prerender.io/')

PRERENDER_PATHS_EXACT = getattr(settings, 'PRERENDER_PATHS_EXACT', ())
PRERENDER_PATHS_STARTSWITH = getattr(settings, 'PRERENDER_PATHS_STARTSWITH', ())

if PRERENDER_GOOGLEBOT:
  PRERENDER_UA_REGEX = 'googlebot|' + PRERENDER_UA_REGEX
  
if PRERENDER_BINGBOT:
  PRERENDER_UA_REGEX = 'BingPreview|bingbot|' + PRERENDER_UA_REGEX
  
logger = logging.getLogger(__name__)

class PreRender:
  def __init__ (self, get_response):
    self.get_response = get_response
    
  def __call__ (self, request):
    if PRERENDER_TOKEN:
      ua = request.META.get('HTTP_USER_AGENT', '')
      do_proxy = False
      
      if 'Prerender' in ua:
        do_proxy = False
        
      elif request.method == 'GET':
        if "_escaped_fragment_" in request.GET or re.search(PRERENDER_UA_REGEX, ua, re.I):
          if PRERENDER_PATHS_EXACT and request.path in PRERENDER_PATHS_EXACT:
            do_proxy = True
            
          elif PRERENDER_PATHS_STARTSWITH and request.path.startswith(PRERENDER_PATHS_STARTSWITH):
            do_proxy = True
            
      if do_proxy:
        return self.proxy(request)
        
    response = self.get_response(request)
    return response
    
  @staticmethod
  def proxy (request):
    url = PRERENDER_PROXY + request.build_absolute_uri()
    logger.info('Fetching Proxy: {}'.format(url))
    r = requests.get(
      url,
      headers={'X-Prerender-Token': PRERENDER_TOKEN},
      allow_redirects=False
    )
    return http.HttpResponse(r.text)
    