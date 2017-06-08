var passhelper = require('./index.js');

module.exports = {
  setUp: function (callback) {
    callback();
  },
  tearDown: function (callback) {
    callback();
  },
  test_password: function (test) {
    var hash = passhelper.create_hash('hotdog');
    var db_storage_text = passhelper.generate_storage(hash);
    
    var matches = passhelper.matches('hotdog', db_storage_text);
    test.ok(matches);
    
    matches = passhelper.matches('hotdog', hash);
    test.ok(matches);
    
    matches = passhelper.matches('not hotdog', db_storage_text);
    test.ok(!matches);
    
    db_storage_text = db_storage_text.replace('pbkdf2_', 'bcrypt_');
    test.throws(function () {
      matches = passhelper.matches('hotdog', db_storage_text);
    });
    
    db_storage_text = passhelper.generate_storage('hotdog');
    matches = passhelper.matches('hotdog', db_storage_text);
    test.ok(matches);
    
    test.done();
  }
};
