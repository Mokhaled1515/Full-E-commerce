import sendEmail from "../config/sendEmail.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import verifyEmailTamplatee from "../utils/verifyEmailTemplate.js"
import newgenerateAccess from "../utils/newgenenrateAccess.js";
import newgenerateRefresh from "../utils/newgenerateRefresh.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generatedOtp from "../utils/generetedOtp.js";
import forgotPasswordAndTemplate from "../utils/forgotPasswordAndTamplate.js";



export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "provide email, name, password",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({
        message: "Already Register email",
        error: true,
        success: false,
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from Marmar",
      html: verifyEmailTamplatee({
        name,
        url: VerifyEmailUrl,
      }),
    });

    return res.json({
      message: "User register successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyEmailContrroller(req, res) {
  try {
    const { code } = req.body;
    const user = await UserModel.findOne({ _id: code });
    if (!user) {
      return res.status(400).json({
        message: "Invalid code",
        error: true,
        success: false,
      });
    }
    const updateUser = await UserModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );
    return res.json({
      message: "Verify Email Done",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status().json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
}

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "provide email, password",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not register",
        error: true,
        success: false,
      });
    }
    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact to Admin",
        error: true,
        success: false,
      });
    }
    const cheakPassword = await bcryptjs.compare(password, user.password);
    if (!cheakPassword) {
      return res.status(400).json({
        message: "cheak your password",
        error: true,
        success: false,
      });
    }

    const accesstoken = await newgenerateAccess(user._id)
    const refreshToken = await newgenerateRefresh(user._id)

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date : new Date()
    })
    
    const cookieOptionn = {
      httpOnly: true,
      secure: true,
      sameSite: "None"
      
    };
    res.cookie('accesstoken',accesstoken,cookieOptionn)
    res.cookie('refreshTooken',refreshToken,cookieOptionn)
  
    // refreshTooken

    // refreshTooken asasy


    return res.json({
      message: "Login Succeffully",
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function logOutControllers(req, res) {
  // try {
  //   const userid = req.userId;
  //   const cookieOptionn = {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: "None",
  //   };
  //   res.clearCookie("accesstoken", cookieOptionn);
  //   res.clearCookie("refreshTooken", cookieOptionn);

  //   const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
  //     refresh_token: "",
  //   });

  //   res.json({
  //     message: "Logout Successfully",
  //     error: false,
  //     success: true,
  //   });
   
  //   return res.status(200).json({
  //     message: "Logout Successfuly",
      
  //   })
  // } catch (error) {
  //   return res.status(500).json({
      
  //     message: error.message || error,
  //     error: true,
  //     success: false,
  //   });
  // }
  try {
    const userid = req.userId
    const cookiesOptionn = {
      httpOnly : true,
      secure : true,
      sameSite : "None"
    }
    // res.clearCookie("accesstoken", { httpOnly: true, secure: true });
    // res.clearCookie("refreshTooken", { httpOnly: true, secure: true });
 res.clearCookie("accesstoken",cookiesOptionn);
 res.clearCookie("refreshTooken",cookiesOptionn)
    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid,{
      refresh_token : ""
  })


    return res.status(200).json({
        message: "Logout successfully",
        success: true,
        error: false
    });
} catch (error) {
    return res.status(500).json({
        message: error.message || "Something went wrong",
        success: false,
    });
    }

}

export async function uploadAvatar(req, res) {
  try {
    const userId = req.userId;
    console.log(userId)
    const image = req.file;
    const upload = await uploadImageCloudinary(image);

    
    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.url
    });

    return res.json({
      message: "upload profile",
      success: true,
      error: false,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
  
  

}

export async function updateUsersDetails(req, res) {
  try {
    const userId = req.userId;
    const { name, email, mobile, password } = req.body;

    let hashPassword = "";

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }
    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
      }
    );
    return res.json({
      message: "Updated successfully",
      error: false,
      success: true,
      data: {
        updateUser,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email Not Available",
        error: true,
        success: false,
      });
    }
    const otp = generatedOtp();
    const expiretime = new Date() + 60 * 60 * 1000;

    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_opt: otp,
      forgot_password_expiry: new Date(expiretime).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "Forgot password from Marmar",
      html: forgotPasswordAndTemplate({
        name: user.name,
        otp: otp,
      }),
    });
    return res.json({
      message: "cheak your email",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyForgotPasswordOtp(req, res) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        message: "provide reuired field email, otp.",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }
    const currentTime = new Date().toISOString();

    if (user.forgot_password_expiry < currentTime) {
      return res.status(400).json({
        message: "Otp is expired",
        error: true,
        success: false,
      });
    }
    if (otp !== user.forgot_password_opt[0]) {
      return res.status(400).json({
        message: "Invalid otp",
        error: true,
        success: false,
      });
    }
   const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
    forgot_password_opt : "",
    forgot_password_expiry : ""
   } ) 
    return res.json({
      message: "Verify otp successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function resetPassword(req, res) {
  try {
    const { email, newpassword, confirmpassword } = req.body;
    if (!email || !newpassword || !confirmpassword) {
      return res.status(400).json({
        message: "provide required fields email, newPassword, confirmPassword",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email is not available",
        error: true,
        success: false,
      });
    }
    if (newpassword !== confirmpassword) {
      return res.status(400).json({
        message: "newPassword and confirmPassword must be same.",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newpassword, salt);

    const update = await UserModel.findOneAndUpdate(user._id, {
      password: hashPassword,
    });
    return res.json({
      message: "Password update successfully.",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function refreshTokenn(req, res) {
  try {
    const refreshTooken =
      req.cookies.refreshTooken || req?.headers?.authorization?.split(" ")[1];
    if (!refreshTooken) {
      return res.status(400).json({
        message: "Invalid token",
        error: true,
        success: false,
      });
    }
    const verifyToken = await jwt.verify(
      refreshTooken,
      process.env.SECRET_KEY_REFRESH
    );

    if (!verifyToken) {
      return res.status(400).json({
        message: "token is expired",
        error: true,
        success: false,
      });
    }
    const userId = verifyToken?._id;
    const newAccessToken = await newgenerateAccess(userId);
    const cookieOptionn = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accesstoken", newAccessToken, cookieOptionn);
    return res.json({
      message: "New Access token generated",
      error: false,
      success: true,
      data: {
        accesstoken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function userDetails(req, res) {
  try {
    const userId = req.userId;
    console.log(userId);
    const user = await UserModel.findById(userId).select('-password -refresh_token');
    return res.json({
      message: "user details",
      data: user,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something is wrong",
      error: true,
      success: false,
    });
  }
}


