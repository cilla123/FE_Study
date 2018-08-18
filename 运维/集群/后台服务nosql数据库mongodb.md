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
nohttpinterface=true
```

三、分别三台服务器上启动mongodb

```shell
/root/data/program/software/mongodb/bin/mongod --replSet repset -f /root/data/program/software/mongodb/bin/mongodb.conf

# 假设用了kill -9则要用以下，然后再执行上面的命令
/root/data/program/software/mongodb/bin/mongod --replSet repset -f /root/data/program/software/mongodb/bin/mongodb.conf --repair
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

八、初始化副本集群 

```shell
rs.initiate(config);

# 如果发现不行，则可能需要在阿里云里面设置安全组
# https://ecs-cn-zhangjiakou.console.aliyun.com/#/server/region/cn-zhangjiakou
```

九、查看集群节点的状态 

```shell
rs.status();
```

十、测试集群功能

```shell
# 主节点连接到终端
./mongo 127.0.0.1

# 连接test数据库
use test;

# 往testdb表里插入数据
db.testdb.insert({"test1":"testval1"});

# 在副本节点连接查询
./mongo 10.211.55.7:27107

# 使用test数据库
use test;

# 查询表格,此时会报错，mongodb默认是从主节点读写数据，副本节点上不允许读，设置副本节点可读
show tables;

# 设置副本节点可读，查询复制过来的数据了。
db.getMongo().setSlaveOk();

# 查询数据，{ "_id" : ObjectId("59c3cf8bf21850357d5392ba"), "test1" : "testval1" }
db.testdb.find();

# 测试集群恢复功能，去停掉主节点，然后查看节点状态，发现7和8中有一台变为了PRIMARY，然后再启动主节点观察状态。
```





















