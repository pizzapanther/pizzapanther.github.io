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

- **Production Ready Deployment:** Pre-built with [uWSGI](https://uwsgi-docs.readthedocs.io/en/latest/index.html) or [Gunicorn](http://gunicorn.org/) support for deployment. Both have become the high performance standard for Django deployments thus we baked it in by default.
- **Production Ready Static File Serving:** Static file serving is configured out of the box using [WhiteNoise](http://whitenoise.evans.io/en/stable/). WhiteNoise provides simple static file serving with performance in mind.
- **Settings Management:** Settings are split into development and production. Debug is turned off in production by default. It is also easy to add more environments.
- **SECRET_KEY Management:** The secret key is setup using environmental variables so you don't commit it to your repository by accident. A dot env file is also added and ignored in git for added safety.
- **Git Ignore Setup:** Adds your secrets and db.sqlite3 to your `.gitingore` automatically.

## Installation

`pipenv install djzen[uwsgi]`

or 

`pipenv install djzen[gunicorn]`

## Quick Start

```
pipenv install djzen[uwsgi]
djzen startproject <projectname>
Install to:
  [1] Current directory (recommended)
  [2] testproj
Directory? [1]: <enter>
Setup .gitignore? [Y/n]: <enter>

pipenv run python manage.py devserver
# or 
pipenv run python manage.py collectstatic
pipenv run python manage.py prodserver
```

## Usage

### Starting a `djzen` project

`pipenv run djzen startproject [projectname] [directory]`

*directory is optional*

### Development Server

`pipenv run python manage.py devserver`

Does the same thing as [runserver](https://docs.djangoproject.com/en/1.11/ref/django-admin/#runserver) just gives you a better indication of which environment you're running.

### Production Server

`pipenv run python manage.py prodserver`

Does the same thing as [runuwsgi](http://django-uwsgi.readthedocs.io/en/master/command.html) just gives you a better indication of which environment you're running.

### Static Files

Static files will be served automatically with the production server. You only need to run the `collectstatic` command on deployment.

`pipenv run python manage.py collectstatic`

### Secrets

Secrets are stored in `.env` which use the DotEnv format. Using pipenv the values are loaded into environment automatically if a `.env` exists.
