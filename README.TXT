
CREATE TABLE CATAGORY (
    catagory varchar(50) NOT NULL
);

CREATE TABLE PRODUCT (
    pname varchar(50) NOT NULL,
    catagory varchar(50) NOT NULL,
    picture MEDIUMBLOB NOT NULL,
    stock int(10)  NOT NULL,
    price  int(10) NOT NULL,
    picture_name VARCHAR(255) NOT null
);

CREATE TABLE SUB-CATAGORIES (
    SCID INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL
    catagories varchar(100) NOT NULL,
    sub-catagories varchar(100) NOT NULL,
);

CREATE TABLE CUSTOMERS (
    Fullname varchar(50) NOT NULL,
    Address varchar(500) NOT NULL,
    City varchar(10) NOT NULL,
    pincode int(10) NOT NULL,
    Email varchar(30) NOT NULL,
    Phoneno int(15) NOT NULL
);

CREATE TABLE SALESMANS (
    Fullname varchar(50) NOT NULL,
    Address varchar(500) NOT NULL,
    City varchar(20) NOT NULL,
    pincode int(10) NOT NULL,
    Email varchar(30) NOT NULL,
    Phoneno int(15) NOT NULL
    );

    DROP TABLE SALESMANS;



CREATE TABLE CATEGORIES (
     Category varchar(100) PRIMARY KEY NOT NULL
);


TABLE :- CATAGORY
PROPERTIES:- catagorys

TABLE :- PRODUCT
PROPERTIES:- 
1. pname
2. picture
3. stock
4. price
5. catagory

TABLE :- CUSTOMERS
PROPERTIES:- 
1. Customerid
2. Firstname
3. Lastname
4. Address
5. City
6. State
7. Email
8. Phoneno
9. Dob

TABLE :- SALESMANS
PROPERTIES:- 
1. sname
2. saddress
3. scontact_no
4. Email

TABLES 

_________________
|  PRODUCT      | 
|               | 
|  CUSTOMERS    | 
|               | 
|  SALESMANS    | 
|               | 
|  CATEGORIES   |
|               |
------------------ 

ALTER TABLE PRODUCT RENAME COLUMN catagory to category;   

ALTER TABLE PRODUCT ADD Quantity int(20) not null;

ALTER TABLE CUSTOMERS RENAME COLUMN Firstname to Fullname;   

ALTER TABLE CUSTOMERS DROP COLUMN DOB;

ALTER TABLE CUSTOMERS MODIFY COLUMN Fullname varchar(50);

ALTER TABLE CUSTOMERS MODIFY COLUMN picture VARCHAR(255);

ALTER TABLE PRODUCT MODIFY COLUMN picture VARCHAR(255);

ALTER TABLE product MODIFY COLUMN picture_name VARCHAR(255);

ALTER TABLE PRODUCT RENAME COLUMN varient to unit;   

ALTER TABLE SALESMANS ADD workingarea VARCHAR(255) not null;

ALTER TABLE CUSTOMERS DROP COLUMN CID;

ALTER TABLE CUSTOMERS DROP PRIMARY KEY;

ALTER TABLE PRODUCT ADD sub_catagory varchar(100) not null;


ALTER TABLE PRODUCT ADD PID INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL FIRST;
ALTER TABLE CUSTOMERS ADD CID INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL FIRST;
ALTER TABLE SALESMANS ADD SID INT(20) AUTO_INCREMENT PRIMARY KEY NOT NULL FIRST;

INSERT INTO CATEGORIES (Category) VALUES ('Electric');
INSERT INTO CATEGORIES (Category) VALUES ('Food');
INSERT INTO CATEGORIES (Category) VALUES ('Auto Parts');
INSERT INTO CATEGORIES (Category) VALUES ('Packing Food');

ALTER TABLE userinfo ADD image blob;


"INSERT INTO ADMIN_INFO (NAME , EMAIL, PHONENO, PASSWORD, TOKEN) VALUES ('raj','rajranipa47@gmail.com','9327622916',,'mypassword')"

