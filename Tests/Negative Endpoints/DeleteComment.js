// negative test cases for DELETE /comments/:commentId
// Covers: non-existing comment, malformed ID, idempotency, error message validation

// Helper: Check for error message in response
function hasErrorMessage(json) {
    return json && (json.error || json.message || json.msg);
}

pm.test("Should return 404 for non-existing comment (if API supports)", function(){
    // If the API returns 404 for non-existing comment
    if (pm.environment.get('nonExistingCommentId')) {
        pm.expect([404, 200]).to.include(pm.response.code);
        // Accept 200 for APIs like JSONPlaceholder, but prefer 404 for real APIs
        if (pm.response.code === 404) {
            var json = {};
            try { json = pm.response.json(); } catch(e) {}
            pm.expect(hasErrorMessage(json)).to.be.true;
        }
    }
});

pm.test("Should return 400 for malformed commentId", function () {
    if (pm.request.url.path[pm.request.url.path.length-1] === 'invalid-id') {
        pm.expect(pm.response.code).to.eql(400);
        var json = {};
        try { json = pm.response.json(); } catch(e) {}
        pm.expect(hasErrorMessage(json)).to.be.true;
    }
});

pm.test("Idempotency: Deleting already deleted comment returns 404 or 200", function () {
    // Accept 200 for idempotent APIs like JSONPlaceholder
    if (pm.environment.get('deletedCommentId')) {
        pm.expect([404, 200]).to.include(pm.response.code);
    }
});
