import express from 'express';
import RestaurantController from '../controllers/restaurant.controller';
import ClientController from '../controllers/client.controller';
import CourierController from '../controllers/courier.controller';
import OrderController from '../controllers/order.controller';

const routes = express.Router();

routes.resource = (name, controller, except = []) => {
  if (except.indexOf('all') === -1) {
    routes.get(`/${name}`, (req, res) => controller.all(req, res));
  }

  if (except.indexOf('one') === -1) {
    routes.get(`/${name}/:id`, (req, res) => controller.one(req, res));
  }

  if (except.indexOf('create') === -1) {
    routes.post(`/${name}`, (req, res) => controller.create(req, res));
  }

  if (except.indexOf('update') === -1) {
    routes.put(`/${name}/:id`, (req, res) => controller.update(req, res));
  }

  if (except.indexOf('delete') === -1) {
    routes.delete(`/${name}/:id`, (req, res) => controller.delete(req, res));
  }
};

routes.resource('restaurant', new RestaurantController);
routes.resource('client', new ClientController);
routes.resource('courier', new CourierController);
routes.resource('order', new OrderController, ['delete']);

export default routes;
