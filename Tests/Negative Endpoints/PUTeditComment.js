//Post doesn't exist
pm.test("Post doesn't exist", function () {
    pm.expect(pm.response.code).to.eql(404);
});

//Body is empty
pm.test("Body is empty", function () {
    pm.expect(pm.response.code).to.eql(400);
});

//Invalid JSON
pm.test("Invalid JSON", function () {
    pm.expect(pm.response.code).to.eql(400);
});

// Idempotency: Editing a deleted comment returns 404 (if applicable)
pm.test("Idempotency: Editing already deleted comment returns 404", function () {
    if (pm.environment.get('deletedCommentId') && pm.request.url.path.includes(pm.environment.get('deletedCommentId'))) {
        pm.expect(pm.response.code).to.eql(404);
    }
});

//Missing required fields (e.g., title or body)
pm.test("Should return 400 for missing required fields", function () {
    let reqBody = {};
    try { reqBody = JSON.parse(pm.request.body.raw); } catch (e) { }
    if (!reqBody.title || !reqBody.body) {
        pm.expect(pm.response.code).to.eql(400);
        let json = {};
        try { json = pm.response.json(); } catch (e) { }
        pm.expect(hasErrorMessage(json)).to.be.true;
    }
});

//Non-existing commentId
pm.test("Should return 404 for non-existing post", function () {
    if (pm.environment.get('nonExistingCommentId') && pm.request.url.path.includes(pm.environment.get('nonExistingCommentId'))) {
        pm.expect(pm.response.code).to.eql(404);
        let json = {};
        try { json = pm.response.json(); } catch (e) { }
        pm.expect(hasErrorMessage(json)).to.be.true;
    }
});
