var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , request = require('request')
var events =require('events');
var sys = require('sys');
var TMSPhonebook   = require('./TMSPhonebook');

//Global Variables  #change them

var TMSHostName = 'acetms.cisco.com' 
var TMSUsername = 'marfeder'
var TMSPassword = 'Mdaf27%%'
var HTTPPort = 3000;
var CodecMAC = 'E4:C7:22:60:F2:B7'   // TMS registered Endpoint MAC address (you are searching the phone books asscoiated with this endpoint)


var TMSWebPhonebookSearch = function() {

      //  Scope.

    var self = this;
    app = this;
    this.reqid = 0;
    this.res= null;
    this.tmspb = new TMSPhonebook(TMSHostName,TMSUsername,TMSPassword)
    this.tmspb.setCodecMac(CodecMAC)

     self.intialized = false

    self.compile = function(str, path) {
        return stylus(str)
        .set('filename', path)
        .use(nib())
    }

    
    self.initializeServer = function() {
        this.tmspb.init()
        this.app = express()

        this.app.set('views', __dirname + '/views')
        this.app.set('view engine', 'jade')
        //app.use(express.logger('dev'))
        this.app.use(stylus.middleware(
        { src: __dirname + '/public'
          , compile: this.compile
        }
        ))
      this.app.use(express.static(__dirname + '/public'))

      this.app.get('/', function (req, res) {
        res.render('index',
          { title : 'Home' }
         )
      })

      this.app.get('/searching', function(req, res, body){
       // input value from search
       var val = req.query.search;
       
        reqid = self.tmspb.search(val,function(err, result) {

          if (err)
          {
             console.log("%j",err);
            res.end('Error Processing request!')

          }
          else
          {
            
            theResults = result.SearchResult.Entry
            res.render('results',{results:theResults}) 
           
          }

        }
        );

      });
    }

    self.startServer = function() {
      this.app.listen(3000)
    }

}

var theApp = new TMSWebPhonebookSearch();
theApp.initializeServer();
theApp.tmspb.on('initialized', function(client) 
  { 
      theApp.startServer()
    }
)


