"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_Controller_1 = require("../controllers/user.Controller");
const userRoute = (0, express_1.Router)();
userRoute.post('/signup', user_Controller_1.signup);
userRoute.post('/login', user_Controller_1.login);
exports.default = userRoute;
