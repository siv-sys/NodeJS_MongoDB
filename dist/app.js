"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const userRouter_1 = __importDefault(require("./routes/userRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Connect to Database
(0, db_1.connectDB)();
// Routes
app.use("/api/users", userRouter_1.default);
app.listen(3000, () => {
    console.log("http://localhost:3000");
});
//# sourceMappingURL=app.js.map