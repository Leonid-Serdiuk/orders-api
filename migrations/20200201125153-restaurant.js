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
  return db.createTable('restaurants', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      unsigned: true,
      length: 10,
      notNull: true
    },
    name: 'string',  // shorthand notation
    created_time: {type: 'datetime', notNull: true},
    updated_time: {type: 'timestamp', notNull: true, defaultValue: 'CURRENT_TIMESTAMP'}
  }).then(() => {
    return db.runSql(getFakeDataInsert());
  });
};

const getFakeDataInsert = () => {
  const fakeRestaurants = [];
  for(let i = 0; i < 10; i++) {
    fakeRestaurants.push(`("${faker.company.companyName()}", "${moment(faker.date.past()).format('YYYY-MM-DD HH:mm:ss')}")`)
  }
  return `INSERT INTO restaurants (name, created_time) VALUES ${fakeRestaurants.join(',')}`;
};

exports.down = function(db) {
  return db.dropTable('restaurants');
};

exports._meta = {
  "version": 1
};
