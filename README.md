# TMS Web Phone book Search 
> A way to search TMS phone books via the web


## Install

Install with [npm](http://github.com/isaacs/npm):

```
Clone the respository:

  git clone https://github.com/marchfederico/TMSWebPhonebookSearch.git

Install the dependancies:

  npm install

Edit the global variables in app.js to match your deployment:

  //Global Variables  #change them

  var TMSHostName = 'tms.server.com' 
  var TMSUsername = 'username'
  var TMSPassword = 'password'
  var HTTPPort = 3000;
  var CodecMAC = 'E4:C7:22:60:F2:B8'   // TMS registered Endpoint MAC address (you are searching the phone books asscoiated with this endpoint)

Run the app

  node app.js


## Contributors

 * Author: [Marcello Federico](https://github.com/marchfederico)
 

