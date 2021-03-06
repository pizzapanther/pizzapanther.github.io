import json

from django.conf import settings
from django.shortcuts import render
from django.template.response import TemplateResponse

from nnote.release import RELEASE
from nnote.frontend import CSS, FONTS, JS, tpl_files

APP = {
  'name': 'Neutron Note',
  'description': 'A note taking app optimized for developers',
}

def app (request):
  context = {
    'js_files': JS,
    'css_files': CSS,
    'fonts': FONTS,
    'tpl_files': tpl_files(),
    'app': APP,
    'app_json': json.dumps(APP),
    'debug': settings.DEBUG,
    'release': RELEASE,
  }
  return TemplateResponse(request, 'nnote_app.html', context)
  