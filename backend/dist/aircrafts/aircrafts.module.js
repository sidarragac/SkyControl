"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AircraftsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const aircraft_entity_1 = require("./entities/aircraft.entity");
const aircrafts_service_1 = require("./aircrafts.service");
const aircrafts_controller_1 = require("./aircrafts.controller");
const airlines_module_1 = require("../airlines/airlines.module");
const manufacturers_module_1 = require("../manufacturers/manufacturers.module");
let AircraftsModule = class AircraftsModule {
};
exports.AircraftsModule = AircraftsModule;
exports.AircraftsModule = AircraftsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([aircraft_entity_1.Aircraft]),
            airlines_module_1.AirlinesModule,
            manufacturers_module_1.ManufacturersModule,
        ],
        controllers: [aircrafts_controller_1.AircraftsController],
        providers: [aircrafts_service_1.AircraftsService],
    })
], AircraftsModule);
//# sourceMappingURL=aircrafts.module.js.map