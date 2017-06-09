export class DataTransformer {
  constructor (data) {
    this.data = data;
  }
  
  nodes () {
    var node_data = [];
    this.data.edges.forEach(function (d) {
      node_data.push(d.node);
    });
    return node_data;
  }
  
  first () {
    return this.nodes()[0];
  }
  
  last () {
    var nodes = this.nodes();
    return nodes[nodes.lenght - 1];
  }
}

export class QueryResult {
  constructor (query, response) {
    this.query = query;
    this.response = response;
    
    this.init_data_properties();
  }
  
  init_data_properties (key) {
    this.data = {};
    
    for (var prop in this.response.data.data) {
      var d = this.response.data.data[prop];
      this.data[prop] = new DataTransformer(d);
    }
  }
}

export class Query {
  constructor (url, http, options) {
    this.url = url;
    this.http = http;
    this.options = options;
    this.all_queries = [];
    this.get_queries = [];
  }
  
  promise (callback) {
    if (this.options && this.options.promise) {
      return this.options.promise(callback);
    }
    
    return new Promise(callback);
  }
  
  generate_query (opt, type) {
    var filter_string = '';
    if (opt.filters) {
      for (var f in opt.filters) {
        let value = opt.filters[f];
        if (typeof(value) == "string") {
          filter_string += `${f}: "${value}" `;
        } else {
          filter_string += `${f}: ${value} `;
        }
      }
      
      if (opt.first) {
        filter_string += `first: ${opt.first} `;
      } else if (opt.last) {
        filter_string += `last: ${opt.last} `;
      }
      
      filter_string = '(' + filter_string + ')';
    }
    
    var attr_string = '';
    if (typeof(opt.attributes) == "string") {
      attr_string += opt.attributes + '\n';
    } else {
      opt.attributes.forEach(function (attr) {
        attr_string += attr + '\n';
      });
    }
    
    if (type == 'all') {
      return `${opt.node}${filter_string} {
        edges {
          node {
            ${attr_string}
          }
        }
      }`;
    } else {
      return `${opt.node}${filter_string} {
        ${attr_string}
      }`;
    }
  }
  
  submit (config) {
    var graph = this;
    var query = '';
    
    this.all_queries.forEach(function (qopts) {
      query += graph.generate_query(qopts, 'all');
    });
    
    this.get_queries.forEach(function (qopts) {
      query += graph.generate_query(qopts, 'get');
    });
    
    query = `query { ${query} }`;
    return graph.promise(function (resolve, reject) {
      var q = {query: query};
      graph.http.post(graph.url, q, config).then(function (response) {
        resolve(new QueryResult(query, response));
      }).catch(function (error) {
        reject(error);
      });
    });
  }
  
  get (opts) {
    /***
    opts:
      node: query node
      id: base64 ID or ID when used with name
      name: Node name to generate base64 ID
      attributes: attributes to return
    ***/
  
    if (opts.name) {
      opts.id = btoa(`${opts.name}:${opts.id}`);
    }
    
    opts.filters = {id: opts.id};
    delete opts.id;
    this.get_queries.push(opts);
    return this;
  }
  
  all (qopts) {
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
}

export function DataGraph (url, options) {
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

export default DataGraph;
