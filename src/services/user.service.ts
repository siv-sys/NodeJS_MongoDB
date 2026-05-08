import { UserModel } from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

export class UserService {
    // Get all users
    static async getAllUsers(): Promise<IUser[]> {
        return await UserModel.find().lean();
    }

    // Get a user by ID
    static async getUserById(id: string): Promise<IUser | null> {
        return await UserModel.findById(id).lean();
    }

    // Create a new user
    static async createUser(userData: IUser): Promise<IUser> {
        const user = await UserModel.create(userData);
        return user;
    }

    // Update a user
    static async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
        return await UserModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        }).lean();
    }

    // Delete a user
    static async deleteUser(id: string): Promise<boolean> {
        const result = await UserModel.findByIdAndDelete(id);
        return !!result;
    }
}
