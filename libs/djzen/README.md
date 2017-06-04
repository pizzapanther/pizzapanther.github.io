# Zen of Django

Tools to streamline and simplify using Django.

## Why the Zen of Django?

After teaching Django I found several aspects of the framework which could be streamlined and simplified to help those learning the framework. Zen of Django is an attempt to add a few more sane defaults and tools to make Django easier for beginners. Once you grow in your Django knowledge, Zen of Django can be easiy removed.

## Features

- **Simplified URLs:** Django uses Regex in its URLs which is very powerful and flexible. However, beginners often don't understand Regex and most of us don't ever use the full flexibility of Regex in URLs. Zen of Django provides a Flask style for defining URLs.
- **Production Ready Deployment:** Pre-built with [uWSGI](https://uwsgi-docs.readthedocs.io/en/latest/index.html) support for deployment. uWSGI has become the high performance standard for Django deployments thus we baked it in by default.
- **Production Ready Static File Serving:** Static file serving is configured out of the box using [WhiteNoise](http://whitenoise.evans.io/en/stable/). WhiteNoise provides simple static file serving with performance in mind.
- **Settings Management:** Settings are split into development and production. Debug is turned off in production by default. It is also easy to add more environments.
- **SECRET_KEY Management:** The secret key is setup using environmental variables so you don't commit it to your repository by accident. A dot env file is also added to your Git Ignore for added safety.
- **ToDo: Git Ignore Setup:**
- **ToDo: requirements.txt Setup:**

## Installation

1. `pip install djzen`

## Usage

### Starting a `djzen` project

`djzen startproject [projectname] [directory]`

*directory is optional*

### Development Server

`python manage.py devserver`

Does the same thing as [runserver](https://docs.djangoproject.com/en/1.11/ref/django-admin/#runserver) just gives you a better indication of which environment you're running.

### Production Server

`python manage.py devserver`

Does the same thing as [runuwsgi](http://django-uwsgi.readthedocs.io/en/master/command.html) just gives you a better indication of which environment you're running.

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

| Indentifier  | Description                                                |
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
