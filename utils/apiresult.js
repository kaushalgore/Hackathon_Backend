function apiSuccess(data) {
    return { status: "success", data };
}

function apiError(msg) {
    return { status: "error", message: msg };
}

module.exports = { apiSuccess, apiError };
