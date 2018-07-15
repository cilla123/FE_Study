# MySQL子查询

## 一、子查询

某些情况下，当进行查询的时候，需要的条件是另外一个select语句的结果，这个时候，就要用到子查询。

为了给主查询（外部查询）提供数据而首先执行的查询（内部查询）被叫做子查询。

用于子查询的关键字主要包括IN、NOT IN、EXIST、NOT EXIST、= 、<>等。

一般来说子查询的效率低于连接查询。表连接都可以用子查询替换，但反过来说却不一定。

```shell
# 查询月薪最高的员工的名字
select name, salary from emp
where salary = (select max(salary) from emp);

# 查询出每个部门的平均月薪
select avg(salary) max_salary, dept_id from emp
where dept_id is not null group by dept_id;

# 查询月薪比平均月薪高的员工的名字
select name, salary from emp
where salary > (select avg(salary) from emp);
```

