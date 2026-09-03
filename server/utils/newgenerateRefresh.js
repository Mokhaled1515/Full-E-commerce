import UserModel from "../models/user.models.js";
import jwt from "jsonwebtoken";
const newgenerateRefresh = async (userId) => {

  const token = await jwt.sign({id: userId}, process.env.SECRET_KEY_REFRESH, {
   expiresIn: '7d',
  })
  

  const updateRefreshTokenUser = await UserModel.updateOne(
    { _id: userId },
    {
      refresh_token: token,
    }
  );

  return token;
};

export default newgenerateRefresh;
