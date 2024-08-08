import 'dotenv/config'


export const generateTokenOptions = () => {

    const accessExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10)
    const refreshExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10)

    const accessTokenOptions = {
        expires: new Date(Date.now() + accessExpire * 24 * 60 * 60 * 1000),
        maxAge: accessExpire * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
    } 
    const refreshTokenOptions = {
        expires: new Date(Date.now() + refreshExpire * 24 * 60 * 60 * 1000),
        maxAge: refreshExpire * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
    } 

    // only set true in production
    if (process.env.NODE_ENV === 'production'){
        accessTokenOptions.secure = true;
    }

    return {accessTokenOptions, refreshTokenOptions}
    
}