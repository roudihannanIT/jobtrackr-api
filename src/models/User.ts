import {Schema, model, Document} from "mongoose";
import bcrypt from 'bcrypt';

export enum UserRole{
    USER = 'user',
    ADMIN = 'admin',
}

export interface IUser extends Document {
    email: string;
    password: string;
    role: UserRole;
    comparePassword(candidatePassword:string):Promise<boolean>;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.USER,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(_, ret) {
                delete ret.password;
                delete ret.__v;
                return ret;
            },
        },
    }
);

userSchema.pre<IUser>('save',async function (next){
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (
    candidatePassword:string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>('User',userSchema);