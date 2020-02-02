import ClientModel from '../models/client.model';

class ClientController {

  all(req, res) {
    const Client = new ClientModel();
    Client.selectAll().then(data => {
      res.json({success: true, data: data});
    }).catch(err => {
      res.error(err);
    });
  }

  one(req, res) {
    const Client = new ClientModel();
    Client.selectOne(req.params.id).then(data => {
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
    const Client = new ClientModel();
    if(!req.body.name) {
      res.json({success: false, msg: 'name is required'});
    }
    const insertData = {name: req.body.name};
    Client.create(insertData).then((clientId) => {
      if (req.body.restaurant_id) {
        Client.assignToRestaurant(clientId, req.body.restaurant_id).then(res => {
          res.json({success: true});
        }).catch(err => {
          res.status(500).send(err.toString());
        });
      } else {
        res.json({success: true});
      }
    }).catch(err => {
      res.status(500).send(err.toString());
    });
  }

  update(req, res) {
    const Client = new ClientModel();
    if(!req.body.name) {
      res.json({success: false, msg: 'name is required'});
    }
    const updateData = {name: req.body.name};
    Client.update(updateData, req.params.id).then(() => {
      res.json({success: true});
    }).catch(err => {
      res.status(500).send(err.toString());
    });
  }

  delete(req, res) {
    const Client = new ClientModel();
    Client.delete(req.params.id).then(() => {
      res.json({success: true});
    }).catch(err => {
      res.status(500).send(err.toString());
    });
  }
}

export default ClientController;
