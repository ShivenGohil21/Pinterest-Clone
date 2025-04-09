import jwt from 'jsonwebtoken';

const generateToken = (id, res) => {
    const token = jwt.sign({id}, process.env.JWT_SEC,{
        expiresIn: "15d",
    });
    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //15 days 24hrs 60 mins 60 sec 1000millisec
        httpOnly: true,
        sameSite: "strict",
    });
};


export default generateToken;