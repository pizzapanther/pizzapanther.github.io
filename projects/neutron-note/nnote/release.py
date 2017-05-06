import time
import os


RELEASE = os.environ.get('HEROKU_RELEASE_VERSION', '')
DEV = False

if not RELEASE:
  RELEASE = str(time.time())
  DEV = True
  