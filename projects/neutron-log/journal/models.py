from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import JSONField

class Entry (models.Model):
  title = models.CharField(max_length=70, blank=True, null=True)
  description = models.TextField()
  
  data = JSONField(blank=True, null=True)
  
  created = models.DateTimeField(auto_now_add=True)
  modified = models.DateTimeField(auto_now=True)
  owner = models.ForeignKey(settings.AUTH_USER_MODEL)
  
  class Meta:
    ordering = ('-modified',)
    verbose_name_plural = 'entries'
    
  def __str__ (self):
    if self.title:
      return self.title
      
    return 'Modified: {}'.format(self.modified)
    
  @property
  def links (self):
    if self.data and 'links' in self.data:
      return self.data['links']
      
    return []
    