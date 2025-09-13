pm.test("Status code is 200 or 204", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 204]);
});

//checks response time
const threshold = Number(pm.environment.get("responseTimeThreshold")) || 200;
pm.test(`Response time is less than ${threshold}ms`, function () {
    pm.expect(pm.response.responseTime).to.be.below(threshold);
});

//checks if API URL Endpoint is valid
pm.test("URL Endpoint is valid", function () {
const baseUrl = pm.variables.get("baseUrl");
const commentId = pm.variables.get("commentId");
    pm.expect(pm.request.url.toString()).to.eql(`${baseUrl}/comments/${commentId}`);
});

//checks header content type
pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

//checks if post is really deleted
pm.test("Comment is deleted", function () {
    if(pm.response.code === 204){
        pm.expect(pm.response.text()).to.eql("");
    } else{
        const responseData = pm.response.json();
        pm.expect(Object.keys(responseData).length).to.be.at.most(1);
    }
});


