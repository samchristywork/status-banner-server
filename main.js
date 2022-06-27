var express = require('express');
var app = express();

/*
 * Create a static route. Everything in the 'public' directory will be sent
 * as-is. That includes the index, CSS styling, script files, and images.
 */
+app.use("/status-banner-service/", express.static('public'))

app.listen(8084);
console.log('Listening on port 8084...');
