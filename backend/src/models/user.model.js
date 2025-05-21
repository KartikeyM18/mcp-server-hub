
import mongoose,{Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
  
    refreshToken: {
        type: String,
        
    },
    submittedserver:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Server'
            
        }
    ],

    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],

},{
    timestamps: true
})


userSchema.pre('save',async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
  this.password = await bcrypt.hash(this.password, 10);
  next();
}
);

userSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn:process.env.JWT_ACCESS_EXPIRATION,
    });
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn:process.env.JWT_REFRESH_EXPIRATION,
    });
}



export const User = mongoose.model('User', userSchema)

