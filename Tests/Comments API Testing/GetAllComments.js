//validation test 

//checks API status code
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// checks if response is valid json format
pm.test("Response is JSON", function(){
    pm.response.to.be.json;
});

//checks if response time is less than expected
pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

//checks if array is empty
pm.test("Check that array is not empty", function(){
    pm.expect(pm.response.json().length).to.be.above(0);
});

// check that every comment has required fields
pm.test("Check that every comment has required fields", function () {
    pm.expect(pm.response.json().every(comment => 
    comment.hasOwnProperty('id') && 
    comment.hasOwnProperty('name') && 
    comment.hasOwnProperty('postId') &&
    comment.hasOwnProperty('body'))).to.be.true;
});

//checks that API response has the correct data for each field
pm.test("Check that API response has the correct data for each field", function () {
    pm.response.json().forEach(comment => {
        pm.test(`Every commnet ${comment.id} has correct Data type`, function(){
            pm.expect(comment.id).to.be.a('number');
            pm.expect(comment.postId).to.be.a('number');
            pm.expect(comment.name).to.be.a('string');
            pm.expect(comment.body).to.be.a('string');
        });
    });
});

//checks that body is not the empty string
pm.test("Check that body is not the empty string", function () {
    pm.response.json().forEach(comment => {
        pm.test(`Body ${comment.body} has non-empty body`, function () {
            pm.expect(comment.body).to.not.be.empty;
        });
    })
});

//checks if API parameters are correctly passed
pm.test("Check that API parameters are correctly passed", function () {
    pm.expect(pm.response.json()[0].id).to.equal(1);
});

//checks if API request method is correct
pm.test("Check if API request methos is correct", function(){
    pm.expect(pm.request.method).to.equal('GET');
});

//checks if API endpoint URL is correct
pm.test("Check if API endpoint URL is correct", function () {
    pm.expect(pm.request.url.toString()).to.equal('https://jsonplaceholder.typicode.com/comments'); 
});

//checks if API headers are correct
pm.test("Check if API headers are correct", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
});

//checks if API payload is within expected time
pm.test("Check if API payload size is within acceptable limits", function () {
    pm.expect(pm.response.text().length).to.be.below(1000);
});

//checks that fields are not NULL
pm.test("Check that fields are not NULL", function () {
    pm.response.json().forEach(comment => {
        pm.expect(comment.id).to.not.be.null;
        pm.expect(comment.name).to.not.be.null;
        pm.expect(comment.body).to.not.be.null;
    });
});
