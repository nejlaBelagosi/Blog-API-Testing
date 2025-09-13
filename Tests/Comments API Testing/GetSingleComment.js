pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

//checks valid json
pm.test("Response is valid JSON", function () {
    pm.response.to.be.json;
});

//checks if id value is correct
pm.test("Response id value is correct", function () {
    let expectedCommentId = Number(pm.globals.get("commentId"));
    pm.expect(pm.response.json().id).to.equal(expectedCommentId);
});

//checks if API method is correct
pm.test("API method is GET", function () {
    pm.expect(pm.request.method).to.equal('GET');
});

//checks if API URL is correct
pm.test("API URL is correct", function () {
    pm.expect(pm.request.url.toString()).to.include(`https://jsonplaceholder.typicode.com/comments/${pm.globals.get('commentId')}`);
});

//checks Header fields
pm.test("Response contains expected headers", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
});

//cheks API payload size
pm.test("Check if API payload size is within acceptable limits", function () {
    pm.expect(pm.response.text().length).to.be.below(1000);
});
