
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
  
  args = [name]
  if directory:
    args.append(directory)
    
  print(args)
  management.execute_from_command_line('startproject', *args)
  
if __name__ == '__main__':
  zen_commands()
  