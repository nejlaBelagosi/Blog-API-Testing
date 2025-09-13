// Post-response test script for DELETE /users/:userId

// Check if the API is JSONPlaceholder by inspecting the baseURL environment variable
const isJSONPlaceholder = pm.environment.get("baseUrl") && pm.environment.get("baseUrl").includes("jsonplaceholder");

// Test for deleting a non-existing user
if (isJSONPlaceholder) {
    // JSONPlaceholder returns 200 OK even if the user does not exist
    pm.test("Delete non-existing user in JSONPlaceholder returns 200 OK", function () {
        pm.expect(pm.response.code).to.eql(200);
        // Optionally, check response body structure if needed
    });
} else {
    // For other APIs, deleting a non-existing user should return 404 Not Found
    pm.test("Delete non-existing user returns 404 Not Found", function () {
        pm.expect(pm.response.code).to.eql(404);
        // Check if response body contains an error message or structure
        try {
            var jsonData = pm.response.json();
            pm.expect(jsonData).to.be.an('object');
            pm.expect(jsonData.error || jsonData.message).to.exist;
        } catch (e) {
            // Response is not JSON or no error message present
            pm.test("Response body is valid JSON with error message", function () {
                pm.expect.fail("Response body is not valid JSON or missing error message");
            });
        }
    });
}

// Test for idempotency: deleting the same user twice should yield consistent error responses
pm.test("Idempotency test: deleting the same user twice returns consistent error responses", function () {
    // We assume the userId variable is set in the environment or collection
    const userId = pm.variables.get("userId") || "";
    if (!userId) {
        pm.test.skip("No userId provided for idempotency test");
        return;
    }

    // Send the DELETE request again for the same userId
    pm.sendRequest({
        url: pm.request.url.toString(),
        method: 'DELETE',
        header: pm.request.headers.toObject(),
        body: pm.request.body ? pm.request.body.toString() : undefined
    }, function (err, res) {
        pm.test("Second delete request returns expected status code", function () {
            if (isJSONPlaceholder) {
                pm.expect(res.code).to.eql(200);
            } else {
                pm.expect(res.code).to.eql(404);
            }
        });

        if (!isJSONPlaceholder) {
            pm.test("Second delete response contains error message", function () {
                try {
                    var jsonData = res.json();
                    pm.expect(jsonData.error || jsonData.message).to.exist;
                } catch (e) {
                    pm.expect.fail("Second delete response body is not valid JSON or missing error message");
                }
            });
        }
    });
});

// Suggested tests for other invalid user IDs
// These tests can be added as separate requests or as part of a collection run
// Examples include malformed userId (e.g., special characters), empty userId, or null
// For demonstration, here is a test for empty userId in this response script context
pm.test("Delete user with empty userId returns error", function () {
    // This test assumes the request was sent with an empty userId path variable
    pm.expect(pm.response.code).to.be.oneOf([400, 404]); // Depending on API design
});

// End of post-response test script
