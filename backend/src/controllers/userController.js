import { generateTokenOptions } from "../utils/generateTokenOptions.js";


export default class userController {

    constructor(service) {
        this.service = service
    }

    register = async (req, res, next) => {
        try {
            const response = await this.service.register(req.body);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    };

    login = async (req, res, next) => {
        try {
            const result = await this.service.login(req.body);
            const options = generateTokenOptions();
            res.cookie(
                "refreshToken",
                result.refreshToken,
                options.refreshTokenOptions
            );
            res.cookie("accessToken", result.accessToken, options.accessTokenOptions);
            res.status(201).json({ message: 'Login successful' });
        } catch (e) {
            next(e);
        }
    };

    logout = (req, res, next) => {
        try {
            const cookies = req.cookies
            if (!cookies?.accessToken && !cookies?.refreshToken) return res.sendStatus(204)
            res.clearCookie('accessToken', { httpOnly: true, secure: true })
            res.clearCookie('refreshToken', { httpOnly: true, secure: true })
            res.json({ message: 'Logout successful' })
        } catch (e) {
            next(e)
        }
    };

    getUser = (req, res, next) => {
        try {
            const user = req.user
            res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    }

    updateUser = async (req, res, next) => {
        try {
            const response = await this.service.updateUser(req.user._id, req.body)
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }
}
