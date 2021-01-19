const nodeSass = require("node-sass"); 
const cors = require("cors")

const express = require("express"); 

const app = express(); 
app.use(express.json({limit: '50mb'}));
app.use(cors())


const port = process.env.PORT || 3001; 

var compile = function(req, res) {
    var stats = {};
    console.log(req.body);
    nodeSass.render({
      data: req.body.sass + ' ',
      outputStyle: "expanded",
      error: function(error) {
        res.status(500).send(error);
      }
    }, (err, result) => {
        if (err) {
            res.status(500).end(); 
        }
        else {
            res.json({
                css: result.css.toString()
            });
        }
    });
  };

  app.post('/compile', compile);

  app.listen(port, () => {
    console.info(`Compiler app listening at http://localhost:${port}`)
  }); 
