"use strict";
/**
 * @description 处理业务运行中预知且主动抛出的异常
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.BusinessException = void 0;
var common_1 = require("@nestjs/common");
var business_error_codes_1 = require("./business.error.codes");
var BusinessException = /** @class */ (function (_super) {
    __extends(BusinessException, _super);
    function BusinessException(error) {
        if (typeof error === 'string') {
            error = {
                code: business_error_codes_1.BUSINESS_ERROR_CODE.COMMON,
                message: error
            };
        }
        return _super.call(this, error, common_1.HttpStatus.OK) || this;
    }
    BusinessException.throwForbidden = function () {
        throw new BusinessException({
            code: business_error_codes_1.BUSINESS_ERROR_CODE.ACCESS_FORBIDDEN,
            message: '抱歉哦，您无此权限！'
        });
    };
    return BusinessException;
}(common_1.HttpException));
exports.BusinessException = BusinessException;
