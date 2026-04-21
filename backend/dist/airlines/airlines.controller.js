"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirlinesController = void 0;
const common_1 = require("@nestjs/common");
const airlines_service_1 = require("./airlines.service");
const create_airline_dto_1 = require("./dto/create-airline.dto");
const update_airline_dto_1 = require("./dto/update-airline.dto");
let AirlinesController = class AirlinesController {
    airlinesService;
    constructor(airlinesService) {
        this.airlinesService = airlinesService;
    }
    async findAll() {
        return await this.airlinesService.findAll();
    }
    async findById(id) {
        return await this.airlinesService.findById(id);
    }
    async create(createAirlineDto) {
        return await this.airlinesService.create(createAirlineDto);
    }
    async update(id, updateAirlineDto) {
        return await this.airlinesService.update(id, updateAirlineDto);
    }
    async remove(id) {
        return await this.airlinesService.remove(id);
    }
};
exports.AirlinesController = AirlinesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AirlinesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AirlinesController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_airline_dto_1.CreateAirlineDto]),
    __metadata("design:returntype", Promise)
], AirlinesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_airline_dto_1.UpdateAirlineDto]),
    __metadata("design:returntype", Promise)
], AirlinesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AirlinesController.prototype, "remove", null);
exports.AirlinesController = AirlinesController = __decorate([
    (0, common_1.Controller)('airlines'),
    __metadata("design:paramtypes", [airlines_service_1.AirlinesService])
], AirlinesController);
//# sourceMappingURL=airlines.controller.js.map