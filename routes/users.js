const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");
const { createToken } = require("../utils/jwtauth");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();



// ✅ User sign in (JWT issued)
router.post("/signin", (req, res) => {
	const { email, password } = req.body;
	db.query("SELECT * FROM user WHERE email=?", [email], (err, results) => {
		if (err) return res.send(apiError(err));
		if (results.length !== 1) return res.send(apiError("Invalid email"));
		const dbUser = results[0];
		const isMatching = bcrypt.compareSync(password, dbUser.password);
		if (!isMatching) return res.send(apiError("Invalid password"));
		const token = createToken(dbUser);
		res.send(apiSuccess({ ...dbUser, token }));
	});
});

// ✅ User sign up (password hashed)
router.post("/signup", (req, res) => {
	const { firstName, lastName, email, password,phoneno,address} = req.body;
	const encPasswd = bcrypt.hashSync(password, 10);
	const enabled = 1, role = "ROLE_CUSTOMER";
	db.query(
		"INSERT INTO user (firstName, lastName, email, password,phoneno,address) VALUES (?, ?, ?, ?, ?, ?)",
		[firstName, lastName, email,encPasswd,phoneno,address],
		(err, result) => {
			if (err) return res.send(apiError(err));
			db.query("SELECT * FROM user WHERE id=?", [result.insertId], (err, results) => {
				if (err) return res.send(apiError(err));
				res.send(apiSuccess(results[0]));
			});
		}
	);
});



// // ✅ Change password
// router.patch("/changepasswd", (req, res) => {
// 	const { id, passwd } = req.body;
// 	const encPasswd = bcrypt.hashSync(passwd, 10);
// 	db.query("UPDATE users SET passwd=? WHERE id=?", [encPasswd, id], (err, result) => {
// 		if (err) return res.send(apiError(err));
// 		if (result.affectedRows !== 1) return res.send(apiError("User not found"));
// 		res.send(apiSuccess("User password updated"));
// 	});
// });

// // 🚧 Update user (placeholder)
// router.put("/:id", (req, res) => {
// 	res.send("Homework Implementation");
// });

module.exports = router;
