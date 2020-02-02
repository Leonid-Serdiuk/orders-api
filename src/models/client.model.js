import BaseModel from './base.model';

class ClientModel extends BaseModel {

  constructor() {
    super('clients');
  }

  isConnectedToRestaurant(clientId, restaurantId) {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT count(*) FROM clients_restaurants_map WHERE client_id = ? AND restaurant_id = ?`,
        [clientId, restaurantId], (err, result, fields) => {
        if (err) {
          reject(err);
        }
        resolve(result[0]);
      });
    });
  }

  assignToRestaurant(clientId, restaurantId) {
    return new Promise((resolve, reject) => {
      this.db.query(`INSERT INTO clients_restaurants_map (client_id, restaurant_id) VALUES (?, ?)`,
        [clientId, restaurantId], (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
    });
  }
}

export default ClientModel;
