-- Brand
select * from brand;
INSERT INTO brand(brand_name)values('Bimbo');

-- Rol
select * from rol;
INSERT INTO rol(rol_name) VALUES ('Admin');
INSERT INTO rol(rol_name) VALUES ('Cliente');
-- delete from rol;

-- Gender
select * from gender;
INSERT INTO gender(gender) VALUES ('Masculino');
INSERT INTO gender(gender) VALUES ('Femenino');

-- Customer
select * from customer;
INSERT INTO customer(first_name,last_name,birth,id_gender,email,password,id_role)VALUES('Miguel','Calixto','1996-12-02',1,'miguel@gmail.com',crypt('123456',gen_salt('bf')),1);
INSERT INTO customer(first_name,last_name,birth,id_gender,email,password,id_role)VALUES('Angeles','Chavez','1998-05-22',2,'angeles@gmail.com',crypt('123456',gen_salt('bf')),2);

SELECT * FROM customer;
delete from customer where id_customer=3;
Select * customer WHERE email='angeles@gmail.com'
select first_name,last_name,birth,gender,rol_name from customer 
INNER JOIN gender ON gender.id_gender = customer.id_gender
INNER JOIN rol on rol.id_role = customer.id_role;

-- Product
SELECT product_name,product.description,price, category_name , brand_name,sku,product_image ,stock, avaliable FROM product
INNER JOIN category on product.id_category=category.id_category
INNER JOIN brand ON product.id_brand=brand.id_brand;

-- Order Status
INSERT INTO order_status(name)values('Proceso');
INSERT INTO order_status(name)values('En Transito');
INSERT INTO order_status(name)values('Completado');
Select * from order_status;

-- Order products
INSERT INTO order_products(id_customer,total,id_order_status)values(1,50,1);

SELECT id_customer,total,order_status.name AS Status,order_date FROM order_products
INNER JOIN order_status ON order_status.id_order_status=order_products.id_order_status

-- Order detail
INSERT INTO order_detail(id_order,id_product,quantity,unit_product)values(1,1,1,1);
SELECT id_order,product_name,quantity,unit_product FROM order_detail
INNER JOIN product ON order_detail.id_product=product.id_product WHERE id_order=;