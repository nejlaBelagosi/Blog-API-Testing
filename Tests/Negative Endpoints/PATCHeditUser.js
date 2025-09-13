pm.test("Editing invalid field ", function () {
    let requestData = JSON.parse(pm.request.body.raw);
    if (requestData.hasOwnProperty("randomField")) {
        pm.expect(pm.response.code).to.be.oneOf([400, 422]);
    }
});


pm.test("Invalid email format", function () {
    let requestData = JSON.parse(pm.request.body.raw);
    let email = requestData.email;

    // Regex za validan email
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        pm.expect(pm.response.code).to.be.oneOf([400, 422]); 
    } else {
        console.log("Email format je validan, ovaj test se preskače");
        pm.expect(pm.response.code).to.be.oneOf([200, 201]); 
    }
});

// Test: Missing required fields
pm.test("Missing required fields returns 400 or 422", function () {
    let requestData = JSON.parse(pm.request.body.raw);
    if (!requestData.email) {
        pm.expect(pm.response.code).to.be.oneOf([400, 422]);
    }
});

// Test: Non-existent user
pm.test("Non-existent user returns 404", function () {
    // Only run if userId is known to not exist
    pm.expect(pm.response.code).to.eql(404);
});
