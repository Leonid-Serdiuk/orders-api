import BaseModel from './base.model';

class CourierModel extends BaseModel {

  constructor() {
    super('couriers');
  }

  getByRestaurant(restaurantId) {
    return new Promise((resolve, reject) => {this.db.query(`SELECT c.* FROM couriers as c 
      INNER JOIN couriers_restaurants_map as cr ON c.id = cr.courier_id 
      INNER JOIN restaurants as r ON r.id = cr.restaurant_id
      WHERE r.id = ?`, [restaurantId], (err, result, fields) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    })
  }

  assignToRestaurant(courierId, restaurantId) {
    return new Promise((resolve, reject) => {
      this.db.query(`INSERT INTO couriers_restaurants_map (courier_id, restaurant_id) VALUES (?, ?)`,
        [courierId, restaurantId], (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
    });
  }
}

export default CourierModel;
