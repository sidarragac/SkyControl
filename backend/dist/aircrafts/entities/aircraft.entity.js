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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aircraft = void 0;
const typeorm_1 = require("typeorm");
const airline_entity_1 = require("../../airlines/entities/airline.entity");
const manufacturer_entity_1 = require("../../manufacturers/entities/manufacturer.entity");
let Aircraft = class Aircraft {
    id;
    registry;
    model;
    passengerCapacity;
    status;
    firstFlightDate;
    imageURL;
    createdAt;
    updatedAt;
    airline;
    manufacturer;
};
exports.Aircraft = Aircraft;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Aircraft.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15, unique: true }),
    __metadata("design:type", String)
], Aircraft.prototype, "registry", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Aircraft.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Aircraft.prototype, "passengerCapacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Aircraft.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Aircraft.prototype, "firstFlightDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Aircraft.prototype, "imageURL", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Aircraft.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Aircraft.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => airline_entity_1.Airline, (airline) => airline.aircrafts, { eager: true }),
    (0, typeorm_1.JoinColumn)({
        referencedColumnName: 'id',
    }),
    __metadata("design:type", airline_entity_1.Airline)
], Aircraft.prototype, "airline", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => manufacturer_entity_1.Manufacturer, (manufacturer) => manufacturer.aircrafts, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({
        referencedColumnName: 'id',
    }),
    __metadata("design:type", manufacturer_entity_1.Manufacturer)
], Aircraft.prototype, "manufacturer", void 0);
exports.Aircraft = Aircraft = __decorate([
    (0, typeorm_1.Entity)()
], Aircraft);
//# sourceMappingURL=aircraft.entity.js.map