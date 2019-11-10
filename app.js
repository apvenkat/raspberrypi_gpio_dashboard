var express = require('express');
var app = express();
app.set('port', process.env.PORT || 4000);

app.use(express.static('./public'));
app.use(require('./routes/api'));
app.use(require('./routes/config'));

app.set('views', 'app/views');
app.get('/',function(req,res){
res.send("Welcome");

});

var server= app.listen(app.get('port'),function(){
  console.log('Listening on port'+ app.get('port'));
});
