pm.test("Status code is 200", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 204]);
});

//checks response time
pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

//checks if API URL Endpoint is valid
pm.test("URL Endpoint is valid", function () {
    pm.expect(pm.request.url.toString()).to.eql(`https://jsonplaceholder.typicode.com/posts/${pm.globals.get("postId")}`);
});

//checks header content type (if response has a body)
pm.test("Content-Type is application/json if body exists", function () {
    if (pm.response.text()) {
        pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
    }
});

//checks if post is really deleted (response is empty or has a confirmation)
pm.test("Post is deleted", function () {
    if(pm.response.text()){
        let responseData = pm.response.json();
        pm.expect(Object.keys(responseData).length).to.be.at.most(1);
    } else {
        pm.expect(pm.response.code).to.be.oneOf([200, 204]); //204 No Content is also valid if the post is deleted successfully without returning a body
    }
});


