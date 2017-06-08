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

function compare (password, stored_hash) {
  var pass_parts = stored_hash.split('$');
  var key = pbkdf2.pbkdf2Sync(
    password,
    pass_parts[2],
    parseInt(pass_parts[1]),
    256, 'sha256'
  );
  var hash = key.toString('hex');
  if (hash === pass_parts[3]) {
    return true;
  }
  
  return false;
}

function generate_storage (hash) {
  return `pbkdf2_${hash.digest}$${hash.iterations}$${hash.salt}$${hash.hash}`;
}

exports.create_hash = create_hash;
exports.compare = compare;
exports.generate_storage = generate_storage;


