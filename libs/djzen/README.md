# Zen of Django

Tools to streamline and simplify using Django.

## Why the Zen of Django?

After teaching Django I found several aspects of the framework which could be
streamlined and simplified to help those learning the framework. So I curated
some best practices, pre-configured popular libraries, and simplified parts of
Django. Both beginners and seasoned veterans can use Zen of Django to simplify
and start faster. Each piece can be easily exchanged or removed once you out
grow any of them.

## Features

- **Simplified URLs:** Django uses Regex in its URLs which is very powerful and flexible. However, beginners often don't understand Regex and most of us don't ever use the full flexibility of Regex in URLs. Zen of Django provides a Flask style for defining URLs.
- **Production Ready Deployment:** Pre-built with [uWSGI](https://uwsgi-docs.readthedocs.io/en/latest/index.html) support for deployment. uWSGI has become the high performance standard for Django deployments thus we baked it in by default.
- **Production Ready Static File Serving:** Static file serving is configured out of the box using [WhiteNoise](http://whitenoise.evans.io/en/stable/). WhiteNoise provides simple static file serving with performance in mind.
- **Settings Management:** Settings are split into development and production. Debug is turned off in production by default. It is also easy to add more environments.
- **SECRET_KEY Management:** The secret key is setup using environmental variables so you don't commit it to your repository by accident. A dot env file is also added and ignored in git for added safety.
- **Git Ignore Setup:** Adds your secrets and db.sqlite3 to your `.gitingore` automatically.
- **requirements.txt Setup:** Initializes a requirements.txt for you with the currently install Django and other libraries djzen depends on.
- **pip-save Pre-configured:** `pip-save` is installed by default so you can easily add and track packages with `pip-save install new-package-name`.

## Installation

`pip install djzen`

## Quick Start

```
pip install djzen
djzen startproject <projectname>
Install to:
  [1] Current directory (recommended)
  [2] testproj
Directory? [1]: <enter>
Setup .gitignore? [Y/n]: <enter>
Setup requirements.txt? [Y/n]: <enter>

python manage.py devserver
# or 
python manage.py collectstatic
python manage.py prodserver
```

## Usage

### Starting a `djzen` project

`djzen startproject [projectname] [directory]`

*directory is optional*

### Development Server

`python manage.py devserver`

Does the same thing as [runserver](https://docs.djangoproject.com/en/1.11/ref/django-admin/#runserver) just gives you a better indication of which environment you're running.

### Production Server

`python manage.py prodserver`

Does the same thing as [runuwsgi](http://django-uwsgi.readthedocs.io/en/master/command.html) just gives you a better indication of which environment you're running.

### Installing Packages

`pip-save install new-package-name`

This will install the package and save it to your `requirements.txt`

### Simplified URLs

Sample URLcong (urls.py)

```python
from djzen.urls import zen_url

urlpatterns = [
  zen_url('about', views.about_page),
  zen_url('articles/<int>/', views.year_archive),
  zen_url('articles/<int>/<int>/', views.month_archive),
  zen_url('articles/<int>/<int>/<slug>/', views.article_detail),
]
```

or with keyword  arguments

```python
from djzen.urls import zen_url

urlpatterns = [
  zen_url('about', views.about_page),
  zen_url('articles/<int:year>/', views.year_archive),
  zen_url('articles/<int:year>/<int:month>/', views.month_archive),
  zen_url('articles/<int:year>/<int:month>/<slug:slug>/', views.article_detail),
]
```

Built in types:

| Identifier  | Description                                                |
| :----------- | :--------------------------------------------------------- |
| any          | Accepts any text.                                          |
| float        | Accepts floating point values.                             |
| int          | Accepts integers.                                          |
| path         | Like string but accepts slashes.                           |
| slug         | Accepts slugs (letters, numbers, underscores or hyphens).  |
| str          | Accepts any text without a slash.                          |

Note: `zen_urls` can be mixed with Django URLs. `zen_url` immediately takes a
URL and converts it to a valid Django URL object. `zen_url` will also pass
through any keyword arguments.

### Static Files

Static files will be served automatically with the production server. You only need to run the `collectstatic` command on deployment.

`python manage.py collectstatic`

### Secrets

Secrets are stored in `.env` which use the DotEnv format. The values are loaded into environment automatically if a `.env` exists.
