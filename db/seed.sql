USE employee_db;

INSERT INTO department(departmentname) 
VALUES ('sales'), 
('engineering'), 
('finance'),
('legal');

INSERT INTO emploryeerole (title, salary, departmentid) 
VALUES ('sales lead', 100000, 1), 
('salesperson', 80000, 1), 
('lead engineer', 150000, 2), 
('softerware engineer', 120000, 2), 
('accountant', 125000, 3),
('leagal team lead',250000, 4), 
('lawyer', 190000, 4);

INSERT INTO emploryee (first_name, last_name , roleid,manager_id) 
VALUES ('John', 'Doe', 1,null), 
('Mike', 'Chan', 2,null), 
('Ashley', 'Rodriguez', 3,null), 
('Kevin', 'Tupik', 4,null), 
('Malia', 'Brown', 5,null),
('Sarah','Lourd', 6,null), 
('Tom', 'Allen', 7,null);