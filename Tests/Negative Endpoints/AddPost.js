//Missing required fields
pm.test("Missing required fields", function () {
    pm.expect(pm.response.code).to.equal(400);
    pm.expect(pm.response.json().error).to.include("Missing required fields");
});


//Post already exists
pm.test("Post already exists", function () {
    let existingPostId = Number(pm.environment.get("postId"));
    let requestData = JSON.parse(pm.request.body.raw);
    if (requestData.id === existingPostId) {
        pm.expect(pm.response.code).to.equal(409);
    }else{
        console.log("Post doesn't use existing id")
    }
});

//body is not json
pm.test("body is not json", function () {
    pm.expect(pm.response.code).to.eql(415);
});

// Test: Malformed JSON body
pm.test("Malformed JSON body returns 400 or 415", function () {
    // Only run if the request body is intentionally malformed
    pm.expect([400, 415]).to.include(pm.response.code);
});

// Test: Wrong data type for userId
pm.test("Wrong data type for userId returns 400 or 422", function () {
    let requestData = JSON.parse(pm.request.body.raw);
    if (typeof requestData.userId !== "number") {
        pm.expect([400, 422]).to.include(pm.response.code);
    }
});
