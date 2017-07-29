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
  name = 'quickq',
  version = '17.8.1',
  description = 'The quickest way to execute async tasks with Django.',
  long_description = get_readme(),
  classifiers = [
    'Framework :: Django',
    'Programming Language :: Python :: 3 :: Only',
  ],
  url = 'https://github.com/pizzapanther/pizzapanther.github.io/tree/master/libs/quickq',
  author = 'Paul Bailey',
  author_email = 'quickq@neutrondrive.com',
  license = 'MIT',
  packages = [
    'quickq',
  ],
  setup_requires=[
    'pypandoc',
  ],
  install_requires = [
    'Django>=1.11',
    'pyjwt',
    'requests-futures',
  ],
  extras_require = {
    'dev': [
      'twine',
      'wheel',
    ]
  }
)