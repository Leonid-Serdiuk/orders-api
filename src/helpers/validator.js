import RestaurantModel from '../models/restaurant.model';
import ClientModel from '../models/client.model';
import CourierModel from '../models/courier.model';
import moment from 'moment';

class Validator {
  static async restaurantValidation(req, res) {
    if (!req.body.restaurant_id) {
      res.json({success: false, msg: 'restaurant_id is required'});
    }
    const restaurant_id = Number(req.body.restaurant_id);
    if (isNaN(restaurant_id) || restaurant_id === 0) {
      res.json({success: false, msg: 'restaurant_id is invalid'});
    }
    const Restaurant = new RestaurantModel();
    Restaurant.selectOne(restaurant_id).then(data => {
      if (!data) {
        res.json({success: false, msg: 'Restaurant is not found'});
      }
    });
  }

  static async clientValidation(req, res) {
    if (!req.body.client_id) {
      res.json({success: false, msg: 'client_id is required'});
    }
    const client_id = Number(req.body.client_id);
    if (isNaN(client_id) || client_id === 0) {
      res.json({success: false, msg: 'client_id is invalid'});
    }
    const Client = new ClientModel();
    Client.selectOne(client_id).then(data => {
      if (!data) {
        res.json({success: false, msg: 'Client is not found'});
      }
    });
  }

  static async couriersValidation(req, res) {
    const Courier = new CourierModel();
    await Courier.getByRestaurant(req.body.restaurant_id).then(couriers => {
      // can't create order if restaurant has no couriers
      if (couriers.length === 0) {
        res.json({success: false, msg: 'Restaurant has no couriers'});
      }
      if (req.body.courier_id) {
        const courier_id = Number(req.body.courier_id);
        // courier id should be valid number
        if (isNaN(courier_id) || courier_id === 0) {
          res.json({success: false, msg: 'Courier id is invalid'});
        }
        const courier = couriers.find(c => c.id === courier_id);
        if (!courier) {
          res.json({success: false, msg: 'Courier doesn\'n work with passed restaurant'});
        }
        if (courier.is_available === 0) {
          res.json({success: false, msg: 'Courier is unavailable'});
        }
      }
    });
  }

  static async deliveryTimeValidation(req, res) {
    if (!req.body.delivery_time) {
      res.json({success: false, msg: 'delivery_time is required'});
    }
    const deliveryTime = moment(req.body.delivery_time, 'YYYY-MM-DD HH:mm:ss');
    if (deliveryTime.isBefore()) {
      res.json({success: false, msg: 'delivery_time can\'t be in past'});
    }
    const inAnHour = moment().add(1, 'hour');
    if (inAnHour.diff(deliveryTime, 'minutes') >= 0) {
      res.json({success: false, msg: 'delivery_time can\'t be less then an hour later'});
    }
  }
}

export default Validator;
