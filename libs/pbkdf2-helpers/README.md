# PBKDF2 Helpers

Helper functions for implementing PBKDF2 password storage.

## Usage

```javascript
var passhelper = require('pbkdf2-helpers');

var db_storage_text = passhelper.generate_storage('hotdog');
passhelper.matches('hotdog', db_storage_text);
// returns true

passhelper.matches('not hotdog', db_storage_text);
// returns false

// Or in two steps
var hash = passhelper.create_hash('hotdog');
var db_storage_text = passhelper.generate_storage(hash);

// Comparing a hash object
passhelper.matches('hotdog', hash);
// returns true
```
