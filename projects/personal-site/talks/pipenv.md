{% load static %}
class: inverse, spaced
layout: true
background-image: url({% static "img/nac.svg" %})

---

class: middle, center

# Pipenv: Easier VirtualEnvs in Python

[bit.ly/pipenv-slides](http://bit.ly/pipenv-slides)

---

# What is Pipenv?

https://pipenv.readthedocs.io/en/latest/

The new officially recommended Python packaging tool from Python.org

It automatically creates and manages a virtualenv for your projects, as well as adds/removes packages from your Pipfile as you install/uninstall packages. It also generates the ever-important Pipfile.lock, which is used to produce deterministic builds.

---

class: middle, center

# Python Packaging Now More Like Javascript (Node.js)!

<iframe src="https://giphy.com/embed/7r8AnoSSqQBry" width="320" height="320" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/love-angry-illustration-7r8AnoSSqQBry">via GIPHY</a></p>

---

# Usage:

- Install a Package: `pipenv install django`<br><br>
- Run in Venv: `pipenv run python manage.py runserver`<br><br>
- Enter Venv: `pipenv shell`<br><br>

---

class: middle, center

# New Shiny Stuff

<iframe src="https://giphy.com/embed/VazO3hXAsNuDu" width="311" height="380" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/kittens-flashy-VazO3hXAsNuDu">via GIPHY</a></p>

---

# Pipfile

```
[[source]]

url = "https://pypi.python.org/simple"
verify_ssl = true
name = "pypi"

[packages]

djzen = {extras = ["gunicorn"]}
dj-database-url = "*"
pyjwt = "*"
graphene-django = {git = "https://github.com/pizzapanther/graphene-django.git"}

[dev-packages]

yapf = "*"

[requires]

python_version = "3.6"

```

---

class: middle, center

# Pipfile.lock

<iframe src="https://giphy.com/embed/10uTjZCI1pGVZS" width="380" height="315" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/10uTjZCI1pGVZS">via GIPHY</a></p>

---

# Auto Load .env

```
SECRET_KEY=dev
GOOGLE_KEY=ABC123
GOOGLE_SECRET=NARF
```

---

# Security Checkup

`pipenv check`

<br><br>

<img src="{% static "img/croc.jpeg" %}" alt="security" style="width: 320px;">

---

# More tricks

- auto convert requirements.txt
- `pipenv update`
    - `pipenv update --outdated`
    - `pipenv update <pkg>`
