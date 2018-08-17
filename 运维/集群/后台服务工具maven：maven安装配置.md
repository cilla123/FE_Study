## 后台服务工具maven：maven安装配置

一、maven下载

http://archive.apache.org/dist/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz

二、解压配置全局变量

```shell
vim /etc/profile

# 全局变量
/etc/profile
# 用户变量
~/.bash_profile

export M3=/Users/ben/Documents/maven/apache-maven-3.3.9
export PATH=$PATH:$M3/bin

# 验证：
mvn -version
```

