require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"neutron-graph":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.DataGraph = DataGraph;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataTransformer = exports.DataTransformer = function () {
  function DataTransformer(data) {
    _classCallCheck(this, DataTransformer);

    this.data = data;
  }

  _createClass(DataTransformer, [{
    key: 'nodes',
    value: function nodes() {
      var node_data = [];
      this.data.edges.forEach(function (d) {
        node_data.push(d.node);
      });
      return node_data;
    }
  }, {
    key: 'first',
    value: function first() {
      return this.nodes()[0];
    }
  }, {
    key: 'last',
    value: function last() {
      var nodes = this.nodes();
      return nodes[nodes.lenght - 1];
    }
  }]);

  return DataTransformer;
}();

var QueryResult = exports.QueryResult = function () {
  function QueryResult(query, response) {
    _classCallCheck(this, QueryResult);

    this.query = query;
    this.response = response;

    this.init_data_properties();
  }

  _createClass(QueryResult, [{
    key: 'init_data_properties',
    value: function init_data_properties(key) {
      this.data = {};

      for (var prop in this.response.data.data) {
        var d = this.response.data.data[prop];
        this.data[prop] = new DataTransformer(d);
      }
    }
  }]);

  return QueryResult;
}();

var Query = exports.Query = function () {
  function Query(url, http, options) {
    _classCallCheck(this, Query);

    this.url = url;
    this.http = http;
    this.options = options;
    this.all_queries = [];
    this.get_queries = [];
  }

  _createClass(Query, [{
    key: 'promise',
    value: function promise(callback) {
      if (this.options && this.options.promise) {
        return this.options.promise(callback);
      }

      return new Promise(callback);
    }
  }, {
    key: 'generate_query',
    value: function generate_query(opt, type) {
      var filter_string = '';
      if (opt.filters) {
        for (var f in opt.filters) {
          var value = opt.filters[f];
          if (typeof value == "string") {
            filter_string += f + ': "' + value + '" ';
          } else {
            filter_string += f + ': ' + value + ' ';
          }
        }

        if (opt.first) {
          filter_string += 'first: ' + opt.first + ' ';
        } else if (opt.last) {
          filter_string += 'last: ' + opt.last + ' ';
        }

        filter_string = '(' + filter_string + ')';
      }

      var attr_string = '';
      if (typeof opt.attributes == "string") {
        attr_string += opt.attributes + '\n';
      } else {
        opt.attributes.forEach(function (attr) {
          attr_string += attr + '\n';
        });
      }

      if (type == 'all') {
        return '' + opt.node + filter_string + ' {\n        edges {\n          node {\n            ' + attr_string + '\n          }\n        }\n      }';
      } else {
        return '' + opt.node + filter_string + ' {\n        ' + attr_string + '\n      }';
      }
    }
  }, {
    key: 'submit',
    value: function submit(config) {
      var graph = this;
      var query = '';

      this.all_queries.forEach(function (qopts) {
        query += graph.generate_query(qopts, 'all');
      });

      this.get_queries.forEach(function (qopts) {
        query += graph.generate_query(qopts, 'get');
      });

      query = 'query { ' + query + ' }';
      return graph.promise(function (resolve, reject) {
        var q = { query: query };
        graph.http.post(graph.url, q, config).then(function (response) {
          resolve(new QueryResult(query, response));
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'get',
    value: function get(opts) {
      /***
      opts:
        node: query node
        id: base64 ID or ID when used with name
        name: Node name to generate base64 ID
        attributes: attributes to return
      ***/

      if (opts.name) {
        opts.id = btoa(opts.name + ':' + opts.id);
      }

      opts.filters = { id: opts.id };
      delete opts.id;
      this.get_queries.push(opts);
      return this;
    }
  }, {
    key: 'all',
    value: function all(qopts) {
      /***
      opts:
        node: query node
        filters: filters for query
        attributes: attributes to return
        first: limit results
        last: limit results backwards
      ***/

      this.all_queries.push(qopts);
      return this;
    }
  }]);

  return Query;
}();

function DataGraph(url, options) {
  /***
  options:
    http: http client, if none defaults to axios
    promise: promise client, if none defaults to Promise
  ***/

  var http;
  if (options && options.http) {
    http = options.http;
  } else {
    http = axios;
  }

  return function (method, query_options) {
    var query = new Query(url, http, options);
    if (method && query_options) {
      query[method](query_options);
    }

    return query;
  };
}

exports.default = DataGraph;

},{}]},{},[]);
