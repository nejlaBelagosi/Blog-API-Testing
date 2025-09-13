pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

//checks is json valid
pm.test("Response is valid JSON", function () {
    pm.expect(pm.response.json()).to.not.be.null;
});

//checks if API method is valid
pm.test("Method is POST", function () {
    pm.expect(pm.request.method).to.eql("POST");
});

//checks if API endpoint URL is correct
pm.test("Check if API endpoint URL is correct", function(){
    pm.expect(pm.request.url.toString()).to.eql(`https://jsonplaceholder.typicode.com/posts`);
}); 

//cheks that APi headers are correct
pm.test("Check if API headers are correct", function(){
    pm.expect(pm.request.headers.get("Content-Type")).to.include("application/json");
});

// Also check response Content-Type
pm.test("Response Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

//checks if object is created
pm.test("Check if object is created", function () {
    pm.expect(pm.response.json()).to.have.property('id');
    pm.expect(pm.response.json()).to.have.property('title');
    pm.expect(pm.response.json()).to.have.property('body');
});

//checks if fields are valid
pm.test("Check if fields are valid", function () {
    let requestBody = pm.request.body.raw;
    let requestData = JSON.parse(requestBody);
    pm.expect(pm.response.json().title).to.eql(requestData.title);
    pm.expect(pm.response.json().body).to.eql(requestData.body);

});

//checks if response contain userId
pm.test("Response contains userId", function () {
    pm.expect(pm.response.json()).to.have.property('userId');
});

//userId in response matches request
pm.test("userId in response matches request", function () {
    let requestBody = pm.request.body.raw;
    let requestData = JSON.parse(requestBody);
    let responseData = pm.response.json();
    pm.expect(responseData.userId).to.eql(requestData.userId);
});

//checks if API payload size is within accepted limits
pm.test("Check if API payload size is within accepted limits", function () {
    pm.expect(pm.request.body.raw.length).to.be.below(1024);
});
