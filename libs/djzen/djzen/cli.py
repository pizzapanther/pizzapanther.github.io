import os
import shutil
import sys

import click
from django.core import management

@click.group()
def zen_commands ():
  pass

@zen_commands.command()
@click.argument('name')
@click.argument('directory', required=False)
def startproject (name, directory):
  """
  Creates a Django project directory structure for the given project name in
  the current directory or optionally in the given directory.
  """
  
  
  exe = shutil.which('django-admin.py')
  if exe is None:
    print("Could not find django-admin.py. Is Django installed?")
    sys.exit(1)
    
  args = [exe, 'startproject', name]
  if directory:
    args.append(directory)
    
  args.append('--template')
  basedir = os.path.dirname(os.path.abspath(__file__))
  args.append(os.path.join(basedir, 'project_template'))
  args.extend(['-n', '.env'])
  
  management.execute_from_command_line(args)
  
if __name__ == '__main__':
  zen_commands()
  