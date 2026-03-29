"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_Route_1 = __importDefault(require("./routes/user.Route"));
const global_error_handler_1 = __importDefault(require("./middleware/global_error_handler"));
const mongoose_1 = require("./config/mongoose");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const wishlist_route_1 = __importDefault(require("./routes/wishlist.route"));
const purchase_route_1 = __importDefault(require("./routes/purchase.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8001;
const URI = process.env.MONGO_URI || "";
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
///mongodb conection
(0, mongoose_1.dbConnect)(URI);
app.use('/api/user', user_Route_1.default);
app.use('/api/product', product_route_1.default);
app.use('/api/', wishlist_route_1.default);
app.use('/api/purchase/', purchase_route_1.default);
console.log("request came here");
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
});
app.use(global_error_handler_1.default);
