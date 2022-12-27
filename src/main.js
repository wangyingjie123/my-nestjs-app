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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var core_1 = require("@nestjs/core");
var common_1 = require("@nestjs/common");
var platform_fastify_1 = require("@nestjs/platform-fastify");
var transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
var base_exception_filter_1 = require("./common/exceptions/base.exception.filter");
var http_exception_filter_1 = require("./common/exceptions/http.exception.filter");
var app_module_1 = require("./app.module");
var doc_1 = require("./doc");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var app;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter())];
                case 1:
                    app = _a.sent();
                    // 统一响应格式
                    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
                    // 异常捕获器
                    app.useGlobalFilters(new base_exception_filter_1.AllExceptionsFilter(), new http_exception_filter_1.HttpExceptionFilter());
                    // 接口版本化管理
                    app.enableVersioning({
                        defaultVersion: [common_1.VERSION_NEUTRAL, '1', '2'],
                        type: common_1.VersioningType.URI
                    });
                    // 创建文档
                    (0, doc_1.generateDocument)(app);
                    // 热更新
                    if (module.hot) {
                        module.hot.accept();
                        module.hot.dispose(function () { return app.close(); });
                    }
                    return [4 /*yield*/, app.listen(3000)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap();
