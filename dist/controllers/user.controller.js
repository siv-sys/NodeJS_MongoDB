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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_service_1 = require("../services/user.service");
// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.UserService.getAllUsers();
    res.status(200).json(users);
}));
// @desc    Get a single user
// @route   GET /api/users/:id
// @access  Public
exports.getUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserService.getUserById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    res.status(200).json(user);
}));
// @desc    Create a new user
// @route   POST /api/users
// @access  Public
exports.createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, age } = req.body;
    if (!name || !email) {
        res.status(400);
        throw new Error('Please add name and email');
    }
    const user = yield user_service_1.UserService.createUser({ name, email, age });
    res.status(201).json(user);
}));
// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Public
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_service_1.UserService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
        res.status(404);
        throw new Error('User not found');
    }
    res.status(200).json(updatedUser);
}));
// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Public
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield user_service_1.UserService.deleteUser(req.params.id);
    if (!isDeleted) {
        res.status(404);
        throw new Error('User not found');
    }
    res.status(200).json({ message: 'User removed' });
}));
