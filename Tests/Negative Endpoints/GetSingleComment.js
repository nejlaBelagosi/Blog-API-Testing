// Test: Non-existing commentId returns 404 and error message
pm.test("Non-existing commentId returns 404 and error message", function () {
    pm.expect(pm.response.code).to.eql(404);
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("error");
    pm.expect(jsonData.error).to.include("not found");
});

// Test: Malformed commentId returns 400 or 422 and error message
pm.test("Malformed commentId returns 400 or 422 and error message", function () {
    // Only run if postId is malformed
    pm.expect([400, 422]).to.include(pm.response.code);
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("error");
});

// Test: Missing commentId returns 404 or 400
pm.test("Missing commentId returns 404 or 400", function () {
    // Only run if commentId is missing from the request
    pm.expect([400, 404]).to.include(pm.response.code);
});
