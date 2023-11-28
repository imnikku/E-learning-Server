import { Model, Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import { IUser } from "../interface/User";
import { emailRegexPattern, passwordRegexPattern } from "../utils/regex";


const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        minlength: [3, "Name must be at least 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value: string) {
                return emailRegexPattern.test(value)
            },
            message: 'Please enter a valid email.'
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        validate: {
            validator: function (value: string) {
                return passwordRegexPattern.test(value)
            },
            message: 'Password must be at least eight characters,one uppercase letter, one lowercase letter, one number and one special character.'
        },
        select: false,
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    courses: [{
        courseId: String
    }]


}, { timestamps: true })







// Hash password before saving ..............
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()

})


// Compare Password ............................

userSchema.methods.comparePassword = async function (enterPassword: string): Promise<boolean> {
    return await bcrypt.compare(enterPassword, this.passwrod)
}


export const UserModel: Model<IUser> = model('User', userSchema)




