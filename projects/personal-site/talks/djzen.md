{% load static %}
class: inverse, spaced
layout: true
background-image: url({% static "img/nac.svg" %})

---

class: middle, center

# Zen of Django

### `pip install djzen`

[bit.ly/zen-of-django](http://bit.ly/zen-of-django)

---

# About Me

- Instructor @ [DigitalCrafts](http://www.digitalcrafts.com/)
- Building voice apps with Django
    - [Neutron.Academy](https://www.neutron.academy/)
    - *"OK Google, talk with Neutron Academy"*
- Twitter: [@PizzaPanther](https://twitter.com/pizzapanther)

---

# What is the Zen of Django?

Tools to streamline and simplify using Django

---

class: middle, center

# Django's Pain Points

<iframe src="https://giphy.com/embed/YpmVBNubONoqs" width="480" height="269" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/head-pain-YpmVBNubONoqs">via GIPHY</a></p>

---

# Django's Pain Points

- Regex needed for URLs
- Package Management
- Project Setup
  - committing your `SECRET_KEY` and `db.sqlite3`
- Deployment
    - production server
    - static files
    - switching settings for dev and prod

---

# Simplified URLs

```python
from djzen.urls import zen_url

urlpatterns = [
  zen_url('about', views.about_page),
  zen_url('articles/<int>/', views.archive),
  zen_url('articles/<int>/<slug>/', views.detail),
  
  # or 
  
  zen_url('articles/<int:year>/', views.archive),
  zen_url('articles/<int:year>/<slug:slug>/', views.detail),
]
```

---

# Package Management

- auto generated `requirements.txt`
- `pip-save` pre-installed
    - `pip-save install django-haystack`

---

# Project Setup

- Auto generated or updated `.gitignore`
- DotEnv pre-installed and ignored
    - Initialized with SECRET_KEY

---

# Deployment

- Pre-installed `django-uwsgi`
- Static files served with `whitenoise`
- Settings split for Dev and Prod

<br><br>

```
python manage.py devserver

# or

python manage.py prodserver
```

---

# Demo Time

```
mkvirtualenv djtest -p `which python3`

pip install djzen

djzen startproject myproject

```

---

# What's Your Pain?

### Tweet: `#DjangoPain @pizzapanther`
