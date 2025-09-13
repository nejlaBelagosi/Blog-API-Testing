// Test: User doesn't exist
pm.test("Should return 404 and error message when user does not exist", function () {
    pm.expect(pm.response.code).to.eql(404);
    const jsonData = pm.response.json();
    pm.expect(jsonData.error).to.exist;
});

// Test: Body is empty
pm.test("Should return 400 and error message for empty body", function () {
    pm.expect(pm.response.code).to.eql(400);
    const jsonData = pm.response.json();
    pm.expect(jsonData.error).to.exist;
});

// Test: Invalid JSON
pm.test("Should return 400 and error message for invalid JSON", function () {
    pm.expect(pm.response.code).to.eql(400);
    const jsonData = pm.response.json();
    pm.expect(jsonData.error).to.exist;
});

// Test: Missing required fields
pm.test("Should return 422 for missing required fields", function () {
    // Only run this if you know the request body is missing fields
    pm.expect(pm.response.code).to.eql(422);
    const jsonData = pm.response.json();
    pm.expect(jsonData.error).to.include("missing");
});

// Test: Invalid userId
pm.test("Should return 400 or 404 for invalid userId", function () {
    // Only run this if userId is invalid
    pm.expect([400, 404]).to.include(pm.response.code);
});
