import os
import shutil
import subprocess
from unittest import TestCase

class Project (TestCase):
  def setUp (self):
    os.environ['SECRET_KEY'] = 'narf'
    self.name = 'testproj'
    self.files = [
      '.env',
      '.gitignore',
      'manage.py',
      os.path.join(self.name, 'urls.py'),
      os.path.join(self.name, 'wsgi.py'),
      os.path.join(self.name, 'settings', 'production.py'),
      os.path.join(self.name, 'settings', 'development.py'),
    ]
    
    if os.path.exists(self.name):
      shutil.rmtree(self.name)
      
  def tearDown (self):
    if os.path.exists(self.name):
      shutil.rmtree(self.name)
      
  def test_project (self):
    pipe = subprocess.Popen(
      ['djzen', 'startproject', self.name],
      stdin=subprocess.PIPE,
      stdout=subprocess.PIPE
    )
    stdout, stderr = pipe.communicate(input=b'2\n\n\n')
    
    for file in self.files:
      path = os.path.join(self.name, file)
      self.assertTrue(os.path.exists(path))
      