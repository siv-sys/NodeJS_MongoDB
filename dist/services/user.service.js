"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../models/user.model");
class UserService {
    static ensureUserIds() {
        return __awaiter(this, void 0, void 0, function* () {
            const usersWithoutId = yield user_model_1.UserModel.find({
                userId: { $exists: false },
            })
                .select('_id')
                .sort({ createdAt: 1, _id: 1 });
            if (usersWithoutId.length === 0) {
                return;
            }
            const lastUser = yield user_model_1.UserModel.findOne({
                userId: { $exists: true },
            })
                .sort({ userId: -1 })
                .select('userId')
                .lean();
            let nextUserId = ((lastUser === null || lastUser === void 0 ? void 0 : lastUser.userId) || 0) + 1;
            for (const user of usersWithoutId) {
                yield user_model_1.UserModel.updateOne({ _id: user._id }, { $set: { userId: nextUserId } });
                nextUserId += 1;
            }
        });
    }
    static getUserQuery(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (/^\d+$/.test(id)) {
                yield this.ensureUserIds();
                return { userId: Number(id) };
            }
            if (mongoose_1.default.Types.ObjectId.isValid(id)) {
                return { _id: id };
            }
            return null;
        });
    }
    // Get all users
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureUserIds();
            return yield user_model_1.UserModel.find().lean();
        });
    }
    // Get a user by ID
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.getUserQuery(id);
            if (!query) {
                return null;
            }
            return yield user_model_1.UserModel.findOne(query).lean();
        });
    }
    // Create a new user
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureUserIds();
            const lastUser = yield user_model_1.UserModel.findOne({
                userId: { $exists: true },
            })
                .sort({ userId: -1 })
                .select('userId')
                .lean();
            const user = yield user_model_1.UserModel.create(Object.assign(Object.assign({}, userData), { userId: ((lastUser === null || lastUser === void 0 ? void 0 : lastUser.userId) || 0) + 1 }));
            return user;
        });
    }
    // Update a user
    static updateUser(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.getUserQuery(id);
            if (!query) {
                return null;
            }
            return yield user_model_1.UserModel.findOneAndUpdate(query, updateData, {
                new: true,
                runValidators: true,
            }).lean();
        });
    }
    // Delete a user
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.getUserQuery(id);
            if (!query) {
                return false;
            }
            const result = yield user_model_1.UserModel.findOneAndDelete(query);
            return !!result;
        });
    }
}
exports.UserService = UserService;
