# orders-api

### Requirements
* Node.js
* MySQL

### Set Up

1) Set MySQL connection details in `.env` file;
2) Install dependencies `npm install`;
3) Run migrations `node_modules/.bin/db-migrate up`
4) Run server `npm run`

### API

**Restaurant**

| Title               | URL                 | Method  | Params         | Notes  |
|---------------------|---------------------|---------|----------------|--------|
| list of restaurants | `/restaurant`       |  GET    | *none*         |        |
| one restaurant data | `/restaurant/:id`   |  GET    | *none*         |        |
| create restaurant   | `/restaurant`       |  POST   | *(string)* name  |        |
| update restaurant   | `/restaurant/:id`   |  PUT    | *(string)* name  |        |
| delete restaurant   | `/restaurant/:id`   |  DELETE | *none*         |        |

**Client**

| Title               | URL                 | Method  | Params         | Notes  |
|---------------------|---------------------|---------|----------------|--------|
| list of client | `/client`       |  GET    | *none*         |        |
| one client data | `/client/:id`   |  GET    | *none*         |        |
| create client   | `/client`       |  POST   | *(string)* name, *(int)* restaurant_id (optional)  |        |
| update client   | `/client/:id`   |  PUT    | *(string)* name  |        |
| delete client   | `/client/:id`   |  DELETE | *none*         |        |

**Courier**

| Title               | URL                 | Method  | Params         | Notes  |
|---------------------|---------------------|---------|----------------|--------|
| list of courier | `/courier`       |  GET    | *none*         |        |
| one courier data | `/courier/:id`   |  GET    | *none*         |        |
| create courier   | `/courier`       |  POST   | *(string)* name, *(int)* restaurant_id  |        |
| update courier   | `/courier/:id`   |  PUT    | *(string)* name, (0/1) is_available  |        |
| delete courier   | `/courier/:id`   |  DELETE | *none*         |        |

**Order**

| Title               | URL                 | Method  | Params         | Notes  |
|---------------------|---------------------|---------|----------------|--------|
| list of restaurants | `/order`       |  GET    | *none*         |        |
| one restaurant data | `/order/:id`   |  GET    | *none*         |        |
| create restaurant   | `/order`       |  POST   | *(int)* client_id, *(int)* restaurant_id, *(int)* courier_id, *(string)* delivery_time  |   delivery time in SQL date format  |
| update restaurant   | `/order/:id`   |  PUT    | *(string)* status ('created'/'in_progress'/'completed'/'canceled'), *(string)* delivery_time  |        |

