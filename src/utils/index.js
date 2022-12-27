"use strict";
exports.__esModule = true;
exports.getConfig = exports.getEnv = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
var yaml_1 = require("yaml");
var path = require('path');
var fs = require('fs');
// 获取项目运行环境
var getEnv = function () {
    return process.env.RUNNING_ENV;
};
exports.getEnv = getEnv;
// 读取项目配置
var getConfig = function () {
    var enviroment = (0, exports.getEnv)();
    var yamlPath = path.join(process.cwd(), "./.config/.".concat(enviroment ? enviroment : 'dev', ".yaml"));
    var file = fs.readFileSync(yamlPath, 'utf8');
    var config = (0, yaml_1.parse)(file);
    return config;
};
exports.getConfig = getConfig;
