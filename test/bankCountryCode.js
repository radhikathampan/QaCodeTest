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

describe("Executing scenarios for parameter 'bank_country_code", function(){
it("valid value of 'US' is passed, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "US", "SAM JOSE", "124","ICBCUSBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(200);
    console.log(res.body);
    done();
});
});

it("valid value of 'AU' is passed, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "AU", "John Smith", "1234567","ICBCAUBJ","11122233A","123456");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(200);
    console.log(res.body);
    done();
});
});

it("valid value of 'CN' is passed, verify success response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "CN", "Kim John", "12345678","ICBCCNBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(200);
    console.log(res.body);
    done();
});
});
it("parameter is missing, verify 400 response is returned", function(done){
    server.post('/bank')
    .send({
    payment_method: "SWIFT", 
    account_name: "John Smith",
    account_number: "12345678", 
    swift_code: "ICBCCNBJ", 
    aba: "11122233A"
    })
.end(function(err,res){
    res.status.should.equal(400);
    console.log(res.body);
    done();
});
});
it("invalid value is passed, verify 400 response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "SCN", "SAM JOSE", "124","ICBCCNBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(400);
    console.log(res.body);
    done();
});
});
it("lowercase text value is passed, verify 400 response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", "cn", "SAM JOSE", "124","ICBCCNBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(400);
    console.log(res.body);
    done();
});
});

it(" value with a space in beginning is passed, verify 400 response is returned", function(done){
    var cardWithValidInfo = setBankInfo("SWIFT", " CN", "SAM JOSE", "124","ICBCCNBJ","11122233A","");  
    server.post('/bank')
    .send(cardWithValidInfo)
    .end(function(err,res){
    res.status.should.equal(400);
    console.log(res.body);
    done();
});
});
});