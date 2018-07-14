# MySQL字符串函数

## 一、CHAR_LENGTH

CHAR_LENGTH(str)

返回值为字符串str的长度，长度的单位为字符

```shell
# 输出3
select char_length('Ben')
select char_name(name) from teacher
```



## 二、FORMAT

FORMAT(X, D)

将数字X的格式写为'#,###,###.##'，以四舍五入的方式保留小数点后D位，并将结果以字符串的形式返回。若D为0，则返回结果不带有小数点，或不包含小数部分。

```shell
# 输出12332.12
select format(12332.123124, 2)
```



## 三、INSERT

INSERT(str, pos, len, newstr)

返回字符串str，其字符串起始于pos位置和长期被长期被字符串newstr取代的len字符。如果pos超过字符串长度，则返回值为原始字符串。假如len的长度大于其他字符串的长度，则从位置pos开始替换。若任何一个参数为null，则返回值为null。

```shell
select insert('Quadratic', 3, 4, 'What');

select insert('Quadratic', 3, 100, 'What');
```



## 四、INSTR

INSTR(str, substr)

返回字符串str中字符串的第一个出现位置

```shell
select INSTR('foobarbar', 'bar');
```



## 五、LFET/RIGHT

LEFT(str, len)

返回从字符串str开始的len最左字符

```shell
select left('foobarbar', 5)
```



RIGHT(str, len)

返回从字符串str开始的len最右字符

```shell
select right('foobarbar', 4)
```



## 六、LENGTH

LENGTH(str)

返回值为字符串str的长度，单位为字节。一个多字节字符算作多字节。这意味着对于一个包含5个2字节字符的字符串，LENGTH()的返回值为10，而CHAR_LENGTH()的返回值为3。

```shell
select length('text')
```



## 七、LTRIM/RTRIM/TRIM

LTRIM(str)

返回字符串str,其引导空格字符被删除

```shell
select ltrim(' barbar')
```



RTRIM(str)

返回字符串str,结尾空格字符被删除

```shell
select rtrim('barbar ')
```



TRIM([{BOTH | LEADING | TRAILING}[remstr] FROM] str) TRIM(remoter FROM] str)

返回字符串str，其中所有remstr前缀和/或后缀都已被删除。若分符BOTH、LEADING或TRAILING中没有一个是给定的，则假设为BOTH。remstr为可选项，在未指定情况下，可删除空格。

```shell
# 输出bar
select trim(' bar  ');

# 输出barxxx
select trim(leading 'x' from 'xxxbarxxx');

# 输出bar
select trim(both 'x' from 'xxxbarxxx');

# 输出barx
select trim(trailing 'xzy' from 'barxxyz');
```



## 八、STRCMP

STRCMP(expr1, expr2)

若所有的字符串均相同，则返回0，若根据当前分类次序，第一个参数小于第二个，则返回-1，其他情况返回1。

```shell
# 输出-1
select strcmp('text', 'text2')

# 输出1
select strcmp('text2', 'text')

# 输出0
select strcmp('text', 'text')
```



## 九、CONCAT

CONCAT(str1, str2, ...)

返回结果为连接参数产生的字符串。如有任何一个参数为NULL，则返回NULL。或许有一个或多个参数。如果所有参数均为非二进制字符串，则结果为二进制字符串。如果自变量中含有任一二进制字符串，则结果为一个二进制字符串。一个数字参数被转化为与之相等的二进制字符串格式；若要避免这种情况，可使用显式类型cast，例如：select concat(cast(int_col as char), char_col)

```shell
# 输出mysql
select concat('my', 's', 'ql');

# 输出null
select concat('my', null, 'ql');
```



## 十、SUBSTRING

SUBSTRING(str, pos), SUBSTRING(str FROM pos), SUBSTRING(str, pos, len), SUBSTRING(str FROM pos FOR len)

不带有len参数的格式从字符串str返回一个字符串，起始于位置pos。带有len参数的格式从字符串str返回一个长度同len字符相同的子字符串，起始于位置pos。使用FROM的格式为标准SQL语法。也可能对pos使用一个负值。假若这样，则子字符串的位置起始于字符串结果的pos字符，可不是字符串的开头位置。在以下格式的函数中可以对pos使用一个负值。

```shell
# 输出ratically
select substring('Quadratically', 5);

# 输出barbar
select substring('foobarbar' from 4);

# 输出ratica
select substring('Quadratically', 5, 6);

# 输出ila
select substring('Sakila', -3);

# 输出aki
select substring('Sakila', -5, 3);

# 输出ki
select substring('Sakila' from -4 for 2);
```







































