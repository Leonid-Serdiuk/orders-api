import RestaurantModel from '../models/restaurant.model';

class RestaurantController {

  all(req, res) {
    const Restaurant = new RestaurantModel();
    Restaurant.selectAll().then(data => {
      res.json({success: true, data: data});
    }).catch(err => {
      res.error(err);
    });
  }

  one(req, res) {
    const Restaurant = new RestaurantModel();
    Restaurant.selectOne(req.params.id).then(data => {
    if (data) {
      res.json({success: true, data: data});
    } else {
      res.sendStatus(404);
    }
    }).catch(err => {
      res.status(500).send(err.toString());
    });
  }

  create(req, res) {
    const Restaurant = new RestaurantModel();
    Restaurant.create(req.body).then(() => {
      res.json({success: true});
    }).catch(err => {
      res.status(500).send(err.toString());
    });
  }

  update(req, res) {
    const Restaurant = new RestaurantModel();
    Restaurant.update(req.body, req.params.id).then(() => {
      res.json({success: true});
    }).catch(err => {
      res.status(500).send(err.toString());
    });
  }

  delete(req, res) {
    const Restaurant = new RestaurantModel();
    Restaurant.delete(req.params.id).then(() => {
      res.json({success: true});
    }).catch(err => {
      res.status(500).send(err.toString());
    });
  }
}

export default RestaurantController;
