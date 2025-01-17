import mongoose, {Schema, Document} from 'mongoose';
  

export interface Message extends Document{
    content:string;
    createdAt:Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean; 
    messages: Message[]
}


const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username must be provided"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email must be provided"],
        unique: true,
        match:[/.+\@.+\..+/,"Please enter a valid email address"]
    },
    password:{
        type: String,
        required: [true, "Password must be provided "],
    },
    verifyCode:{
        type: String,
        required: [true, "Verify code must be provided"],
    },
     verifyCodeExpiry:{
        type: Date,
        required: [true, "Verify code Expiry must be provided"],
    },
     isVerified:{
        type: Boolean,
        default: false,
    },
     isAcceptingMessages:{
        type: Boolean,
        default: true,
     }, 
     messages:[MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)

export default UserModel;