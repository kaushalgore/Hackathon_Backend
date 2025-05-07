const express = require("express");
const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");
const router = express.Router();

router.post("/", (req, res) => {
    const { userId, quoteId } = req.body;
    db.query(
        "INSERT INTO favourite (userId, quoteId) VALUES (?, ?)",
        [userId, quoteId],
        (err, result) => {
            if (err) return res.send(apiError(err));
            res.send(apiSuccess("Quote liked"));
        }
    );
});

router.delete("/", (req, res) => {
    const { userId, quoteId } = req.body;
    db.query(
        "DELETE FROM favourite WHERE userId=? AND quoteId=?",
        [userId, quoteId],
        (err, result) => {
            if (err) return res.send(apiError(err));
            res.send(apiSuccess("Quote unliked"));
        }
    );
});

router.get("/:userId", (req, res) => {
    const query = `
        SELECT q.* FROM quote q
        INNER JOIN favourite f ON f.quoteId = q.id
        WHERE f.userId = ?
        ORDER BY f.createdTime DESC
    `;
    db.query(query, [req.params.userId], (err, results) => {
        if (err) return res.send(apiError(err));
        res.send(apiSuccess(results));
    });
});

module.exports = router;
