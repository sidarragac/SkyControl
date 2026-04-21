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
exports.AircraftsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const aircraft_entity_1 = require("./entities/aircraft.entity");
const airlines_service_1 = require("../airlines/airlines.service");
const manufacturers_service_1 = require("../manufacturers/manufacturers.service");
let AircraftsService = class AircraftsService {
    aircraftRepository;
    manufacturersService;
    airlinesService;
    constructor(aircraftRepository, manufacturersService, airlinesService) {
        this.aircraftRepository = aircraftRepository;
        this.manufacturersService = manufacturersService;
        this.airlinesService = airlinesService;
    }
    async create(createAircraftDto) {
        const { manufacturerId, airlineId, ...aircraftData } = createAircraftDto;
        const existingAircraft = await this.findOneByRegistry(aircraftData.registry);
        if (existingAircraft) {
            throw new common_1.ConflictException(`Aircraft ${aircraftData.registry} already exists`);
        }
        const manufacturer = await this.manufacturersService.findById(manufacturerId);
        const airline = await this.airlinesService.findById(airlineId);
        const aircraft = this.aircraftRepository.create({
            ...aircraftData,
            airline,
            manufacturer,
        });
        return await this.aircraftRepository.save(aircraft);
    }
    async findAll() {
        return await this.aircraftRepository.find();
    }
    async findOne(id) {
        return await this.aircraftRepository.findOneBy({ id });
    }
    async update(id, updateAircraftDto) {
        const { manufacturerId, airlineId, ...aircraftData } = updateAircraftDto;
        const aircraft = await this.aircraftRepository.preload({
            id,
            ...aircraftData,
        });
        if (!aircraft) {
            throw new common_1.NotFoundException(`Aircraft with id ${id} not found`);
        }
        if (airlineId) {
            const airline = await this.airlinesService.findById(airlineId);
            aircraft.airline = airline;
        }
        if (manufacturerId) {
            const manufacturer = await this.manufacturersService.findById(manufacturerId);
            aircraft.manufacturer = manufacturer;
        }
        return await this.aircraftRepository.save(aircraft);
    }
    async remove(id) {
        return await this.aircraftRepository.delete(id);
    }
    async findOneByRegistry(registry) {
        return await this.aircraftRepository.findOneBy({ registry });
    }
};
exports.AircraftsService = AircraftsService;
exports.AircraftsService = AircraftsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(aircraft_entity_1.Aircraft)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        manufacturers_service_1.ManufacturersService,
        airlines_service_1.AirlinesService])
], AircraftsService);
//# sourceMappingURL=aircrafts.service.js.map