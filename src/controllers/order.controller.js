import OrderModel from '../models/order.model';
import Validator from '../helpers/validator';
import OrderStatus from '../enums/order-status';
import ClientModel from '../models/client.model';

class OrderController {

  all(req, res) {
    const Order = new OrderModel();
    Order.selectAll().then(data => {
      res.json({success: true, data: data});
    }).catch(err => {
      res.error(err);
    });
  }

  one(req, res) {
    const Order = new OrderModel();
    Order.selectOne(req.params.id).then(data => {
      if (data) {
        res.json({success: true, data: data});
      } else {
        res.sendStatus(404);
      }
    }).catch(err => {
      res.status(500).send(err.toString());
    });
  }

  async create(req, res) {
    // restaurant validation
    await Validator.restaurantValidation(req, res);
    // client validation
    await Validator.clientValidation(req, res);
    // courier validation
    await Validator.couriersValidation(req, res);
    // delivery time validation
    await Validator.deliveryTimeValidation(req, res);

    const insertData = req.body;
    if (insertData.status) {
      if (Object.values(OrderStatus).indexOf(insertData.status) === -1) {
        res.json({success: false, msg: 'Status is not valid'});
      }
    } else {
      insertData.status = OrderStatus.created;
    }

    const Order = new OrderModel();
    const Client = new ClientModel();
    // check is client assigned
    Client.isConnectedToRestaurant(insertData.client_id, insertData.restaurant_id).then(isConnected => {
      if(!isConnected) {
        // assign client
        Client.assignToRestaurant(insertData.client_id, insertData.restaurant_id).then(res => {
          Order.create(insertData).then(() => {
            res.json({success: true});
          }).catch(err => {
            console.log(err.toString());
            res.status(500).send(err.toString());
          });
        }).catch(err => {
          res.status(500).send(err.toString());
        });
      } else {
        Order.create(insertData).then(() => {
          res.json({success: true});
        }).catch(err => {
          console.log(err.toString());
          res.status(500).send(err.toString());
        });
      }
    }).catch(err => {
      res.status(500).send(err.toString());
    });
  }

  async update(req, res) {
    // delivery time validation
    const updateData = {};
    if (req.body.status) {
      if (Object.values(OrderStatus).indexOf(req.body.status) === -1) {
        res.json({success: false, msg: 'Status is not valid'});
      }
      updateData.status = req.body.status;
    }
    if (req.body.delivery_time) {
      await Validator.deliveryTimeValidation(req, res);
      updateData.delivery_time = req.body.delivery_time;
    }

    const Order = new OrderModel();
    Order.selectOne(req.params.id).then(order => {
      if (order) {
        // delivery time can't be updated on orders with status complete or canceled
        if(updateData.delivery_time && (order.status === OrderStatus.completed || order.status === OrderStatus.canceled)) {
          res.json({success: false, msg: 'Delivery time can\'t be updated on this order'});
        }
        Order.update(updateData, req.params.id).then(() => {
          res.json({success: true});
        }).catch(err => {
          res.status(500).send(err.toString());
        });
      } else {
        res.json({success: false, msg: 'Order not found'});
      }
    }).catch(err => {
      res.status(500).send(err.toString());
    });
  }
}

export default OrderController;
