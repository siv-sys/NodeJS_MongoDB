import mongoose from 'mongoose';
import { UserModel } from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

export class UserService {
    private static async ensureUserIds(): Promise<void> {
        const usersWithoutId = await UserModel.find({
            userId: { $exists: false },
        })
            .select('_id')
            .sort({ createdAt: 1, _id: 1 });

        if (usersWithoutId.length === 0) {
            return;
        }

        const lastUser = await UserModel.findOne({
            userId: { $exists: true },
        })
            .sort({ userId: -1 })
            .select('userId')
            .lean();

        let nextUserId = (lastUser?.userId || 0) + 1;

        for (const user of usersWithoutId) {
            await UserModel.updateOne(
                { _id: user._id },
                { $set: { userId: nextUserId } }
            );
            nextUserId += 1;
        }
    }

    private static async getUserQuery(id: string) {
        if (/^\d+$/.test(id)) {
            await this.ensureUserIds();
            return { userId: Number(id) };
        }

        if (mongoose.Types.ObjectId.isValid(id)) {
            return { _id: id };
        }

        return null;
    }

    // Get all users
    static async getAllUsers(): Promise<IUser[]> {
        await this.ensureUserIds();
        return await UserModel.find().lean();
    }

    // Get a user by ID
    static async getUserById(id: string): Promise<IUser | null> {
        const query = await this.getUserQuery(id);

        if (!query) {
            return null;
        }

        return await UserModel.findOne(query).lean();
    }

    // Create a new user
    static async createUser(userData: IUser): Promise<IUser> {
        await this.ensureUserIds();

        const lastUser = await UserModel.findOne({
            userId: { $exists: true },
        })
            .sort({ userId: -1 })
            .select('userId')
            .lean();

        const user = await UserModel.create({
            ...userData,
            userId: (lastUser?.userId || 0) + 1,
        });

        return user;
    }

    // Update a user
    static async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
        const query = await this.getUserQuery(id);

        if (!query) {
            return null;
        }

        return await UserModel.findOneAndUpdate(query, updateData, {
            new: true,
            runValidators: true,
        }).lean();
    }

    // Delete a user
    static async deleteUser(id: string): Promise<boolean> {
        const query = await this.getUserQuery(id);

        if (!query) {
            return false;
        }

        const result = await UserModel.findOneAndDelete(query);
        return !!result;
    }
}
