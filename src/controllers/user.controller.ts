import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { UserService } from '../services/user.service';

// @desc    Get all users
// @route   GET /api/users
// @access  Public
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
});

// @desc    Get a single user
// @route   GET /api/users/:id
// @access  Public
export const getUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserService.getUserById(req.params.id as string);
    
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    
    res.status(200).json(user);
});

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, age } = req.body;

    if (!name || !email) {
        res.status(400);
        throw new Error('Please add name and email');
    }

    const user = await UserService.createUser({ name, email, age });
    res.status(201).json(user);
});

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Public
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const updatedUser = await UserService.updateUser(req.params.id as string, req.body);
    
    if (!updatedUser) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json(updatedUser);
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Public
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const isDeleted = await UserService.deleteUser(req.params.id as string);
    
    if (!isDeleted) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json({ message: 'User removed' });
});
