var fs = require('fs');
var request = require('supertest');

var app = require('./server.js');
var path = require('path');

describe('API Test Parser', function(){
  // GET - root
   test('root should return status 200', function(done){
	   request(app).get('/').end(function(req,res){
		   expect(res).to.have.status(200);
		   done();
	   });
   });
   
   test('should return [\'+1 416-280-5555\']', function(done){
	   request(app).get('/api/phonenumbers/parse/text/Seneca%20Phone%20Number%3A%20416-280-5555').end(function(req,res){
		   expect(res).to.have.status(200);
		   expect(res.body).to.be.an('array').that.include('+1 416-280-5555');
		   done();
	   });
   });
   
   test('should return [\'+1 416-874-5654\',\'+1 416-874-5653\',\'+1 416-874-5652\',\'+1 416-874-5651\',\'+34 168745654\']', function(done){
	   request(app).post('/api/phonenumbers/parse/file').set('Content-Type', 'text/plain').attach('file', fs.readFileSync('./numbers.txt'), 'numbers.txt').end(function(req,res){
		   expect(res).to.have.status(200);
		   expect(res.body).to.be.an('array').that.include("+1 416-874-5654","+1 416-874-5653","+1 416-874-5652","+1 416-874-5651","+34 168745654");
		   done();
	   });
   });
   
});
