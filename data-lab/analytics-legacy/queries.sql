-- Week 2: Basic SQL Queries
-- Purpose: Initial exploration of IBM HR Data

-- 1. Select all columns to inspect data
SELECT *
FROM employees;

-- 2. Select specific columns
SELECT Age, Department, Attrition
FROM employees;

-- 3. Filter for Sales department
SELECT *
FROM employees
WHERE Department = 'Sales';

-- 4. Order by Income
SELECT EmployeeNumber, JobRole, MonthlyIncome
FROM employees
ORDER BY MonthlyIncome DESC;

-- Week 3: Aggregation and Grouping
-- Purpose: Answering business questions with counts and averages

-- 5. Count employees per Department
-- Business Question: What is the headcount distribution?
SELECT Department, COUNT(*) as EmployeeCount
FROM employees
GROUP BY Department;

-- 6. Average Income by Job Role
-- Business Question: What is the average salary for each role?
SELECT JobRole, AVG(MonthlyIncome) as AvgIncome
FROM employees
GROUP BY JobRole
ORDER BY AvgIncome DESC;

-- 7. Attrition by Marital Status
-- Business Question: Does marital status correlate with attrition?
SELECT MaritalStatus, COUNT(*) as AttritionCount
FROM employees
WHERE Attrition = 'Yes'
GROUP BY MaritalStatus;

-- Week 4: Case implementations

-- Query 1: Categorize employees by Age Group
SELECT
	Age,
	CASE
		WHEN Age < 27 THEN 'Gen Z'
		WHEN Age BETWEEN 27 AND 42 THEN 'Millennial'
		WHEN Age BETWEEN 43 AND 58 THEN 'Gen X'
		ELSE 'Boomer'
	END AS Generation_Group
FROM employees;

-- Query 2: Group employees into Salary Bands
SELECT
	MonthlyIncome,
	CASE
		WHEN MonthlyIncome < 5000 THEN 'Entry Level'
		WHEN MonthlyIncome BETWEEN 5000 AND 15000 THEN 'Mid Level'
		ELSE 'Executive'
	END AS Salary_Band
FROM employees;

-- Query 3: Flag High Risk employees based on Job Satisfaction
SELECT
	Attrition,
	JobSatisfaction,
	CASE
		WHEN JobSatisfaction <= 2 THEN 'High Risk'
		ELSE 'Stable'
	END AS Retention_Risk_Status
FROM employees;