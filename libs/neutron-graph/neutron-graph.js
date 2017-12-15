export class DataTransformer {
  constructor (data) {
    this.data = data;
  }
  
  nodes (data_list) {
    var node_data = [];
    
    if (!data_list) {
      data_list = this.data;
    }
    
    data_list.edges.forEach(function (d) {
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
  
  nodes (data_list) {
    var node_data = [];
    
    data_list.edges.forEach(function (d) {
      node_data.push(d.node);
    });
    
    return node_data;
  }
}

export class Query {
  constructor (url, http, options) {
    this.url = url;
    this.http = http;
    this.options = options;
    this.all_queries = [];
    this.get_queries = [];
    this.m_queries = [];
  }
  
  promise (callback) {
    if (this.options && this.options.promise) {
      return this.options.promise(callback);
    }
    
    return new Promise(callback);
  }
  
  to_filter (value) {
    var filter_string = '';
    
    if (typeof(value) == "string") {
      filter_string += JSON.stringify(value);
    } else if (typeof(value) == "object") {
      filter_string += this.deep_copy(value);
    } else {
      filter_string += `${value}`;
    }
    
    return filter_string;
  }
  
  to_attr (attrs) {
    var attr_string = '';
    
    if (typeof(attrs) == "string") {
      attr_string += `${attrs}\n`;
    } else if (attrs instanceof Array) {
      attrs.forEach((attr) => {
        if (typeof(attr) == "string") {
          attr_string += attr + '\n';
        } else {
          let value = this.to_attr(attr);
          attr_string += `${value}\n`;
        }
      });
    } else {
      if (attrs.filters) {
        attr_string += '(';
        
        for (let f in attrs.filters) {
          let value = this.to_filter(attrs.filters[f]);
          attr_string += `${f}: ${value} `;
        }
        
        attr_string += ')';
        attr_string += ' {';
      } else if (attrs.args) {
        attr_string += '(';
        
        for (let f in attrs.args) {
          let value = this.to_filter(attrs.args[f]);
          attr_string += `${f}: ${value} `;
        }
        
        attr_string += ')';
        attr_string += ' {';
      }
      
      if (attrs.attributes) {
        let value = this.to_attr(attrs.attributes);
        attr_string += `\n${value}\n`;
      } else {
        for (let f in attrs) {
          if (f != 'filters' && f != 'args') {
            if (!attrs[f]) {
              attr_string += `${f}\n`;
            } else {
              let value = this.to_attr(attrs[f]);
              
              if (attrs[f].filters || attrs[f].args) {
                attr_string += `${f} ${value}\n`;
              } else {
                attr_string += `${f} { ${value} }\n`;
              }
            }
          }
        }
      }
      
      if (attrs.filters || attrs.args) {
        attr_string += ' }';
      }
    }
    
    return attr_string;
  }
  
  deep_copy (obj) {
    var filter_string = '';
    
    if (obj instanceof Array) {
      let values = obj.map((value) => {
        return this.to_filter(value);
      });
      filter_string = values.join(" ");
      return `[ ${filter_string} ]`;
    } else {
      for (let attr in obj) {
        let value = this.to_filter(obj[attr]);
        filter_string += `${attr}: ${value} `;
      }
      return `{ ${filter_string} }`;
    }
  }
  
  to_pageinfo (page_info) {
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
  
  generate_query (opt, type) {
    if (opt.node) {
      return this.old_generate_query(opt, type);
    } else {
      return this.to_attr(opt);
    }
  }
  
  old_generate_query (opt, type) {
    var filter_string = '';
    if (opt.filters) {
      for (var f in opt.filters) {
        let value = this.to_filter(opt.filters[f]);
        filter_string += `${f}: ${value} `;
      }
      
      if (opt.first) {
        filter_string += `first: ${opt.first} `;
      } else if (opt.last) {
        filter_string += `last: ${opt.last} `;
      }
      
      if (type == 'mutation') {
        filter_string = '(input: {' + filter_string + '})';
      } else {
        filter_string = '(' + filter_string + ')'; 
      }
    }
    
    var attr_string = this.to_attr(opt.attributes);
    
    if (type == 'all') {
      var page_string = this.to_pageinfo(opt.page_info);
      
      return `${opt.node}${filter_string} {
        edges {
          node {
            ${attr_string}
          }
        }
        ${page_string}
      }`;
    } else if (type == 'mutation') { 
      return `${opt.node}${filter_string} {
        ${attr_string}
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
    
    if (this.all_queries.length > 0 || this.get_queries.length > 0) {
      this.all_queries.forEach(function (qopts) {
        query += graph.generate_query(qopts, 'all');
      });
      
      this.get_queries.forEach(function (qopts) {
        query += graph.generate_query(qopts, 'get');
      });
      
      query = `query { ${query} }`;
    }
    
    if (this.m_queries.length > 0) {
      let mutation = '';
      this.m_queries.forEach(function (qopts) {
        qopts.filters = qopts.input;
        mutation += graph.generate_query(qopts, 'mutation');
      });
      
      if (query.length > 0) {
        query += '\n'
      }
      
      query += `mutation { ${mutation} }`;
    }
    
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
  
  query (qopts) {
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
  
  mutate(qopts) {
    /***
    opts:
      node: query node
      input: inputs for the mutation
      attributes: attributes to return
    ***/
    
    this.m_queries.push(qopts);
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
