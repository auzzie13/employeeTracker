USE employee_tracker_db;

INSERT INTO departments (name)
VALUES ('HR'),('IT'),('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES ('Manager', 100000.00, 1), ('Associate', 50000.00, 1), ('Associate', 60000.00, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Austin', 'Williams', 1, null), ('Erin', 'Williams', 2, null), ('Ireland', 'Williams', 2, null);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;
