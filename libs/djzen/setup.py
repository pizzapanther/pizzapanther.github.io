import os

from setuptools import setup, find_packages

import pypandoc

here = os.path.abspath(os.path.dirname(__file__))

readme = os.path.join(here, 'README.md')
long_description = pypandoc.convert(readme, 'rst', format='markdown_github')

from setuptools import setup

setup(
  name = 'djzen',
  version = '17.05.02',
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
  setup_requires=[
    'pypandoc',
  ],
)