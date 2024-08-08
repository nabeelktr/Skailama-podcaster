import jwt from 'jsonwebtoken'
import User from '../model/schemas/user/user.schema.js';


const protect = async (req, res, next) => {
  let token;
  try {
    token = req.cookies.accessToken;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = await User.findById(decoded.id).select('-password')
    if (req.user === undefined) {
      res.status(401).json({ msg: 'No user found..' })
    } else {
      next();
    }
  } catch(error) {
    console.log(error);
    res.status(401).json({ msg: 'Not authorized..' })
  }
};


export { protect };