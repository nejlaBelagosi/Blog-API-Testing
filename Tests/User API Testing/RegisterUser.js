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
    pm.expect(pm.request.url.toString()).to.eql(`https://jsonplaceholder.typicode.com/users`);
}); 

//cheks that APi headers are correct
pm.test("Check if API headers are correct", function(){
    pm.expect(pm.request.headers.get("Content-Type")).to.include("application/json");
});

//checks if object is created
pm.test("Check if object is created", function () {
    pm.expect(pm.response.json()).to.have.property('id');
    pm.expect(pm.response.json()).to.have.property('name');
    pm.expect(pm.response.json()).to.have.property('address');
    pm.expect(pm.response.json()).to.have.property('phone');
    pm.expect(pm.response.json()).to.have.property('email');
});

//checks if fields are valid
pm.test("Check if fields are valid", function () {
    let requestBody = pm.request.body.raw;
    let requestData = JSON.parse(requestBody);
    pm.expect(pm.response.json().name).to.eql(requestData.name);
    pm.expect(pm.response.json().address).to.eql(requestData.address);
    pm.expect(pm.response.json().email).to.eql(requestData.email).and.to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

});



//checks if API payload size is within accepted limits
pm.test("Check if API payload size is within accepted limits", function () {
    pm.expect(pm.request.body.raw.length).to.be.below(1024);
});
