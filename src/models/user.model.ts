import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

// Extend mongoose.Document with our IUser interface
export interface IUserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        age: {
            type: Number,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
