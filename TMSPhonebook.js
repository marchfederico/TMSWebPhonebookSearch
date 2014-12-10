process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; 
process.env.NODE_DEBUG = 'request http soap';
var events =require('events');
var sys = require('sys');

var TMSPhonebook = function(ip,username,password) {
    
  this.soap = new require('soap');
  this.client=null;
  this.ip = ip;
  this.options = {}
  this.username =username;
  this.password =password;
  this.codecMAC =''
  this.options.wsdl_headers={};
  this.options.wsdl_options={ 'auth': {
    'user': username,
    'pass': password,
    'sendImmediately': true
  }};
   events.EventEmitter.call(this);   
};

TMSPhonebook.super_= events.EventEmitter;

TMSPhonebook.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: TMSPhonebook,
        enumerable: false
    }
});

TMSPhonebook.prototype.setClient = function(c)
{
    this.client = c;
}
TMSPhonebook.prototype.getClient = function()
{
    return this.client;
}

TMSPhonebook.prototype.setCodecMac= function(mac)
{
  this.codecMAC = mac;
}

TMSPhonebook.prototype.search = function(searchtext, callback)
{

  var self = this;

  var searchparm = {
        Identification : {
            MACAddress : this.codecMAC,
        },

        MaxResult: 50,
        SearchString: searchtext,
     
    }

  self.request("Search",searchparm,callback);
}

TMSPhonebook.prototype.initCallback = function(err,client) {
    var self = this;
    if (err)
        console.log(err)
    else
    {
        this.client = client;
        this.emit("initialized",this.client)
    }
}

TMSPhonebook.prototype.init = function() {
   
    var self = this;
    self.url = 'https://'+self.ip+'/tms/public/external/phonebook/phonebookservice.asmx?WSDL';
    self.soap.createClient(self.url,self.options,function(err,client) {
        if (err)
        {
             self.emit("error",err)
        }
        else
        {         
            self.setClient(client);
            self.client.setSecurity(new self.soap.BasicAuthSecurity(self.username, self.password));
            self.emit("initialized",self.client)
        }
    } );
  
}


TMSPhonebook.prototype.request = function(fname,args,callback) {
    var self = this;
    var fn = self.client[fname];
    fn.apply(this,[args, callback]);    
};

module.exports = TMSPhonebook;


