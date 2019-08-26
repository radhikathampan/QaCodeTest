const supertest = require("supertest");
const  should = require("should");
const mocha= require("mocha");
var fs = require("fs");

var configDir = "/Users/macbookpro/JavaScriptMocha/AirwallexTest/Test/test.config";
var urlInfo = fs.readFileSync(configDir).toString();
var url = urlInfo.substring(4);
var server = supertest.agent(url);

function setPayloadInfo(payMethod, countryCode, accountName, accountNum, swiftCode, aba ) {
    return {
      payment_method: payMethod,
      bank_country_code: countryCode,
      account_name: accountName,
      account_number: accountNum,
      swift_code: swiftCode,
      aba: aba
    };
  }


describe("Executing scenarios for parameter 'aba", function(){
it("valid value of aba is passed for countryCode US, verify success response is returned", function(done){
    var cardWithValidName = setPayloadInfo("SWIFT", "US", "Tom Philip", "124","ICBCUSBJ","11122233A"); 
    server.post('/bank')
    .send(cardWithValidName)
    .end(function(err,res){
    res.status.should.equal(200);
    //res.body.should.equal({"success": "Bank details saved"}); 
    done();
    });
});

it("valid value of aba is passed for countryCode US, verify success response is returned", function(done){
    var abaWithSpeciallCharacter = setPayloadInfo("LOCAL", "US", "Mat Philip", "124","ICBCUSBJ","0-31A /1b"); 
    server.post('/bank')
    .send(abaWithSpeciallCharacter)
    .end(function(err,res){
    res.status.should.equal(200);
    //res.body.should.equal({"success": 'Bank details saved"})
    done();
    });
});
    
it("aba parameter not passed for the countryCode CN, verify success response is returned", function(done){
    var abaValueNotPassedForCn = setPayloadInfo("SWIFT", "CN", "Tom Philip", "124678575","ICBCCNBJ"); 
    server.post('/bank')
    .send(abaValueNotPassedForCn)
    .end(function(err,res){
    res.status.should.equal(200);
    //res.body.should.equal({"success: 'Bank details saved"})
    done();
    });
});
    
it("DEFECT: aba value of 7 digits is passed, verify status response of 400 is returned", function(done){
    var abaof7Digits = setPayloadInfo("SWIFT", "CN", "Tom Philip", "124678575","ICBCCNBJ", "0234789"); 
    server.post('/bank')
    .send(abaof7Digits)
    .end(function(err,res){
    res.status.should.equal(400);  //Defect-> Response showing as 200
   // res.body.should.equal({"error": "Length of 'aba' should be 9"});
    done();
    });
});

it("DEFECT: null aba value passed for the countyCode:US, verify status response of 400 is returned", function(done){
        var abaof7Digits = setPayloadInfo("SWIFT", "CN", "Tom Philip", "124678575","ICBCCNBJ", ""); 
        server.post('/bank')
        .send(abaof7Digits)
        .end(function(err,res){
        res.status.should.equal(400);  //Defect-> Response showing as 200
        //res.body.should.equal({"error": "missing aba value"});
        done();
        });
    });

it("DEFECT: aba parameter and value missing for the countyCode:US, verify status response of 400 is returned", function(done){
        var abaof7Digits = setPayloadInfo("SWIFT", "CN", "Tom Philip", "124678575","ICBCCNBJ"); 
        server.post('/bank')
        .send(abaof7Digits)
        .end(function(err,res){
        res.status.should.equal(400); //Defect-> Response showing as 200
        //res.body.should.equal({"error": "missing aba value"});
        done();
        });
    });

it("DEFECT: invalid aba parameter name is passed (aaa), verify status response of 400 is returned", function(done){
        server.post('/bank')
        .send({
        payment_method: "SWIFT", 
        bank_country_code: "US",
        account_name: "John Smith",
        account_number: "124", 
        swift_code: "ICBCUSBJ", 
        aaa: "11122233A"
        })
        .end(function(err,res){
        res.status.should.equal(400);   //Defect-> Response showing as 200
        //res.body.should.equal({"error": "invalid parameter name"});
        done();
        });
    });
})