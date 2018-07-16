# MySQL表连

## 一、内连接

语法：

SELECT … FROM join_table

​	 [INNER] JOIN join_table2

​	 [ON join_condition] 

​	WHERE where_definition

只列出这些连接表中与连接条件相匹配的数据行

```sql
select * from emp 
	inner join dept
	on emp.dept_id=dept.id;
	
select * from emp as e, dept d
	where e.dept_id = d.id;
```



## 二、外连接

语法：

SELECT … FROM join_table

​	 (LEFT | RIGHT | FULL) [OUTER] JOIN join_table2

​	ON join_condition

​	WHERE where_definition 

不仅列出与连接条件相匹配的行，还列出左表（左外连接）、右表（右外连接）或两个表（全外连接）中所有符合WHERE过滤条件的数据行。



比如 a，b两张表，a表10条数据 b 表100条数据，然后所有都匹配不到的情况。

左连接结果就是a表的10条记录，

右连接的结果就是b表的100条记录



外连接分类：

左外连接(LEFT [OUTER] JOIN)

右外连接(RIGHT [OUTER] JOIN)

全外连接(FULL [OUTER] JOIN)

```shell
# 左外连接示例
select * from emp 
	left join dept
	on emp.dept_id = dept.id;
```



## 三、交叉连接

语法：

SELECT … FROM join_table CROSS JOIN join_table2;

没有ON子句和WHERE子句，它返回连接表中所有数据行的笛卡尔积。

其结果集合中的数据行数等于第一个表中符合查询条件的数据行数乘以第二个表中符合查询条件的数据行数。

相当于：

SELECT … FROM table1, table2;

```shell
select e.name, d.name from emp e, dept d;
```



## 四、自连接

参与连接的表都是同一张表。（通过给表取别名虚拟出）

```shell
# 查询出员工姓名和其经理的姓名
select e1.name ename, e2.name mname
from emp e1 left join emp e2
on e2.id = e1.gmr

# 查询出所有经理的姓名
select e1.name mname
from emp e1 right join emp e2
on e1.id = e2.gmr
```





















