from unittest import TestCase

from djzen.urls import convert_pattern

class Patterns (TestCase):
  def setUp (self):
    self.urls = [
      ['about', r'^about$', False],
      
      ['articles/<int>/', r'^articles/(\d+)/$', False],
      ['articles/<int>/<slug>/', r'^articles/(\d+)/(\w+)/$', False],
      
      ['articles/<int:year>/', r'^articles/(?P<year>\d+)/$', False],
      ['articles/<int:year>/<slug:slug>/', r'^articles/(?P<year>\d+)/(?P<slug>\w+)/$', False],
    ]
    
  def test_patterns (self):
    for url in self.urls:
      pattern = convert_pattern(url[0], url[2])
      self.assertEqual(pattern, url[1])
      