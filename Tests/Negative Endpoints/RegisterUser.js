// Test: Missing required fields
pm.test("Should return 400 and error message for missing required fields", function () {
    pm.expect(pm.response.code).to.equal(400);
    const error = pm.response.json().error;
    pm.expect(error).to.include("Missing required fields");
    // Optionally check which fields are missing if API provides details
});

// Test: Invalid email format
pm.test("Should return 400 or 422 for invalid email format", function () {
    let requestData = JSON.parse(pm.request.body.raw);
    let email = requestData.email;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        pm.expect(pm.response.code).to.be.oneOf([400, 422]);
        // Optionally check for error message
    }
});

// Test: Duplicate email
pm.test("Should return 409 for duplicate email", function () {
    let requestData = JSON.parse(pm.request.body.raw);
    let existingEmail = pm.environment.get("existingEmail");
    if (requestData.email === existingEmail) {
        pm.expect(pm.response.code).to.equal(409);
        // Optionally check for error message
    }
});

// Test: Body is not JSON
pm.test("Should return 415 and error message for non-JSON body", function () {
    pm.expect(pm.response.code).to.eql(415);
    // Optionally check for error message
});
