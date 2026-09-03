const forgotPasswordAndTemplate = ({ name, otp }) => {
  return `
  <div>
  <p>Dear, ${name}</p>
<p>your requested a password reset. please use following OTP code to reset your password.</p>
    <div style="background: #34c3eb; font-size: 20px">
    ${otp}
    </div>
   <p>This otp is valid for 1hour only. Enter this otp in the dark website to proceed with resetting your password.</p>
   </br>
   </br>
   <p>Thanks</p>
   <p>Marmar</p>
   </div>
   `;
};

export default forgotPasswordAndTemplate;
