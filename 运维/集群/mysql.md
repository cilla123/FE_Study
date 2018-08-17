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

