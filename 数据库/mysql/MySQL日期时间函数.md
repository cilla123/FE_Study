# MySQL日期时间函数

## 一、DAYOFWEEK、DAYOFYEAR、DAYOFMONTH

DAYOFWEEK(date)

返回date(1=周日, 2=周一, …, 7=周六)对应的工作索引。

```shell
# 输出3
select dayofweek('1998-02-03');
```

DAYOFYEAY(date)

返回date对应的一年中的天数，范围是1到366

```shell
# 输出34
select dayofyear('1998-02-03');
```

DAYOFMONTH(date)

返回date对应的该月日期，范围是从1到31

```shell
# 输出3
select dayofmonth('1998-02-03');
```

DAY(date)和DAYOFMONTH()的意义相同



## 二、WEEKDAY

WEEKDAY(date)

返回date(0=周一, 1=周二, … 6=周日)对应的工作日索引

```shell
# 输出1
select weekday('1998-02-03 22:23:00');

# 输出2
select weekday('1997-11-05');
```



## 三、YEAR、MONTH

YEAR(date)

返回date对应的年份，范围是从1000到9999

```shell
# 输出1998
select year('98-02-03');
```

MONTH(date)

返回date对应的月份，范围是从1到12

```shell
# 输出2
select month('1998-02-03');
```



## 四、QUARTER

QUARTER(date)

返回date对应的一年中的季度值，范围是从1到4

```shell
# 输出2
select quarter('98-04-01');
```



## 五、HOUR、MINUTE、SECOND

HOUR(time)

返回time对应的小时数。对于日时值的返回值范围从0到23

```shell
# 输出10
select hour('10:05:03');
```

然而，TIME值的范围实际上非常大，所以HOUR可以返回大于23的值

```shell
# 输出272
select hour('272:59:59');
```



## 六、TO_DAYS、FROM_DAYS

TO_DAYS(date)

给定一个日期date，返回一个天数(从年份0开始的天数)

```shell
# 输出728779
select to_days(950501);

# 输出729669
select to_days('1997-10-07');
```

FROM_DAYS(N)

给定一个天数N，返回一个DATE值。

```shell
# 输出1997-10-07
select from_days(729669);
```

使用FROM_DAYS()处理古老日期时，务必谨慎，它不用于处理阳历出现前的日期(1582)



## 七、CURDATE、CURTIME、NOW

CURDATE()

将当前日期按照'YYYY-MM-DD'或YYYYMMDD格式的值返回，具体格式根据函数用在字符串或是数字语境中而定。

```shell
# 输出1997-12-15
select curdate();

# 输出19971215
select curdate() + 0;
```

























