{% load static %}
class: inverse, spaced
layout: true
background-image: url({% static "img/icon.svg" %})

---

class: middle, center

# Intro to GraphQL with Python

[bit.ly/py-graphql](http://bit.ly/py-graphql)

---

class: middle, center

# What is GraphQL?

A query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API.

---

# What is GraphQL?

- a new method to write APIs
- tool to develop a description of your data and what you can do
  - reduces development efforts
  - reduces bandwidth: ask for exactly what you want
  - reduces requests
- Alternatives: [Falcor](https://netflix.github.io/falcor/)

---

# Typical API Development Cycle

- Backend: Develop API
- Frontend: Use API but needs tweaks
- Backend: Modifies API
- Frontend: Happy but now requirements change
- Backend: Updates API again

---

# GraphQL Development Cycle

- Backend: Develop API
- Frontend: Use API as needed
- Backend: Change API when data changes

---

# Using GraphQL With Python

- http://graphene-python.org/

---

# Django GraphQL Example

```python
from bible.models import Bible, Book, Verse

class BookNode(DjangoObjectType):
  class Meta:
    model = Book
    filter_fields = ('slug', 'bible__slug')
    interfaces = (relay.Node, )

class VerseNode(DjangoObjectType):
  class Meta:
    ...

class Query(AbstractType):
  book = relay.Node.Field(BookNode)
  all_books = DjangoFilterConnectionField(BookNode)

  verse = relay.Node.Field(VerseNode)
  all_verses = DjangoFilterConnectionField(VerseNode)
```

---

# GraphiQL

- Demo: http://graphql.org/swapi-graphql/
- Github GraphQL: https://developer.github.com/early-access/graphql/
- Github Demo: https://developer.github.com/early-access/graphql/explorer/

---

class: middle, center

# The Drawbacks

<iframe src="//giphy.com/embed/jfLJxNiDN1a6Y" width="480" height="199.68" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/cheezburger-hot-weird-jfLJxNiDN1a6Y">via GIPHY</a></p>

---

# The Drawbacks

- harder to cache
- new project
  - bugs?
  - maybe doesn't have all the features you want yet
