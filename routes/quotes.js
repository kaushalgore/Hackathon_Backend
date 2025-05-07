const express = require("express");
const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");
const router = express.Router();

router.post("/", (req, res) => {
    const { author, contents, userId } = req.body;
    db.query(
        "INSERT INTO quote (author, contents, userId) VALUES (?, ?, ?)",
        [author, contents, userId],
        (err, result) => {
            if (err) return res.send(apiError(err));
            res.send(apiSuccess("Quote added successfully"));
        }
    );
});

router.get("/", (req, res) => {
    db.query("SELECT * FROM quote ORDER BY createdTime DESC", (err, results) => {
        if (err) return res.send(apiError(err));
        res.send(apiSuccess(results));
    });
});

router.put("/:id", (req, res) => {
    const { author, contents } = req.body;
    db.query(
        "UPDATE quote SET author=?, contents=? WHERE id=?",
        [author, contents, req.params.id],
        (err, result) => {
            if (err) return res.send(apiError(err));
            if (result.affectedRows === 0) return res.send(apiError("Quote not found"));
            res.send(apiSuccess("Quote updated"));
        }
    );
});

router.delete("/:id", (req, res) => {
    db.query("DELETE FROM quote WHERE id=?", [req.params.id], (err, result) => {
        if (err) return res.send(apiError(err));
        if (result.affectedRows === 0) return res.send(apiError("Quote not found"));
        res.send(apiSuccess("Quote deleted"));
    });
});

router.get("/user/:userId", (req, res) => {
    db.query("SELECT * FROM quote WHERE userId=?", [req.params.userId], (err, results) => {
        if (err) return res.send(apiError(err));
        res.send(apiSuccess(results));
    });
});

module.exports = router;
