# 1. SETUP PROJECT

1. install docker desktop (docker engine & docker compose):
https://docs.docker.com/desktop/install/linux/
0. setup & login into docker desktop:
https://docs.docker.com/desktop/get-started/#credentials-management-for-linux-users
0. GIT pull brikklontong project:
https://github.com/hotaryuzaki/brikklontong.git
0. run npm install
0. run docker compose up

# 2. DATABASE
#### 1. TABLE: products
|  NO  |  FIELD NAME   |  DATA TYPE  |
|---|---|---|
|  1  |  id  |  number - primary id  |
|  2  |  categoryId  |  number  |
|  3  |  name  |  string  |
|  4  |  sku  |  number  |
|  5  |  description  |  string  |
|  6  |  weight  |  number  |
|  7  |  width  |  number  |
|  8  |  length  |  number  |
|  9  |  height  |  number  |
|  10  |  image  |  string  |
|  11  |  price  |  number  |

#### 2. TABLE: categories
|  NO  |  FIELD NAME   |  DATA TYPE  |
|---|---|---|
|  1  |  id  |  number - primary id  |
|  2  |  name  |  string  |

#### 3. TABLE: auditLog
|  NO  |  FIELD NAME   |  DATA TYPE  |
|---|---|---|
|  1  |  id  |  number - primary id  |
|  2  |  tableName  |  string  |
|  3  |  recordId  |  number  |
|  4  |  operationType  |  string  |
|  5  |  operationTime  |  timestamptz - default now()  |
|  6  |  oldData  |  string  |
|  7  |  newData  |  string  |
|  8  |  changeBy  |  number  |

#### 4. TABLE: cart
|  NO  |  FIELD NAME   |  DATA TYPE  |
|---|---|---|
|  1  |  id  |  number - primary id  |
|  2  |  codeOrder  |  string  |
|  3  |  paymentCode  |  string  |
|  4  |  productId  |  number  |
|  5  |  createAt  |  timestamptz - default now()  |
|  6  |  expireAt  |  timestamptz  |
|  7  |  price  |  number  |
|  8  |  deliveryPrice  |  number  |
|  9  |  grandTotal  |  number  |
|  10  |  userId  |  number  |
|  11  |  statusCart  |  enum("order", "cart", "expired")  |

#### 5. TABLE: order
|  NO  |  FIELD NAME   |  DATA TYPE  |
|---|---|---|
|  1  |  id  |  number - primary id  |
|  2  |  codeOrder  |  string  |
|  3  |  paymentCode  |  string  |
|  4  |  productId  |  number  |
|  5  |  createAt  |  timestamptz - default now()  |
|  6  |  expireAt  |  timestamptz - default now() + 3  |
|  7  |  price  |  number  |
|  8  |  deliveryPrice  |  number  |
|  9  |  grandTotal  |  number  |
|  10  |  userId  |  number  |
|  11  |  statusOrder  |  enum("paid", "unpaid", "expired")  |


# 3. API
#### 1. Products CRUD
```
create: URL/products (POST)
      multipart/form-data : {
        "CategoryId": 3,
        "sku": "107",
        "name": "TOKEK rica",
        "description": "DAGING lele gede",
        "weight": 2,
        "width": 2,
        "length": 3,
        "height": 3,
        "image": [upload],
        "price": 22000
      }

update: URL/products/id (PATCH)
      multipart/form-data : {
        "CategoryId": 2,
        "sku": "109",
        ... [partial/full]
      }

delete: URL/products/id (DEL)
findAll: URL/products?page=1&pageSize=10&search=sop (GET)
findOne: URL/products/id (GET)
```

#### 2. Categories CRUD
```
create: URL/categories (POST)
      {
        "name": "Sayuran",
      }

delete: URL/categories/id (DEL)
findOne: URL/categories/id (GET)
```

#### 3. Cart CRUD
```
create: URL/cart (POST)
      {
        "productId": 37, // REFERENCE TO THE RECORD IN PRODUCTS TABLE
      }

delete: URL/cart/id (DEL)
findAll: URL/cart (GET) => ONLY SHOWING RECORD WITH STATUSCART="CART"
findOne: URL/cart/id (GET)
```

#### 4. Order CRUD
```
create: URL/order (POST)
      {
        "cartId": 3, // REFERENCE TO THE RECORD IN CART TABLE
        "productId": 37 // REFERENCE TO THE RECORD IN PRODUCTS TABLE
      }
NOTE: statusCart in Cart table will set to "order"
      
update: URL/order/id (PATCH)
      {
        "statusOrder": "paid",
      }
NOTE: set statusOrder to "paid"

delete: URL/order/id (DEL)
findAll: URL/order (GET) => ONLY SHOWING RECORD WITH STATUSORDER="UNPAID"
findOne: URL/order/id (GET)
```

# 4. AUDIT LOGS
Audit logs for the Products table are stored in a Docker container named Postgresdb in the auditLogs table. Please make sure to use double quote when querying the auditLogs table .
```
SELECT * FROM "auditLogs";
```

---
To NestJS docs clicks the icon:
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>