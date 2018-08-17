## 后台服务nosql数据库mongodb

一、选择三台服务器

```
10.221.55.7(主节点)
10.221.55.8(副本节点)
10.221.55.9(副本节点)
```

二、下载mongoldb

```shell
# 下载mongoldb
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.4.7.tgz

# 解压到/data/program/software
tar zxvf mongodb-linux-x86_64-3.4.7.tgz

# 文件夹重命名为mongodb
mv mongodb-linux-x86_64-3.4.7 mongodb

# 进入mongodb目录： 
cd /root/data/program/software/mongodb

# 新建两个文件夹：
mkdir db logs

# 进入bin目录
cd /root/data/program/software/mongodb/bin

# 新建配置文件
touch mongodb.conf
dbpath=/root/data/program/software/mongodb/db
logpath=/root/data/program/software/mongodb/logs/mongodb.log
port=27017
fork=true
```

三、分别三台服务器上启动mongodb

```shell
/root/data/program/software/mongodb/bin/mongod --replSet repset -f /root/data/program/software/mongodb/bin/mongodb.conf
```

四、各个服务器查看，都已经启动

```shell
ps -ef|grep mongodb
```

五、在三台机器上任意一台机器登录mongodb

```shell
/root/data/program/software/mongodb/bin/mongo
```

六、使用admin数据库

```shell
use admin
```

七、定义副本集配置变量，这里_id:"repset"和上面命令参数一致—replSet repset保持一致

```shell
config={
	_id: "repset",
	members: [{_id:0, host:"10.221.55.7:27017"}, {_id:1, host:"10.221.55.8:27017"}, {_id:2, host:"10.221.55.9:27017"}]
}
```





















