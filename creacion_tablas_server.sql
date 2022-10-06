
CREATE TABLE category(
	id_category SERIAL PRIMARY KEY,
	category_name VARCHAR(50) NOT NULL,
	description VARCHAR(150) NOT NULL
);

CREATE TABLE brand(
	id_brand SERIAL PRIMARY KEY,
	brand_name VARCHAR(50) NOT NULL
);

CREATE TABLE product(
	id_product SERIAL PRIMARY KEY,
	product_name VARCHAR(50) NOT NULL,
	description VARCHAR(150) NOT NULL,
	price NUMERIC(7,2),
	id_category INT ,
	id_brand INT,
	sku VARCHAR(25),
	product_image TEXT,
	stock INT,
	avaliable boolean,
	FOREIGN KEY(id_category) REFERENCES category(id_category),
	FOREIGN KEY(id_brand) REFERENCES brand(id_brand)
);

CREATE TABLE gender(
	id_gender SERIAL PRIMARY KEY,
	gender VARCHAR(50) NOT NULL
);

CREATE TABLE rol(
	id_role SERIAL PRIMARY KEY,
	rol_name VARCHAR(50) NOT NULL
);


CREATE TABLE customer(
	id_customer SERIAL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	birth DATE NOT NULL,
	id_gender INT,
	email VARCHAR(150) NOT NULL,
	password VARCHAR(200) NOT NULL,
	id_role INT,
	FOREIGN KEY(id_gender) REFERENCES gender(id_gender),
	FOREIGN KEY(id_role) REFERENCES rol(id_role)
);


CREATE TABLE order_status(
 id_order_status SERIAL PRIMARY KEY,
 name VARCHAR(50) NOT NULL
);
CREATE TABLE order_products(
	id_order SERIAL PRIMARY KEY,
	id_customer INT NOT NULL,
	total NUMERIC(7,2),
	order_date DATE not null default CURRENT_DATE,
	id_order_status INT NOT NULL,
	FOREIGN KEY(id_customer) REFERENCES customer(id_customer),
	FOREIGN KEY(id_order_status) REFERENCES order_status(id_order_status)
);
CREATE TABLE order_detail(
	id_orderdetail SERIAL PRIMARY KEY,
	id_order INT NOT NULL,
	id_product INT NOT NULL,
	quantity INT,
	unit_product INT,
	FOREIGN KEY(id_order) REFERENCES order_products(id_order),
	FOREIGN KEY(id_product) REFERENCES product(id_product)
);

