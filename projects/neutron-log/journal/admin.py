from django.contrib import admin

from journal.models import Entry

@admin.register(Entry)
class EntryAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'owner', 'modified')
  raw_id_fields = ('owner',)
  