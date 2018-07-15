# MySQL索引

## 一、索引的概念

索引是数据库中用来提高查询性能的最常用工具

所有mysql列类型都可以被索引，对相关列使用索引是提高select操作性能的最佳途径。

索引用来快速地寻找那些具有特定值的记录，所有mysql索引都以B树的形式保存。

在使用以下操作符时，都会用到相关列上的索引：

<、>、<=、>=、<>、in、between、like 'pattern'(pattern不能以通配符开始)



## 二、普通索引

这是最基本的索引类型，而且它没有唯一性之类的限制。

普通索引可以通过以下几种方式创建：

直接创建索引

语法：

```shell
CREATE INDEX 索引名 ON 表名 (列名[(length)]...)

create index nameindex on emp(name(50))
```

修改表时添加索引：

语法：

ALTER TABLE 表名 ADD INDEX[索引名]\(列名[(length)]...)

创建表的时候指定索引

语法：

```shell
CREATE TABLE表名(
	[…],
	INDEX[索引名](列名[(length)]...)
)
```



如果要创建索引的列名的类型是CHAR、VACHAR类型，length可以小于字段实际长度，如果是BLOB和TEXT类型必须指定length



## 三、唯一索引

这种索引和前面的“普通索引”基本相同，但有一个区别：索引列的所有值都只能出现一次，即必须唯一。

唯一性索引可以用以下几种方式创建

创建索引

语法：

```shell
CREATE UNIQUE INDEX 索引名 ON 表名(列名[(length)]…);
```































