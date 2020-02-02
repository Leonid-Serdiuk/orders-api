'use strict';
const faker = require('faker');
const moment = require('moment');
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
  return db.createTable('couriers', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      unsigned: true,
      length: 10,
      notNull: true
    },
    name: 'string',  // shorthand notation
    is_available: { type: 'tinyint', length: 1 },
    created_time: {type: 'datetime', notNull: true},
    updated_time: {type: 'timestamp', notNull: true, defaultValue: 'CURRENT_TIMESTAMP'}
  }).then(() => {
    return db.runSql(getFakeDataInsert());
  });
};

const getFakeDataInsert = () => {
  const fakeRestaurants = [];
  for(let i = 0; i < 50; i++) {
    fakeRestaurants.push(`("${faker.name.firstName()} ${faker.name.lastName()}", ${faker.random.number(1)}, "${moment(faker.date.past()).format('YYYY-MM-DD HH:mm:ss')}")`)
  }
  return `INSERT INTO couriers (name, is_available, created_time) VALUES ${fakeRestaurants.join(',')}`;
};

exports.down = function(db) {
  return db.dropTable('couriers');
};

exports._meta = {
  "version": 1
};
