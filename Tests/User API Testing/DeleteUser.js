pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

//checks response time
pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

//checks if API URL Endpoint is valid
pm.test("URL Endpoint is valid", function () {
    pm.expect(pm.request.url.toString()).to.eql(`https://jsonplaceholder.typicode.com/users/${pm.globals.get("userId")}`);
});

//checks header content type
pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

//checks if user is really deleted
pm.test("User is deleted", function () {
    let responseData = pm.response.json() ? pm.response.json() : {};
    pm.expect(Object.keys(responseData).length).to.be.at.most(1);
});


