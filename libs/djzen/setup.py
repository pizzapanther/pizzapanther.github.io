import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))

def get_readme ():
  readme = os.path.join(here, 'README.md')
  
  try:
    import pypandoc
    
  except ImportError:
    with open(readme, 'r') as fh:
      return fh.read()
      
  else:
    return pypandoc.convert(readme, 'rst', format='markdown_github')
    
from setuptools import setup

setup(
  name = 'djzen',
  version = '17.6.3',
  description = 'Tools to streamline and simplify using Django.',
  long_description = get_readme(),
  classifiers = [
    'Framework :: Django',
    'Programming Language :: Python :: 3 :: Only',
  ],
  url = 'https://github.com/pizzapanther/pizzapanther.github.io/tree/master/libs/djzen',
  author = 'Paul Bailey',
  author_email = 'djzen@neutrondrive.com',
  license = 'MIT',
  entry_points = {'console_scripts': ['djzen = djzen.cli:zen_commands']},
  packages = [
    'djzen',
    'djzen.management',
    'djzen.management.commands',
  ],
  package_data={
    'djzen': [
      'project_template/*',
      'project_template/.env',
      'project_template/.pipconfig',
      'project_template/project_name/*',
      'project_template/project_name/settings/*',
    ]
  },
  setup_requires=[
    'pypandoc',
  ],
  install_requires = [
    'click>=6.7',
    'Django>=1.11',
    'django-uwsgi>=0.1.6',
    'django-dotenv>=1.4.1',
    'pip-save>=0.2.0',
    'uWSGI>=2.0.15',
    'whitenoise>=3.3.0',
  ],
  extras_require = {
    'dev': [
      'twine',
      'wheel',
    ]
  }
)