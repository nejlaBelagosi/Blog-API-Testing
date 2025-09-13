pm.test("Editing invalid field returns 400 or ignored", function () {
    let requestData = JSON.parse(pm.request.body.raw);
    if (requestData.hasOwnProperty("randomField")) {
        pm.expect(pm.response.code).to.be.oneOf([200, 400]);
    }
});

//editing deleted comment
pm.test("Idempotency: Editing already deleted comment returns 404", function () {
    if (pm.environment.get('deletedCommentId') && pm.request.url.path.includes(pm.environment.get('deleteCommentId'))) {
        pm.expect(pm.response.code).to.eql(404);
    }
});



