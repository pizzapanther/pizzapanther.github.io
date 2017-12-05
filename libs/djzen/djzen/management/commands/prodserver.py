import os
import sys

from django.conf import settings
from django.core.management.base import BaseCommand 

def parse_args(parser):
    def inner_funct (args=None, namespace=None):
        ns, gunicorn_args = parser.parse_known_args(args=args, namespace=namespace)
        return parser.parse_args_original(args=[], namespace=ns)

    return inner_funct

class GunicornCommand(BaseCommand):
    help = 'production server using gunicorn'

    def create_parser(self, prog_name, subcommand):
        parser = super().create_parser(prog_name, subcommand)
        parser.parse_args_original = parser.parse_args
        parser.parse_args = parse_args(parser)
        return parser

    def handle(self, *args, **options):
        app = settings.WSGI_APPLICATION.split('.')[-1]
        mods = settings.WSGI_APPLICATION.split('.')[:-1]
        wsgi = '{}:{}'.format('.'.join(mods), app)
        args = ['gunicorn', wsgi]
        args.extend(sys.argv[2:])
        os.execvp('gunicorn', args)

try:
    from django_uwsgi.management.commands.runuwsgi import Command

except ModuleNotFoundError:
    Command = GunicornCommand
