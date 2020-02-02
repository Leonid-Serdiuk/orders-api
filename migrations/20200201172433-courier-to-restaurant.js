'use strict';
const faker = require('faker');
var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('couriers_restaurants_map', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    courier_id: {
      type: 'int',
      unsigned: true,
      length: 10,
      notNull: true,
      foreignKey: {
        name: 'courier_courier_id_fk',
        table: 'couriers',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    restaurant_id: {
      type: 'int',
      unsigned: true,
      length: 10,
      notNull: true,
      foreignKey: {
        name: 'courier_restaurant_id_fk',
        table: 'restaurants',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
  }).then(() => {
    return db.runSql(getFakeDataInsert());
  });
};

const getFakeDataInsert = () => {
  const fakeRestaurants = [];
  for(let i = 0; i < 60; i++) {
    fakeRestaurants.push(`(${faker.random.number({min: 1, max: 50})}, ${faker.random.number({min: 1, max: 10})})`)
  }
  return `INSERT INTO couriers_restaurants_map (courier_id, restaurant_id) VALUES ${fakeRestaurants.join(',')}`;
};

exports.down = function(db) {
  return db.dropTable('couriers_restaurants_map');
};

exports._meta = {
  "version": 1
};
