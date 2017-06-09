# Django Prerender.io Middleware

Django middleware to render Single Page Applications via [prerender.io](https://prerender.io/)

## Requirements

Django 1.10 or above

If you need support for older versions of Django see https://github.com/skoczen/django-seo-js.<br>
django-seo-js supports older versions of Django but not version 1.10.

## Setup

`pip install django-prerenderio`

Add settings:

```
PRERENDER_TOKEN = os.environ.get('PRERENDER_TOKEN', '')
PRERENDER_PATHS_EXACT = ("/",)
PRERENDER_PATHS_STARTSWITH = ("/page/", "/news/")
```

Add Middleware towards the top most likely:

```
MIDDLEWARE = [
  ...
  'django_prerenderio.middleware.PreRender',
  ...
]
```

## Additional Settings


`PRERENDER_UA_REGEX`<br>
Default: `"Ask Jeeves|baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator"`<br>
Description: User Agent Regex

`PRERENDER_GOOGLEBOT`<br>
Default: `False`<br>
Description: Googlebot by default runs Javascript but you may want to use Prerender any way. `True` adds Googlebot to the User Agent Regex.

`PRERENDER_BINGBOT`<br>
Default: `False`<br>
Description: Bingbot by default runs Javascript but you may want to use Prerender any way. `True` adds Bingbot to the User Agent Regex.

`PRERENDER_PROXY`<br>
Default: `'https://service.prerender.io/'`<br>
Description: URL to prerender service

