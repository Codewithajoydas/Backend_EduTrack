const express = require('express');
const router = express.Router();
const User = require('../models/user');
const crypto = require('crypto');
const transporter = require('../config/nodemailer.config');
// Forgot Password Route
router.post('/', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
   const token = crypto.randomBytes(32).toString('hex');
   user.passwordResetToken = token;
   user.passwordResetExpires = Date.now() + 3600000; 
    await user.save();
    // send mail
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      html: `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td align="center">
      
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:6px;padding:30px;">
        
        <tr>
          <td align="center" style="font-size:22px;font-weight:bold;color:#333333;padding-bottom:10px;">
            Password Reset Request
          </td>
        </tr>

        <tr>
          <td style="font-size:15px;color:#555555;padding:15px 0;">
            We received a request to reset your password. If you made this request, click the button below to create a new password.
          </td>
        </tr>

        <tr>
          <td align="center" style="padding:20px 0;">
            <a href="http://localhost:3000/reset-password?token=${token}"
               style="background:#2563eb;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:4px;font-size:15px;display:inline-block;">
               Reset Password
            </a>
          </td>
        </tr>

        <tr>
          <td style="font-size:14px;color:#777777;padding-top:10px;">
            If you did not request a password reset, you can safely ignore this email.
          </td>
        </tr>

        <tr>
          <td style="font-size:12px;color:#999999;padding-top:25px;text-align:center;">
            © 2026 Your Website. All rights reserved.
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
`,
    });
   res.json({ message: 'Password reset token sent to your email' });
})

module.exports = router