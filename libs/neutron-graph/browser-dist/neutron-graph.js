require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"neutron-graph":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.DataGraph = DataGraph;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataTransformer = exports.DataTransformer = function () {
  function DataTransformer(data) {
    _classCallCheck(this, DataTransformer);

    this.data = data;
  }

  _createClass(DataTransformer, [{
    key: "nodes",
    value: function nodes() {
      var node_data = [];
      this.data.edges.forEach(function (d) {
        node_data.push(d.node);
      });
      return node_data;
    }
  }, {
    key: "first",
    value: function first() {
      return this.nodes()[0];
    }
  }, {
    key: "last",
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
    key: "init_data_properties",
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
    this.m_queries = [];
  }

  _createClass(Query, [{
    key: "promise",
    value: function promise(callback) {
      if (this.options && this.options.promise) {
        return this.options.promise(callback);
      }

      return new Promise(callback);
    }
  }, {
    key: "to_filter",
    value: function to_filter(value) {
      var filter_string = '';

      if (typeof value == "string") {
        filter_string += JSON.stringify(value);
      } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object") {
        filter_string += this.deep_copy(value);
      } else {
        filter_string += "" + value;
      }

      return filter_string;
    }
  }, {
    key: "to_attr",
    value: function to_attr(attrs) {
      var _this = this;

      var attr_string = '';

      if (typeof attrs == "string") {
        attr_string += attrs + '\n';
      } else if (attrs instanceof Array) {
        attrs.forEach(function (attr) {
          if (typeof attr == "string") {
            attr_string += attr + '\n';
          } else {
            var value = _this.to_attr(attr);
            attr_string += value + "\n";
          }
        });
      } else {
        for (var f in attrs) {
          var value = this.to_attr(attrs[f]);
          attr_string += f + " { " + value + " }\n";
        }
      }

      return attr_string;
    }
  }, {
    key: "deep_copy",
    value: function deep_copy(obj) {
      var _this2 = this;

      var filter_string = '';

      if (obj instanceof Array) {
        var values = obj.map(function (value) {
          return _this2.to_filter(value);
        });
        filter_string = values.join(" ");
        return "[ " + filter_string + " ]";
      } else {
        for (var attr in obj) {
          var value = this.to_filter(obj[attr]);
          filter_string += attr + ": " + value + " ";
        }
        return "{ " + filter_string + " }";
      }
    }
  }, {
    key: "to_pageinfo",
    value: function to_pageinfo(page_info) {
      var r = '';

      if (page_info) {
        r = 'pageInfo {';
        if (page_info instanceof Array) {
          r += page_info.join(" ") + '}';
        } else {
          r += page_info + '}';
        }
      }

      return r;
    }
  }, {
    key: "generate_query",
    value: function generate_query(opt, type) {
      var filter_string = '';
      if (opt.filters) {
        for (var f in opt.filters) {
          var value = this.to_filter(opt.filters[f]);
          filter_string += f + ": " + value + " ";
        }

        if (opt.first) {
          filter_string += "first: " + opt.first + " ";
        } else if (opt.last) {
          filter_string += "last: " + opt.last + " ";
        }

        if (type == 'mutation') {
          filter_string = '(input: {' + filter_string + '})';
        } else {
          filter_string = '(' + filter_string + ')';
        }
      }

      var attr_string = this.to_attr(opt.attributes);
      var page_string = this.to_pageinfo(opt.page_info);

      if (type == 'all') {
        return "" + opt.node + filter_string + " {\n        edges {\n          node {\n            " + attr_string + "\n          }\n        }\n      }";
      } else if (type == 'mutation') {
        return "" + opt.node + filter_string + " {\n        " + attr_string + "\n      }";
      } else {
        return "" + opt.node + filter_string + " {\n        " + attr_string + "\n      }";
      }
    }
  }, {
    key: "submit",
    value: function submit(config) {
      var graph = this;
      var query = '';

      if (this.all_queries.length > 0 || this.get_queries.length > 0) {
        this.all_queries.forEach(function (qopts) {
          query += graph.generate_query(qopts, 'all');
        });

        this.get_queries.forEach(function (qopts) {
          query += graph.generate_query(qopts, 'get');
        });

        query = "query { " + query + " }";
      }

      if (this.m_queries.length > 0) {
        var mutation = '';
        this.m_queries.forEach(function (qopts) {
          qopts.filters = qopts.input;
          mutation += graph.generate_query(qopts, 'mutation');
        });

        if (query.length > 0) {
          query += '\n';
        }

        query += "mutation { " + mutation + " }";
      }

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
    key: "get",
    value: function get(opts) {
      /***
      opts:
        node: query node
        id: base64 ID or ID when used with name
        name: Node name to generate base64 ID
        attributes: attributes to return
      ***/

      if (opts.name) {
        opts.id = btoa(opts.name + ":" + opts.id);
      }

      opts.filters = { id: opts.id };
      delete opts.id;
      this.get_queries.push(opts);
      return this;
    }
  }, {
    key: "all",
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
  }, {
    key: "mutate",
    value: function mutate(qopts) {
      /***
      opts:
        node: query node
        input: inputs for the mutation
        attributes: attributes to return
      ***/

      this.m_queries.push(qopts);
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
