"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new userModel_1.default({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    try {
        const users = await userModel_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};
exports.getUsers = getUsers;
//# sourceMappingURL=userController.js.map