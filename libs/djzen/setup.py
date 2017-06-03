import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))

def get_readme ():
  readme = os.path.join(here, 'README.md')
  
  try:
    import pypandoc
    
  except ModuleNotFoundError:
    with open(readme, 'r') as fh:
      return fh.read()
      
  else:
    return pypandoc.convert(readme, 'rst', format='markdown_github')
    
from setuptools import setup

setup(
  name = 'djzen',
  version = '17.5.3',
  description = 'Tools to streamline and simplify using Django.',
  long_description = get_readme(),
  classifiers = [
    'Framework :: Django',
  ],
  url = 'https://github.com/pizzapanther/pizzapanther.github.io/tree/master/libs/djzen',
  author = 'Paul Bailey',
  author_email = 'djzen@neutrondrive.com',
  license = 'MIT',
  entry_points = {'console_scripts': ['djzen = djzen.cli:zen_commands']},
  packages = [
    'djzen',
  ],
  setup_requires=[
    'pypandoc',
  ],
  install_requires = [
    'click>=6.7',
    'Django>=1.11',
  ],
  extras_require = {
    'dev': [
      'twine',
      'wheel',
    ]
  }
)