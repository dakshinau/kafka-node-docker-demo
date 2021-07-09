import express from 'express';
import shipmentService from '../services/shipments.service';

class ShipmentsMiddleware {

    async validateShipmentExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const shipment = await shipmentService.readById(req.params.shipmentId);
        if (shipment) {
            next();
        } else {
            res.status(404).send({error: `Shipment ${req.params.shipmentId} not found`});
        }
    }

    async extractShipmentId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.shipmentId;
        next();
    }
}

export default new ShipmentsMiddleware();
