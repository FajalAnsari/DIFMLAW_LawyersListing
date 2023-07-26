const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer")


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
    user: "dummy.fajal@gmail.com",
    pass: "zycnvxgvqaqumtlo"
    },
  });
  
  const sendEmail = expressAsyncHandler(async (req, res) => {
    const { email, message } = req.body;
    console.log(email, message);
  
    var mailOptions = {
      from: '"Admin 👻" <dummy.fajal@gmail.com>',
      to: "dummy.fajal@gmail.com",
      subject: "New Contact Us Inquiry from DIFM Law Portal",
      text: `Dear Admin,\n\nA new inquiry has been submitted through the Contact Us form on the DIFM Law portal.\n\nSender's Email: ${email}\nMessage: ${message}\n\nPlease review and respond to this inquiry promptly to address any concerns or provide\nnecessary assistance.\n\nThank you for your attention to this matter.\n\nBest regards,\nThe DIFM Law Team`,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully!");
      }
    });
  });

  const sendEmails = expressAsyncHandler(async (req, res) => {
    const { email, username, message } = req.body;
    console.log(email, username, message);
  
    var mailOptions = {
      from: '"user 👻" <dummy.fajal@gmail.com>',
      to: "dummy.fajal@gmail.com",
      subject: "New Contact Us Inquiry from DIFM Law Portal",
      text: `Dear Admin,\n\nA new inquiry has been submitted through the Contact Us form on the DIFM Law portal.\n\nSender's Email: ${email}\nName: ${username}\nMessage: ${message}\n\nPlease review and respond to this inquiry promptly to address any concerns or provide\nnecessary assistance.\n\nThank you for your attention to this matter.\n\nBest regards,\nThe DIFM Law Team`,
    
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully!");
      }
    });
  });


  const sendEmailSubs = expressAsyncHandler(async (req, res) => {
    const { email} = req.body;
    console.log(email);
  
    var mailOptions = {
      from: email,
      to: email,
      subject: "Thank You for Subscribing to DIFM Law Updates",
      text: `Dear Subscriber,\n\nThank you for subscribing to DIFM Law updates. We are thrilled to have you as part of our\ncommunity!\n\nAs a subscriber, you will receive the latest news, legal insights, and updates related to our\nplatform and the legal industry. We are committed to providing valuable information and\nensuring that you stay informed.\n\nShould you ever wish to unsubscribe or update your subscription preferences, you can do so\nby clicking the "unsubscribe" link in any of our emails.\n\nIf you have any questions or need assistance, please don't hesitate to contact us at\nsupport@difmlaw.com. We are always here to help.\n\nOnce again, thank you for subscribing to DIFM Law's updates. We look forward to sharing\nexciting content with you.\n\nBest regards,\nThe DIFM Law Team`,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully!");
      }
    });
  });

  const sendEmaillaw = expressAsyncHandler(async (req, res) => {
    const { name, email, number, lawyerEmail, message } = req.body;
    console.log(name, email, number, lawyerEmail, message);
  
    var mailOptions = {
      from: lawyerEmail,
      to: lawyerEmail,
      subject: "New Message Received on DIFM Law Portal",
      text: `Dear ${name},\nI hope this email finds you well.\n\nWe wanted to inform you that you have received a new message on your DIFM Law portal.\nHere are the details of the message:\n\nSender's Email: ${email}\nNumber: ${number}\nMessage: ${message}\n\nPlease log in to your DIFM Law account to view and respond to the message as soon aspossible.\n\nLogin Link : https://difmlaw.com/login\n\nThis communication is essential for connecting with potential clients and providing them with\nthe assistance they seek.\n\nIf you have any further questions or encounter any issues while using our platform, please \nfeel free to reach out to our support team at [support@difmlaw.com].\n\nThank you for being a valued member of DIFM Law. We wish you success in your\nengagements and are confident that our platform will continue to connect you with\nindividuals seeking legal services.\n\nBest regards,\nThe DIFM Law Team`,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully!");
      }
    });
  });

  module.exports = { sendEmail, sendEmails, sendEmailSubs, sendEmaillaw};