const express = require("express");
const router = express.Router();
// const { sendEmails } = require("../controllers/contactController");
const { sendEmail, sendEmails, sendEmailSubs, sendEmaillaw } = require("../controllers/emailControllers");
// const { sendEmailSubs } = require("../controllers/subscribeController");
// const { sendEmaillaw } = require("../controllers/lawyercontect");

router.post("/sendEmail", sendEmail);
router.post("/sendEmails", sendEmails);
router.post("/sendEmailSubs", sendEmailSubs);
router.post("/sendEmaillaw", sendEmaillaw);


module.exports = router;