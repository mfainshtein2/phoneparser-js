
var app = require('./app');

var port = process.env.PORT || 8000;

app.listen(port, function(){
  console.log('Server started on http://localhost:' + port);
});

