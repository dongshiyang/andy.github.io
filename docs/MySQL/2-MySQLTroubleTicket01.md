---
description: 索引是MySQL性能的基石
title: MySQL常见问题解析(一)索引失效
readingTime: false
tag:
 - MySQL
recommend: 3
---
# MySQL 索引失效的常见场景

索引是MySQL性能的基石，但错误的使用方式会让索引失效，导致全表扫描。

这是最常见的性能雷区。

### 为什么索引会失效？

索引失效的本质是MySQL优化器认为使用索引的成本高于全表扫描。

了解这些场景，可以帮助我们写出更高效的SQL。

**示例场景**

```SQL
-- 创建测试表
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    age INT,
    email VARCHAR(100),
    created_time DATETIME,
    INDEX idx_name (name),
    INDEX idx_age (age),
    INDEX idx_created_time (created_time)
);

-- 1.1：对索引列进行函数操作
-- 错误写法：索引失效
EXPLAIN SELECT * FROM user WHERE DATE(created_time) = '2023-01-01';

-- 正确写法：使用范围查询
EXPLAIN SELECT * FROM user 
WHERE created_time >= '2023-01-01 00:00:00' 
AND created_time < '2023-01-02 00:00:00';

-- 1.2：隐式类型转换
-- 错误写法：name是字符串，但用了数字，导致索引失效
EXPLAIN SELECT * FROM user WHERE name = 123;

-- 正确写法：类型匹配
EXPLAIN SELECT * FROM user WHERE name = '123';

-- 1.3：前导模糊查询
-- 错误写法：LIKE以%开头，索引失效
EXPLAIN SELECT * FROM user WHERE name LIKE '%三%';

-- 正确写法：非前导模糊查询，可以使用索引
EXPLAIN SELECT * FROM user WHERE name LIKE '苏%';

-- 1.4：OR条件使用不当
-- 错误写法：age有索引，email无索引，导致整个查询无法使用索引
EXPLAIN SELECT * FROM user WHERE age = 25 OR email = 'test@example.com';

-- 正确写法：使用UNION优化OR查询
EXPLAIN 
SELECT * FROM user WHERE age = 25
UNION
SELECT * FROM user WHERE email = 'test@example.com';

```
### 3. 深度剖析

我们在使用中可能会疑惑：`为什么这些写法会导致索引失效？`

### 
1. **函数操作破坏索引有序性** 
    - **1.1** ：对列使用函数后，MySQL无法利用索引的有序性
    - **1.2**：必须扫描所有索引项，计算函数值后再比较
    - **1.3**：索引是按照列值的原始顺序存储的
  
2. **隐式类型转换的本质**：
    - **1.1** ：当类型不匹配时，MySQL会进行隐式转换
    - **1.2**：实际上相当于：CAST(name AS SIGNED) = 123
    - **1.3**：对索引列进行了函数操作，导致失效
    
3. **前导模糊查询的B+树遍历**：
    - **1.1** ：B+树索引按照前缀排序
    - **1.2**：LIKE '苏%'可以利用前缀匹配
    - **1.3**：LIKE '%三'无法确定前缀，必须全表扫描

---

### 4. 避坑指南：

1. 避免对索引列进行函数操作

2. 确保查询条件与索引列类型匹配

3. 谨慎使用前导模糊查询

4. 使用UNION优化复杂的OR查询