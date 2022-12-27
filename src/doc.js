"use strict";
exports.__esModule = true;
exports.generateDocument = void 0;
var swagger_1 = require("@nestjs/swagger");
var packageConfig = require("../package.json");
var generateDocument = function (app) {
    var options = new swagger_1.DocumentBuilder()
        .setTitle(packageConfig.name)
        .setDescription(packageConfig.description)
        .setVersion(packageConfig.version)
        .build();
    var document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/api/doc', app, document);
};
exports.generateDocument = generateDocument;
