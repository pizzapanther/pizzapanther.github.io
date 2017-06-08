# PBKDF2 Helpers

Helper functions for implementing PBKDF2 password storage.

## Usage

```
var passhelper = require('pbkdf2-helpers');

var hash = passhelper.create_hash('hotdog');
var db_storage_text = generate_storage(hash);

passhelper.compare('hotdog', db_storage_text);
// returns true

passhelper.compare('not hotdog', db_storage_text);
// returns false
```
