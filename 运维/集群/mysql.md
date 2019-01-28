## 后台服务数据库工具mysql：mysql安装

一、yum安装mysql

```shell
yum -y install mysql-server

# 如果是centos7，则先执行以下
# 第一步：安装从网上下载文件的wget命令
yum -y install wget
# 第二步：下载mysql的repo源
wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm 
# 第三步：安装mysql-community-release-el7-5.noarch.rpm包
rpm -ivh mysql-community-release-el7-5.noarch.rpm
# 第四步：查看下
ls -1 /etc/yum.repos.d/mysql-community*
# 第五步：安装mysql
yum -y install mysql-server
```

二、启动mysql服务

```shell
service mysqld start

service mysqld status
```

三、设置mysql的root用户，设置密码

```shell
mysql -u root

# 查看mysql用户和密码
select user_host_password from mysql_user
```

四、忘记密码，或设置密码

```shell
修改MySQL的登录设置： 
# vim /etc/my.cnf
在[mysqld]的段中加上一句：skip-grant-tables
例如：
[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
skip-grant-tables
保存并且退出vi。

重新启动mysqld 
# service mysqld restart
Stopping MySQL: [ OK ]
Starting MySQL: [ OK ]

登录并修改MySQL的root密码 
# mysql
Welcome to the MySQL monitor. Commands end with ; or \g.
Your MySQL connection id is 3 to server version: 3.23.56
Type ‘help;’ or ‘\h’ for help. Type ‘\c’ to clear the buffer.
mysql> USE mysql ;
Database changed
mysql> UPDATE user SET Password = password ( ‘new-password’ ) WHERE User = ‘root’ ;
Query OK, 0 rows affected (0.00 sec)
Rows matched: 2 Changed: 0 Warnings: 0
mysql> flush privileges ;
Query OK, 0 rows affected (0.01 sec)
mysql> quit

将MySQL的登录设置修改回来 
# vim /etc/my.cnf
将刚才在[mysqld]的段中加上的skip-grant-tables删除
保存并且退出vim

重新启动mysqld 
# service mysqld restart
Stopping MySQL: [ OK ]
Starting MySQL: [ OK ]
```

