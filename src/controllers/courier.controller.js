import CourierModel from '../models/courier.model';
import Validator from '../helpers/validator';

class CourierController {

  all(req, res) {
    const Courier = new CourierModel();
    Courier.selectAll().then(data => {
      res.json({success: true, data: data});
    }).catch(err => {
      res.error(err);
    });
  }

  one(req, res) {
    const Courier = new CourierModel();
    Courier.selectOne(req.params.id).then(data => {
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
    // check for restaurant
    await Validator.restaurantValidation(req, res);
    const Courier = new CourierModel();
    if(!req.body.name) {
      res.json({success: false, msg: 'name is required'});
    }
    const insertData = {name: req.body.name, is_available: 1};
    Courier.create(insertData).then((courierId) => {
      Courier.assignToRestaurant(courierId, req.body.restaurant_id).then(() => {
        res.json({success: true});
      }).catch(err => {
        res.status(500).send(err.toString());
      });
    }).catch(err => {
      res.status(500).send(err.toString());
    });
  }

  update(req, res) {
    const Courier = new CourierModel();
    if(!req.body.name) {
      res.json({success: false, msg: 'name is required'});
    }
    const updateData = {name: req.body.name};
    Courier.update(updateData, req.params.id).then(() => {
      res.json({success: true});
    }).catch(err => {
      res.status(500).send(err.toString());
    });
  }

  delete(req, res) {
    const Courier = new CourierModel();
    Courier.delete(req.params.id).then(() => {
      res.json({success: true});
    }).catch(err => {
      res.status(500).send(err.toString());
    });
  }
}

export default CourierController;
