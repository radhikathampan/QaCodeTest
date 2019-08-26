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

describe("Executing scenarios for parameter 'account_number' for countryCode AU", function(){
it("a valid account number value is passed, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "AU", "Kim Philip", "124678","ICBCAUBJ","11122233A","123456"); 
   
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(200); 
    //res.body.should.equal("success": "Bank details saved")   
    done();
});
});

it("a valid account number value of 9 characters is passed, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "AU", "Kim Philip", "024678432","ICBCAUBJ","11122233A","123456"); 
   
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(200); 
    //res.body.should.equal("success": "Bank details saved");
    done();
});
});

it("a valid account number value of alphaumeric & special character is passed, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "AU", "Kim Philip", "1aB-6/ 7","ICBCAUBJ","11122233A","123456"); 
    server.post('/bank')
    .send(cardWithValidInfo)
.end(function(err,res){
    res.status.should.equal(200);    
    //res.body.should.equal("success": "Bank details saved");
    done();
});
});

//***********Status 400*****************/
it("account number value of 5 characters is passed, verify status 400 is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "AU", "Kim Philip", "56754","ICBCAUBJ","11122233A","123456");    
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(400); 
   //res.body.should.equal("error": "Length of account_number should be between 7 and 11 when bank_country_code is 'US'" );
    done();
});
});


it("account number value of more than 9 characters is passed, verify status 400 is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "AU", "Kim Philip", "5675456757868","ICBCAUBJ","11122233A","123456");    
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(400);  
    //res.body.should.equal("error": "Length of account_number should be between 7 and 11 when bank_country_code is 'US'" );  
    done();
});
});

it("account number parameter & value not passed, verify status 400 is returned", function(done){
    server.post('/bank')
    .send({
    payment_method: "SWIFT", 
    bank_country_code: "AU",
    account_name: "John Smith",    
    swift_code: "ICBCAUBJ", 
    aba: "11122233A"
    })
.end(function(err,res){
    res.status.should.equal(400);   
    //res.body.should.equal("error": "'account_number' is required");
    done();
});
});
});




