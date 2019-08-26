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

describe("Executing scenarios for parameter 'account_name", function(){
it("valid value of name is passed, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "US", "SAM JOSE", "124","ICBCUSBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(200);
    done();
});
});

it("valid value of 2 characters is passed, verify success response is returned", function(done){
    
    var cardWithValidInfo = setBankInfo("SWIFT", "US", "JS", "124","ICBCUSBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(200);
    done();
});
});

it("valid value of 10 characters is passed, verify success response is returned", function(done){
    server.post('/bank')
    var cardWithValidInfo = setBankInfo("SWIFT", "US", "Andrea Ben", "124","ICBCUSBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(200);
    done();
});
});
it("valid value having special character is passed, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "US", "O'Sullivan", "124","ICBCUSBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(200);
    done();
});
});
it("valid value having number is passed, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "AU", "John5", "124678","ICBCAUBJ","11122233A","123456");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(200);
    done();
});
});

it("value with 1 character is passed, verify status 400 is returned", function(done){
    var cardWithValidInfo = setBankInfo("LOCAL", "US", "J", "124","ICBCUSBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(400);
    done();
});
});

it("value with more than 10 characters is passed, verify status 400 is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "US", "JIsabella Sebastian", "124","ICBCUSBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(400);
    //res.status.expect.to.("account_name should be between 2 and 10");
    done();
});
});

});