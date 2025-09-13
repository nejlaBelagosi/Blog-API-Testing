pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

//checks if JSON is valid
pm.test("Response is valid JSON", function () {
    pm.response.json();
});

//checks if API payload is within accepted limits
pm.test("Payload is within accepted limits", function () {
    pm.expect(pm.response.text().length).to.be.below(1024);
});

//checks if expected method is PATCH
pm.test("Method is PATCH", function () {
    pm.expect(pm.request.method).to.eql("PATCH");
});

//checks if expected URL is correct
pm.test("URL is correct", function () {
    pm.expect(pm.request.url.toString()).to.eql(`https://jsonplaceholder.typicode.com/comments/${pm.globals.get("commentId")}`);
});

//checks response id to match variable
pm.test("Response body contains expected id", function () {
    let responseData = pm.response.json();
    let expectedId = pm.variables.get("commentId") || pm.globals.get("commentId");
    pm.expect(responseData.id).to.eql(Number(expectedId));
});

//checks if some fields are correctly updated
pm.test("Some fields are correctly updated", function () {
    let requestData = JSON.parse(pm.request.body.raw);
    let responseData = pm.response.json();
    for (let key in requestData) {
        pm.expect(responseData[key]).to.eql(requestData[key]);
    }
});

//checks if header is correctly set
pm.test("Header is correctly set", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.eql("application/json; charset=utf-8");
});

//checks if field type is correct
pm.test("Field type is correct", function () {
    let responseData = pm.response.json();
    pm.expect(responseData.name).to.be.a("string");
    if (responseData.body !== undefined) {
        pm.expect(responseData.body).to.be.a("string");
    }
});
