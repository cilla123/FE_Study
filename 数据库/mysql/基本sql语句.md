# 基本的SQL语句

## 一、Mysql命令行客户端命令

cmd 命令行操作：

```shell
# 登录mysql数据库
mysql -u root -p
password

# 查看数据库
show databases 
# 使用数据库
use 数据库名

# 查看当前数据库表
show tables

# sql全称是
结构化查询语言（Structured Query Language）
```



## 二、数据定义语言（DDL）

数据定义语言：Data Definition Language，如CREATE、DROP、ALERT等语句。

```shell
# 创建数据库（CREATE DATABASE语句）
CREATE DATABASE my database;

# 创建表（CREATE TABLE语句）
CREATE TABLE teacher(
	sid int(11) primary key auto_increment,
	name varchar(20),
	gender char(1),
	age int(2),
	birth date
);
# 查看表结构
desc teacher;

# 主键： 用来唯一代表一条记录的字段（主键值必须是唯一）

# 删除表（DROP TABLE语句）
# drop table 语句会删除该的所有记录及表结构
DROP TABLE test;

# 修改表结构（ALERT TABLE语句）
# 添加表列
alert table test add column name varchar(10); 
# 修改表名
alert table test rename test1;
# 删除表列
alert table test drop column name;
# 改表列类型
alert table test modify address char(10);
# 修改表列类型
alert table test change address address char(10);
# 修改表列名
alert table test change column address address1 varchar(30)
```



## 三、数据操纵语言（DML）

数据操纵语言：Data Manipulation Language 如：INSERT，UPDATE、DELETE语句

```shell
# 添加数据（INSERT INTO ...语句）
INSERT INTO 表名（字段1，字段2，字段3）values(值， 值， 值)

# 修改数据（UPDATE ... SET语句）
UPDATE 表名 SET 字段名='值'， 字段名='值'，where 字段名='值'

# 删除数据（DELETE FROM ...语句）
# 删除所有记录
DELETE FROM 表名
# 删除ID为1的记录
DELETE FROM 表名 where id=1;
```



## 四、数据查询语言（DRL）

数据查询语言（Data Retrieval Language — DRL）：SELECT 语句

以下示例讲解查询语句的使用：

```shell
# 1.查询所有老师信息
select username, id, phone, create_time from teacher;

# 2.在没有表被引用的情况下，允许您指定DUAL作为一个假的表名
select 1+1 from dual;

# 3.查询ID为1的老师信息
select * from teacher where id='1';

# 4.查询职业为1的老师信息
select * from teacher where job is null;
select * from teacher where job is not null;

# 5.使用别名查询ID为1的老师的姓名和性别
select name, sex from teacher where id='1';

# 6.查询性别为女和指定日期的老师信息
select * from teacher where sex='f' and create_time='1234567891234';

# 7.查询ID大于5的学生
select * from student where id>5;

# 8.查询性别为男或者ID小于5的老师
select * from student where id<5;

# 9.查询姓名的最后一个字符为“S”的老师
select * from teacher where name like '%S';

# 10.查询姓名以指定字符开头的老师
select * from teacher where name like 'p%';

# 11.查询姓名中包含“w”的老师
select * from teacher where name like '%w%';
```



























