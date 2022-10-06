CREATE TABLE order_status(
 id_order_status SERIAL PRIMARY KEY,
 name VARCHAR(50) NOT NULL
);

INSERT INTO order_status (name) VALUES('En Proceso');
INSERT INTO order_status (name) VALUES('En Transito');
INSERT INTO order_status (name) VALUES('Completo');

select * from order_status;

drop table order_status; 

ALTER TABLE order_products
ADD id_order_status INT;

alter table order_products
add FOREIGN KEY (id_order_status) references order_status(id_order_status);


-- CREATE EXTENSION pgcrypto;
-- INSERT INTO admins(email,password) VALUES ('email@email.com',crypt('123456',gen_salt('bf')));