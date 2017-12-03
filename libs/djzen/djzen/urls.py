import re

from django.conf.urls import url

REGEX_PATTERNS = {
  'int': '({}\d+)',
  'slug': '({}[\w-_]+)',
  'any': '({}.*)',
  'path': '({}\S+)',
  'str': '({}[^/\s]+)',
  'float': '({}\d+\.\d+|\d+\.*|\.\d+)',
}

def django_pattern (match):
  segments = match.group(0)[1:-1].split(':')
  
  if segments[0] in REGEX_PATTERNS:
    pattern = REGEX_PATTERNS[segments[0]]
    
  else:
    raise NotImplementedError('{} is not a valid pattern'.format(segments[0]))
    
  if len(segments) > 1:
    prefix = '?P<{}>'.format(segments[1])
    pattern = pattern.format(prefix)
    
  else:
    pattern = pattern.format('')
    
  return pattern
  
def convert_pattern (url, is_include):
  regex = re.sub('<.*?>', django_pattern, url)
  if is_include:
    regex = '^{}'.format(regex)
    
  else:
    regex = '^{}$'.format(regex)
    
  return regex
  
def zen_url (*args, **kwargs):
  is_include = isinstance(args[1], tuple)
  pattern = convert_pattern(args[0], is_include)
  return url(pattern, *args[1:], **kwargs)
  