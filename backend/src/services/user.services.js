import { CustomError, BadRequestError, RequestValidationError } from "@nabeelktr/error-handler";

export class UserService {

    constructor(repository) {
        this.repository = repository;
    }

    async register(userData) {
        try {
            const existingUser = await this.repository.findOne({ email: userData.email });
            if (existingUser) {
                throw new Error('Email already exists');
            }
            return this.repository.create(userData);
        } catch (e) {
            throw new CustomError(e);
        }
    }

    async login(userData) {
        try {
            let user = await this.repository.findOne({ email: userData.email })
            if (!user) {
                throw new Error('Invalid credentials')
            }
            const isPassword = await user.comparePassword(userData.password);
            if (!isPassword) {
                throw new RequestValidationError();
            }
            const accessToken = user.SignAccessToken();
            const refreshToken = user.SignRefreshToken();
            return { accessToken, refreshToken };
        } catch(e){
            throw new CustomError(e);
        }
    }

    async updateUser(id, updateData){
        try{
            return this.repository.findByIdAndUpdate(id, updateData)
        }catch(e){
            throw new CustomError(e);
        }
    }
}
