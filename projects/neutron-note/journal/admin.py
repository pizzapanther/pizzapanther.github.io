from django.contrib import admin

from journal.models import Entry, Link

class LinkInline (admin.TabularInline):
  model = Link
  raw_id_fields = ('owner',)
  fields = ('title', 'url', 'sorder')
  
@admin.register(Entry)
class EntryAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'owner', 'modified')
  raw_id_fields = ('owner',)
  inlines = [LinkInline]
  
  def save_formset (self, request, form, formset, change):
    instances = formset.save(commit=False)
    for instance in instances:
      instance.owner = form.cleaned_data['owner']
      instance.save()
      
    formset.save_m2m()
    