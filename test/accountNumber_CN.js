const  should = require("should");
const mocha = require("mocha");
const supertest = require("supertest");
var fs = require("fs");

var configDir = "/Users/macbookpro/JavaScriptMocha/AirwallexTest/Test/test.config";
var urlInfo = fs.readFileSync(configDir).toString();
var url = urlInfo.substring(4);
var server = supertest.agent(url);

function setBankInfo(payMethod, countryCode, accountName, accountNum, swiftCode, aba, bsb ) {
    return {
      payment_method: payMethod,
      bank_country_code: countryCode,
      account_name: accountName,
      account_number: accountNum,
      swift_code: swiftCode,
      aba: aba,
      bsb:bsb
    };
  }

describe("Executing scenarios for parameter 'account_number' for countryCode CN", function(){
    it("a valid account number value is passed, verify success response is returned", function(done){
        var cardWithValidInfo = setBankInfo("SWIFT", "CN", "Ron Smith", "001X78-45","ICBKCNBJ","11122233A","");  
        server.post('/bank')
        .send(cardWithValidInfo)
    .end(function(err,res){
        res.status.should.equal(200); 
        //res.body.should.equal("success": "Bank details saved"});
        done();
    });
    });
    
    it("a valid account number value of alphaumeric and special character is passed, verify success response is returned", function(done){
        var cardWithValidInfo = setBankInfo("SWIFT", "CN", "Tim Ryan", "0-78-6/ 7","ICBKCNBJ","11122233A","");  
        
        server.post('/bank')
        .send(cardWithValidInfo)
    .end(function(err,res){
        res.status.should.equal(200);   
          //res.body.should.equal({"success": "Bank details saved"}); 
        done();
    });
    });
    
    it("a valid account number value of 8 characters is passed, verify success response is returned", function(done){
        var cardWithValidInfo = setBankInfo("SWIFT", "CN", "Ron Smith", "0-78-6/7","ICBKCNBJ","11122233A","");  
        server.post('/bank')
        .send(cardWithValidInfo)
    .end(function(err,res){
        res.status.should.equal(200);   
          //res.body.should.equal({"success": "Bank details saved"}); 
        done();
    });
    });
    
    it("DEFECT: a valid account number value of 20 characters is passed, verify success response is returned", function(done){
        var cardWithValidInfo = setBankInfo("SWIFT", "CN", "Ron Smith", "A5786790000007891549","ICBKCNBJ","11122233A","");  
        server.post('/bank')
        .send(cardWithValidInfo)
    .end(function(err,res){
        res.status.should.equal(200);   //Status 400 is returned when account# is more than 9 characters
          //res.body.should.equal({"success": "Bank details saved"}); 
        done();
    });
    });
    
    it("DEFECT: account number value of 7 characters is passed, verify status 400 is returned", function(done){
        var cardWithValidInfo = setBankInfo("SWIFT", "CN", "Ron Ryan", "c576045","ICBKCNBJ","11122233A","");  
        server.post('/bank')
        .send(cardWithValidInfo)
    .end(function(err,res){
        res.status.should.equal(400);    //Status 200 is returned when account# is less than 8 characters
        done();
    });
    });
    
    
    it("account number value of more than 20 characters is passed, verify status 400 is returned", function(done){
        var cardWithValidInfo = setBankInfo("SWIFT", "CN", "Ron Smith", "c2476790084707891320342","ICBKCNBJ","11122233A","");  
        server.post('/bank')
        .send(cardWithValidInfo)
    .end(function(err,res){
        res.status.should.equal(400);    
        done();
    });
    });
    });