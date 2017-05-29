# Zen of Django

Tools to streamline and simplify using Django.

## Why the Zen of Django?

After teaching Django I found several aspects of the framework which could be streamlined and simplified to help those learning the framework. Zen of Django is an attempt to add a few more sane defaults and tools to make Django easier for beginners. Once you grow in your Django knowledge, Zen of Django can be easiy removed.

## Features

- **Simplified URLs:** Django uses Regex in its URLs which is very powerful and flexible. However, beginners often don't understand Regex and most of us don't ever use the full flexibility of Regex in URLs. Zen of Django provides a Flask style for defining URLs.

## Installation

1. `pip install djzen`

## Usage

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
