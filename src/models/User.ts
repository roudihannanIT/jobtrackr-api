import {Schema, model, Document} from "mongoose";
import bcrypt from 'bcrypt';
import { Query } from "mongoose";

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
    isDeleted: boolean;
    deletedAt?: Date;
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
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform(_doc, ret: any) {
                delete ret.password;
                delete ret.__v;
                return ret;
            },
        },
    }
);

userSchema.pre<Query<any,IUser>>(/^find/, function (next) {
    this.where({isDeleted:false});
});

// hash password before save
userSchema.pre<IUser>('save',async function (){
    if(!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// compare password
userSchema.methods.comparePassword = async function (
    candidatePassword:string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>('User',userSchema);

