# Web Based TMS Phonebook Search 

TMSWebPhonebookSearch is a NodeJS  server side application.  You must have NodeJS installed on the server you plan to run the application on.  Below are the steps for you to get the TMSWebPhonebookSearch application running on your own server.


## Install

1.	Download and install NodeJS  Go to http://nodejs.org/ and install the latest package on your server.

2.	Install the TMSWebPhonebookSearch application from github.com.  There are two ways to do this:

	If you have the git tools installed you can just clone the TMSWebPhonebookSearch repository by issuing this command:

	git clone https://github.com/marchfederico/TMSWebPhonebookSearch.git

 	OR

	Download the zipped up package from this location:
	https://github.com/marchfederico/TMSWebPhonebookSearch/archive/master.zip
	The contents will unzip into a new folder.

3.	In the TMSWebPhonebookSearch directory, install the module dependencies by issuing this command:

	npm install

4.	Edit the global variables in the  app.js file to match your deployment:

	````javascript
  	//Global Variables  #change them

  	var TMSHostName = 'tms.server.com' 
  	var TMSUsername = 'username'
  	var TMSPassword = 'password'
  	var HTTPPort = 3000;
  	var CodecMAC = 'E4:C7:22:60:F2:B8'   // TMS registered Endpoint MAC address (you are searching the phone books asscoiated with this endpoint)
	````

5.	Run the application by issues this command

  	node app.js


6.	Test your deployment by going to the http://yourserver_ip:3000/


## Contributors

 * Author: [Marcello Federico](https://github.com/marchfederico)
 

