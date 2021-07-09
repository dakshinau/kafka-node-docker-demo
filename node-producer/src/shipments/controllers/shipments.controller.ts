import express from 'express';
import ShipmentsService from '../services/shipments.service';
import { send as sendToKafka } from '../../kafka.producer';

class ShipmentsController {

    async listShipments(req: express.Request, res: express.Response) {
        const shipments = await ShipmentsService.list(100, 0);
        res.status(200).send(shipments);
    }

    async getShipmentById(req: express.Request, res: express.Response) {
        const shipment = await ShipmentsService.readById(req.params.shipmentId);
        res.status(200).send(shipment);
    }

    async updateStatus(req: express.Request, res: express.Response) {
        sendToKafka('shipments', JSON.stringify(req.body));
        res.status(204).send(``);
    }
}

export default new ShipmentsController();