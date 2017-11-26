# Neutron-Graph
A small GraphQL Query generator

## Requirements

- Promise based HTTP client (Default: Axios or $http for Angular)
- ES6 style Promises (Default: Promise or $q for Angular)

## ES5 Usage

Usage:

```javascript
var neutron_graph = require('neutron-graph');
GraphAPI = neutron_graph.default('/graphql', {http: $http, promise: $q});

var query = {
  allSchedules {
    filters: {user_RemoteUserId: 5},
    edges: {node: ['id', 'sunday', 'monday']}
  }
};

GraphAPI().data_graph().query(query).submit().then(function(response) {
  console.log(response.data.allSchedules.nodes());
}).catch(function(error) {
  console.log(error);
});
```

## ES6 Usage

```javascript
import DataGraph from 'neutron-graph';

var verses;
var GraphAPI = DataGraph('/data-graph');

var query = {
  allVerses: {
    filters: {book_Slug: 'my-book', chapter: 2},
    edges: {node: ['text', 'verse']}
  }
};

GraphAPI().query(query).submit().then(function (result) {
  verses = result.data.allVerses.nodes();
}).catch(function (error) {
  console.error(error);
});
```

## API

### Chaining

```javascript
var GraphAPI = DataGraph('/data-graph');
var promise = GraphAPI().query(query1).query(query2).get(query3).submit();
```

Result will contain an attribute for each node name.

Example: `result.data.AllVerses, result.data.AllChapters, result.data.Chapter`

### Query Methods

|Name|Description|
|------|-----------|
|query()|Query that contains multiple results|
|get()|Query by ID. Supply base64 `{id}` or `{name, id}` to generate id|


### QueryResult Attributes

|Name|Description|
|------|-----------|
|data|DataTransformer objects named by node names|
|query|original text query generated|
|response|original response object|


### DataTransformer Methods and Attributes

|Name|Description|
|------|-----------|
|data|original data|
|nodes()|list data extracted from edges list and node object|
|first()|get first node and return it|
|last()|get last node and return it|
