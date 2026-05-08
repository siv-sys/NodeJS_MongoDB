"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersService = exports.createUserService = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const createUserService = async (userData) => {
    try {
        const newUser = new userModel_1.default(userData);
        await newUser.save();
        return newUser;
    }
    catch (error) {
        throw new Error(`Error creating user: ${error}`);
    }
};
exports.createUserService = createUserService;
const getAllUsersService = async () => {
    try {
        const users = await userModel_1.default.find();
        return users;
    }
    catch (error) {
        throw new Error(`Error fetching users: ${error}`);
    }
};
exports.getAllUsersService = getAllUsersService;
//# sourceMappingURL=userService.js.map