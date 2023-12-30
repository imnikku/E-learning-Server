"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config(); // Env File Configation on top of the file 
const app_1 = require("./app");
const DbConfig_utils_1 = __importDefault(require("./utils/DbConfig.utils"));
const cloudinary_1 = require("cloudinary");
// ################ Cloudinary config #########################
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});
// ###################### Create Server #######################
app_1.app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    (0, DbConfig_utils_1.default)();
});
