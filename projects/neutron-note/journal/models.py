from django.db import models
from django.conf import settings

class Entry (models.Model):
  title = models.CharField(max_length=70, blank=True, null=True)
  description = models.TextField()
  
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
    return Link.objects.filter(entry=self)
    
class Link (models.Model):
  title = models.CharField(max_length=100)
  url = models.URLField(max_length=350)
  sorder = models.IntegerField()
  
  entry = models.ForeignKey(Entry)
  owner = models.ForeignKey(settings.AUTH_USER_MODEL)
  
  created = models.DateTimeField(auto_now_add=True)
  modified = models.DateTimeField(auto_now=True)
  
  class Meta:
    ordering = ('sorder', )
    
  def __str__ (self):
    return self.title
    