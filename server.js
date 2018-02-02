var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

var app = express();
//mine

app.listen(8000, () => {
  console.log('The server is running on port 8000');
});

app.get('/', (req, res) => {
  res.status(200).send('The API is accessible');
});

//get
app.get('/api/phonenumbers/parse/text/:phoneNumber',function(req, res){
	if(req.params.phoneNumber == 'nothing'){
		res.status(400).send('Arguments Not Found');
	}
	else{
		var list = [];
		list.push(req.params.phoneNumber);
		try {
			var finalList = numberParser(list);
			res.status(200).send(finalList);
		}
		catch(err) {
			res.status(400).send("Exception caught: " + err);
		}
	}
});

//post
app.post('/api/phonenumbers/parse/file', upload.single('file'),function(req, res){
if(!req.file){
	res.status(400).send('File Not Found');
}
else{
	var fs = require('fs');
    var contents = fs.readFileSync(req.file.path);
    var fileText = contents.toString('ascii');
    var buf = Buffer.from(fileText, 'base64');
    var numbers = buf.toString('ascii');
    var list = numbers.split('\n');

	try {
		var finalList = numberParser(list);
		res.status(200).send(finalList);
	}
	catch(err) {
		res.status(400).send("Exception caught: " + err);
	}
    
}
});

function numberParser(list){
  var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
  var PNF = require('google-libphonenumber').PhoneNumberFormat;
  
  var tel;
    var formattedArr = [];
    // Parsing and saving results
    for (var i = 0; i < list.length; i++) {
      tel = phoneUtil.parse(list[i], 'CA');
      formattedArr.push(phoneUtil.format(tel, PNF.INTERNATIONAL));
    }

    // Checking for duplicates and removing them from the final result
    var uniqArr = uniq(formattedArr);
    //console.log(uniqArr);
    return uniqArr;
}

function uniq(a) {
  return Array.from(new Set(a));
}

module.exports = app;