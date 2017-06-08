var pbkdf2 = require('pbkdf2');
var crypto = require('crypto');

var ITERATIONS = 36000;
var KEYLEN = 256;
var DIGEST = 'sha256';

function create_hash (password, iter, keylen, digest) {
  iter = iter || ITERATIONS;
  keylen = keylen || KEYLEN;
  digest = digest || DIGEST;
  
  var salt = crypto.randomBytes(20).toString('hex');
  var key = pbkdf2.pbkdf2Sync(
    password, salt, iter, keylen, digest
  );
  var hash = key.toString('hex');
  
  return {
    hash: hash,
    salt: salt,
    iterations: iter,
    keylen: keylen,
    digest: digest
  };
}

function matches (password, hash) {
  var key;
  var compare_str;
  
  if (typeof(hash) == 'string') {
    let pass_parts = hash.split('$');
    compare_str = pass_parts[3];
    let digest = pass_parts[0].split('_');
    if (digest[0] != 'pbkdf2') {
      let error = new Error('Unsupported hash type, must be pbkdf2.');
      throw error;
    }
    
    var regex = /(\d+)/;
    let keylen = parseInt(digest[1].match(regex)[0]);
    
    key = pbkdf2.pbkdf2Sync(
      password,
      pass_parts[2],
      parseInt(pass_parts[1]),
      keylen,
      digest[1]
    );
  } else {
    compare_str = hash.hash;
    
    key = pbkdf2.pbkdf2Sync(
      password,
      hash.salt,
      hash.iterations,
      hash.keylen,
      hash.digest
    );
  }
  
  if (key.toString('hex') === compare_str) {
    return true;
  }
  
  return false;
}

function generate_storage (hash) {
  if (typeof(hash) == 'string') {
    hash = create_hash(hash);
  }
  
  return `pbkdf2_${hash.digest}$${hash.iterations}$${hash.salt}$${hash.hash}`;
}

exports.create_hash = create_hash;
exports.compare = matches;
exports.matches = matches;
exports.generate_storage = generate_storage;


