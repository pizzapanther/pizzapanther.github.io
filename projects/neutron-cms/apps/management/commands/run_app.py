from django.core.management.base import BaseCommand, CommandError

import apps.remark.tasks

class Command(BaseCommand):
  help = 'Run app'

  def add_arguments(self, parser):
    parser.add_argument('app', nargs='+', type=str)

  def handle(self, *args, **options):
    if 'app' in options:
      for app in options['app']:
        if app == 'remark':
          apps.remark.tasks.run()
          