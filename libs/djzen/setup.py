from setuptools import setup, find_packages
from codecs import open
import os

here = os.path.abspath(path.dirname(__file__))

with open(os.path.join(here, 'README.md'), encoding='utf-8') as f:
  long_description = f.read()
  
from setuptools import setup

setup(
  name = 'djzen',
  version = '17.05.01',
  description = 'Tools to streamline and simplify using Django.',
  long_description = long_description,
  classifiers = [
    'Framework :: Django',
  ],
  url = 'https://github.com/pizzapanther/pizzapanther.github.io/tree/master/libs/djzen',
  author = 'Paul Bailey',
  author_email = 'djzen@neutrondrive.com',
  license = 'MIT',
  packages = [
    'djzen',
  ],
)