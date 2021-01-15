// dummy node server

const http = require('http')
const serverPort = 8080

http.createServer((req, res) => {

    switch (req.url) {
      case "/some": {
        res.write("this is SOME url \n");
        res.end();
        break;
      }
      case "/private":
      // res.write("this is Private url -> 403 \n");

      case "/403": {
        res.statusCode = 403;
        res.end();
        break;
      }
      case "/404": {
        res.statusCode = 404;
        res.end();
        break;
      }
      default: {
        res.write("Hello world, I am your dummy server!");
        res.end();
      }
    }

  })
  .listen(serverPort);

console.log(`-> Dummy server \'cooked\' on port http://localhost:${serverPort}`);