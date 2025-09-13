pm.test("Status code is 400, 404, or 422 for invalid/non-existent userId", function () {
    pm.expect(pm.response.code).to.be.oneOf([400, 404, 422]);
});

//checks response time
const threshold = Number(pm.environment.get("responseTimeThreshold") || 200);
pm.test(`Response time is less than ${threshold}ms`, function () {
    pm.expect(pm.response.responseTime).to.be.below(threshold);
});

//checks that the API returns an error message if the request is malformed
pm.test("Response body contains error message", function () {
    let jsonData = {};
    try { jsonData = pm.response,json();}
    catch (e) { }
    pm.expect(jsonData).to.have.property("error");
    pm.expect(jsonData.error).to.be.a("string").and.not.empty;
});

//error message in Response body
pm.test("Error message property exists and is not empty", function(){
    let jsonData ={};
    try { jsonData = pm.response.json();}
    catch(e) {}
    pm.expect(jsonData).to.have.property("error");
    pm.expect(jsonData.error).to.be.a("string").ans.not.empty;
})

//Invalid userId
pm.test("Invalid userId (malformed) returns 400 or 404", function () {
    pm.expect(pm.response.code).to.be.oneOf([400,404]);
});

//Non-existing userId
pm.test("Non-existing userId returns 404", function () {
    pm.expect(pm.response.code).to.equal(404);
});

pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

//URL Validation
pm.test("URL Endpoint is valid", function(){
    const baseUrl = pm.variables.get("baseURL");
    const userId = pm.variables.get("userId");
    pm.expect(pm.request.url.toString()).to.eql(`${baseUrl}/users/${userId}`);
});
