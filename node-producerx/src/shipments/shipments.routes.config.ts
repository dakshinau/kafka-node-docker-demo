import {CommonRoutesConfig} from '../common/common.routes.config';
import ShipmentsController from './controllers/shipments.controller';
import ShipmentsMiddleware from './middleware/shipments.middleware';
import express from 'express';

export class ShipmentsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ShipmentsRoutes');
    }

    configureRoutes():  express.Application {
        this.app.route(`/shipments`)
            .get(ShipmentsController.listShipments);

        this.app.param(`shipmentId`, ShipmentsMiddleware.extractShipmentId);
        this.app.route(`/shipments/:shipmentId`)
            .all(ShipmentsMiddleware.validateShipmentExists)
            .get(ShipmentsController.getShipmentById);

        this.app.post(`/shipments/:shipmentId/updateStatus`,[
            ShipmentsController.updateStatus
        ]);

        return this.app;
    }
}