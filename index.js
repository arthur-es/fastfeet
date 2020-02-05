var express = require('express');
var server = express();

// um plugin, para que o express consiga ler o corpo de uma post request em json
server.use(express.json());


//Middleware global (exemplo)
server.use((req, res, next) => {
  console.time("Request");

  console.log(`Método: ${req.method} - `, `URL: ${req.url}`);

  next();

  console.timeEnd("Request"); // loga tempo decorrido desde console.time
});



server.get('/', function (req, res) {
  res.send('Hello World!');
});


server.listen(3000, () => {
  console.log("Server listening on PORT 3000", "http://localhost:3000")
});