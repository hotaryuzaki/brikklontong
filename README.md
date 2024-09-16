# SETUP PROJECT

1. install docker desktop (docker engine & docker compose):
https://docs.docker.com/desktop/install/linux/
0. setup & login into docker desktop:
https://docs.docker.com/desktop/get-started/#credentials-management-for-linux-users
0. GIT pull brikklontong project:
https://github.com/hotaryuzaki/brikklontong.git
0. run npm install
0. run docker compose up

# DATABASE
#### TABLE: PRODUCTS
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

#### TABLE: CATEGORIES
|  NO  |  FIELD NAME   |  DATA TYPE  |
|---|---|---|
|  1  |  id  |  number - primary id  |
|  2  |  name  |  string  |

#### TABLE: AUDIT_LOG
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

#### TABLE: CART
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

#### TABLE: ORDER
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


# API
1. products CRUD
**create**: URL/products (POST)
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
**update**: URL/products/id (PATCH)
      multipart/form-data : {
        "CategoryId": 2,
        "sku": "109",
        ... [partial/full]
      }
**delete**: URL/products/id (DEL)
**findAll**: URL/products?page=1&pageSize=10&search=sop (GET)
**findOne**: URL/products/id (GET)
1. categories CRUD
**create**: URL/categories (POST)
      {
        "name": "Sayuran",
      }
**delete**: URL/categories/id (DEL)
**findOne**: URL/categories/id (GET)
1. cart
**create**: URL/cart (POST)
      {
        "productId": 37,
      }
**update**: URL/cart/id (PATCH)
      {
        "name": "Buahan",
      }
**delete**: URL/cart/id (DEL)
**findAll**: URL/cart (GET)
**findOne**: URL/cart/id (GET)
1. order CRUD
**create**: URL/order (POST)
      {
        "cartId": 2,
      }
**delete**: URL/order/id (DEL)
**findOne**: URL/order/id (GET)

# AUDIT LOGS
Audit logs for Products store in Docker postgresdb auditLogs table. Please make sure to use double quote when querying auditLogs table.
```
SELECT * FROM "auditLogs";
```

---
To NestJS docs clicks the icon:
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>