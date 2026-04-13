import nodemailer  from "nodemailer"

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

// Send an email using async/await
const otpEmail = async (email, otp) => {
  const info = await transporter.sendMail({
    from: 'prathameshchoughule555@gmail.com',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?", // Plain-text version of the message
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Verify your email</title> 
</head>

<body style="margin:0; padding:0; background:#fafafa; font-family: Arial, sans-serif;">

  <div style="max-width:400px; margin:40px auto; background:#ffffff; border:1px solid #dbdbdb; border-radius:10px; overflow:hidden; text-align:center;">
    
    <!-- Top Gradient Bar -->
    <div style="height:6px; background:linear-gradient(90deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5);"></div>

    <div style="padding:30px;">
      
      <!-- Logo -->
      <div style="font-size:26px; font-weight:bold; margin-bottom:20px; color:#262626;">
        RateMyStore
      </div>

      <!-- Title -->
      <div style="font-size:20px; font-weight:600; margin-bottom:10px;">
        Verify Your Email
      </div>

      <!-- Text -->
      <div style="font-size:14px; color:#555; margin-bottom:25px;">
        Use the OTP below to verify your account.
      </div>

      <!-- OTP -->
      <div style="font-size:28px; letter-spacing:8px; font-weight:bold; color:#ffffff; background:#d62976; padding:12px; border-radius:6px; margin-bottom:20px;">
        ${otp}
      </div>


      <!-- Footer -->
      <div style="font-size:12px; color:#999; margin-top:20px;">
        This code expires in 5 minutes. If you didn’t request it, ignore this email.
      </div>

    </div>

  </div>

</body>
</html>`, // HTML version of the message
  });
  console.log("Message sent:", info.messageId);
};

export default otpEmail