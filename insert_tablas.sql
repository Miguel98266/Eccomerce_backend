CREATE EXTENSION pgcrypto;

INSERT INTO admins(email,password) VALUES ('email@email.com',crypt('123456',gen_salt('bf')));

-- Roles
select * from rol;
INSERT INTO rol(rol_name) VALUES ('Admin');
INSERT INTO rol(rol_name) VALUES ('Cliente');
delete from rol;
-- Gender
select * from gender;
INSERT INTO gender(gender) VALUES ('Masculino');
INSERT INTO gender(gender) VALUES ('Femenino');
-- Customer
select * from customer;
INSERT INTO customer(first_name,last_name,birth,id_gender,email,password,id_role)VALUES('Miguel','Calixto','1996-12-02',1,'miguel@gmail.com',crypt('123456',gen_salt('bf')),3);
INSERT INTO customer(first_name,last_name,birth,id_gender,email,password,id_role)VALUES('Angeles','Chavez','1998-05-22',2,'angeles@gmail.com',crypt('123456',gen_salt('bf')),4);

SELECT id_customer,first_name,rol_name FROM customer INNER JOIN rol ON rol.id_role = customer.id_role WHERE email='miguel@gmail.com' AND password = crypt('123456',password)

SELECT * FROM customer;
select first_name,last_name,birth,gender,rol_name from customer 
INNER JOIN gender ON gender.id_gender = customer.id_gender
INNER JOIN rol on rol.id_role = customer.id_role;

