from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import JSONField

class Entry (models.Model):
  title = models.CharField(max_length=70, blank=True, null=True)
  description = models.TextField()
  
  data = JSONField()
  
  created = models.DateTimeField(auto_now_add=True)
  modified = models.DateTimeField(auto_now=True)
  owner = models.ForeignKey(settings.AUTH_USER_MODEL)
  
  class Meta:
    ordering = ('-modified',)
    
  def __str__ (self):
    if self.title:
      return self.title
      
    return 'Modified: {}'.format(self.modified)
  