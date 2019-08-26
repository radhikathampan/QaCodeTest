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

describe("Executing scenarios for the parameter 'bsb'", function(){
it("a valid bsb number value is passed, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "AU", "John Smith", "124678","ICBCAUBJ","11122233A","123456");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(200); 
    console.log(res.body);
   // res.body.should.equal("{ success: 'Bank details saved' }");   
    done();
});
});

it("a 6 digit valid bsb number value with special character & alpha numeric is passed, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "AU", "John Smith", "124678","ICBCAUBJ","11122233A","3-6A/7");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(200);    
    done();
});
});

it("a null value passed for countryCode US, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "US", "Tom Philip", "124","ICBCUSBJ","11122233A",""); 
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(200);    
    done();
});
});

//******************************************************************************************************************************************** */

it("a null value passed for the bsb number, verify status 400 response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "AU", "John Smith", "3-6A","ICBCAUBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(400);    
    done();
});
});

it("a 4 digit value passed for the bsb number, verify status 400 response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "AU", "John Smith", "3-6A","ICBCAUBJ","11122233A","1234");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(400);    
    //res.body.should.eqaul("")
    done();
});
});
});
