# MySQL控制流程函数

## 一、CASE

case value when [compare-value] then result [when [compare-value] then result …\][else result] end

如果没有匹配的结果值，则返回结果为else后的结果，如果没有else部分，则返回值为null。

```shell
# 输出男
select case 1 when 1 then '男' when 2 then '女' else '人妖' end as result; 

# 输出人妖
select case 3 when 1 then '男' when 2 then '女' else '人妖' end as result; 
```



## 二、IF

IF(expr1, expr2, expr3)

如果expr1是true(expr <> 0 and expr1 <> null), 则if()的返回值为expr2；否则返回值为expr3

```shell
# 输出yes
select if(1<2,'yes','no');
```



## 三、IFNULL

IFNULL(expr1, expr2)

假如expr1不为null，则ifnull()的返回值为expr1；否则其返回值为expr2

```shell
# 输出1
select ifnull(1,0);

# 输出0
select ifnull(null,0);
```



## 四、NULLIF

NULLIF(expr1, expr2)

如果expr1 = expr2成立，那么返回值为NULL，否则返回值为expr1

```shell
# 输出null
select nullif(1,1);

# 输出1
select nullif(1,2);
```

























