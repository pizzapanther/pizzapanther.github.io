import datetime
from importlib import import_module
import threading

from django import http
from django.conf import settings
from django.urls import reverse

import jwt
import requests

TOKEN_EXPIRATION = getattr(settings, 'QQ_TOKEN_EXPIRATION', 60)
REQUEST_TIMEOUT = getattr(settings, 'QQ_REQUEST_TIMEOUT', 60)
REQUEST_MAX_PROCESSES = getattr(settings, 'QQ_MAX_PROCESSES', 10)
TOKEN_ALGORITHMS = getattr(settings, 'QQ_TOKEN_ALGORITHMS', ['HS256'])
URL_NAME = getattr(settings, 'QQ_URL_NAME', 'taskinator')
BASE_URL = getattr(settings, 'QQ_BASE_URL')

def async_request (url, timeout):
  requests.get(url, timeout=timeout)
  
class Task:
  def __init__ (self, timeout=REQUEST_TIMEOUT):
    self.timeout = timeout
    
  def __call__ (self, target):
    self.target = target
    return self.task_wrapper
    
  def execute (self, *args, **kw):
    return self.target(*args, **kw)
    
  def task_wrapper (self, *args, **kw):
    payload = {
      'args': args,
      'kw': kw,
      'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=TOKEN_EXPIRATION),
      '__module__': self.target.__module__,
      '__name__': self.target.__name__,
    }
    
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm=TOKEN_ALGORITHMS[0])
    url = BASE_URL + reverse(URL_NAME, args=[token])
    t = threading.Thread(target=async_request, args=(url, self.timeout))
    t.daemon = True
    t.start()
    
def taskinator (request, token):
  payload = jwt.decode(token, settings.SECRET_KEY, algorithms=TOKEN_ALGORITHMS)
  
  module = import_module(payload['__module__'])
  task = getattr(module, payload['__name__'])
  
  task.__self__.execute(*payload['args'], **payload['kw'])
  return http.HttpResponse('OK', content_type="text/plain")
  