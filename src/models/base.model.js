import mysql from 'mysql';
import db from '../utils/db';

class BaseModel {

  constructor(tableName) {

    this.tableName = tableName;

    this.db = db;
  }

  selectAll() {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT * FROM ${this.tableName}`, (err, result, fields) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    })
  }

  selectOne(id) {
    return new Promise((resolve, reject) => {
      if (!Number(id)) {
        reject(new Error('Id is not valid'));
      }
      this.db.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id],(err, result, fields) => {
        if (err) {
          reject(err);
        }
        resolve(result[0]);
      });
    })
  }

  create(insertData) {
    return new Promise((resolve, reject) => {
      if (!insertData || typeof insertData !== 'object') {
        reject(new Error('Data suppose to be a valid object'));
      }

      // add created date if not set
      if (!insertData.created_time) {
        insertData.created_time = mysql.raw('CURRENT_TIMESTAMP()');
      }
      const fields = Object.keys(insertData);
      this.db.query(`INSERT INTO ${this.tableName} (${fields.join(',')}) VALUES (${new Array(fields.length).fill('?').join(',')})`,
        Object.values(insertData),(err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result.insertId);
      });
    })
  }

  update(updateData, id) {
    return new Promise((resolve, reject) => {
      if (!Number(id)) {
        reject(new Error('Id is not valid'));
      }

      if (!updateData || typeof updateData !== 'object') {
        reject(new Error('Data suppose to be a valid object'));
      }

      const fields = Object.keys(updateData);

      this.db.query(`UPDATE ${this.tableName} SET ${fields.map(f => `${f} = ?`)} WHERE id = ?`,
        [...Object.values(updateData), id],(err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
    })
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      if (!Number(id)) {
        reject(new Error('Id is not valid'));
      }

      this.db.query(`DELETE FROM ${this.tableName} WHERE id = ?`,
        [id],(err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
    })
  }

  close() {
    this.db.end();
  }
}


export default BaseModel;
