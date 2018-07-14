# MySQL聚合函数

## 一、AVG

AVG([DISTINCT] expr)

返回expr的平均值。DISTINCT选项可用于返回expr的不同值的平均值

```shell
select gender, avg(age) from student group by gender;
```



## 二、COUNT

COUNT(expr)

返回select语句检索到的行中非NULL值的数目

```shell
# 返回检索行的数目，不论其是否包含NULL值
select count(*) from student;

# 返回select语句检索到的行中非NULL值的数目
select count(name) from student; 
```



## 三、MIN/MAX

MIN([DISTINCT] expr)

MAX([DISTINCT] expr)

返回值expr的最小值和最大值

```shell
select min(age) from student;
select max(age) from student;
select min(age) as age_min, max(age) as age_max from student;
```



## 四、SUM

SUM([DISTINCT] expr)

返回expr的总数

```shell
select sum(age) from student;
```

























