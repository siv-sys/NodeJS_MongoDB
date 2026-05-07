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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
class UserService {
    // Get all users
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.find().lean();
        });
    }
    // Get a user by ID
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.findById(id).lean();
        });
    }
    // Create a new user
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.create(userData);
            return user;
        });
    }
    // Update a user
    static updateUser(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.findByIdAndUpdate(id, updateData, {
                new: true,
                runValidators: true,
            }).lean();
        });
    }
    // Delete a user
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.UserModel.findByIdAndDelete(id);
            return !!result;
        });
    }
}
exports.UserService = UserService;
