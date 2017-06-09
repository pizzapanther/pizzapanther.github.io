from setuptools import setup

setup(
  name='django-prerenderio',
  version='17.6.1',
  license='MIT',
  description="Django middleware to render Single Page Applications via prerender.io",
  
  author="Paul Bailey",
  author_email="paul@neutrondrive.com",
  url="https://github.com/pizzapanther/pizzapanther.github.io/tree/master/libs/django-prerenderio",
  keywords='django prerender prerender.io seo spa angular react vuejs',
  
  packages=['django_prerenderio'],
  
  install_requires=['requests'],
  
  include_package_data=True,
  zip_safe=False,
  platforms='any',
)
