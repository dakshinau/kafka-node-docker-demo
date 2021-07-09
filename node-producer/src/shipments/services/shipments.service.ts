import shipments from './shipments';

class ShipmentsService {

    async list(limit?: number, page?: number) {
        return shipments;
    };

    async readById(resourceId: string) {
        return shipments.filter(shipment => shipment.reference === resourceId)[0] || null;
    };

}

export default new ShipmentsService();