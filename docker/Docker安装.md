# Docker安装

## 一、安装docker

（1）yum包更新到最新

```
sudo yum update
```

（2）安装需要的软件包，yum-utils提供yum-config-manage功能，另外两个是devicemapper驱动以依赖

```
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

（3）设置yum源为阿里云

```
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

（4）安装docker

```
sudo yum install docker-ce
```

（5）安装后查看docker版本

```
docker -v
```

## 二、设置rustic的镜像

rustc是老牌的linux镜像服务提供者，还在遥远的ubuntu5.04版本的时候就在用。ustc的docker镜像加速器速度很快。ustc docker mirror的优势之一就是不需要注册，是真正的公共服务。

https://lug.ustc.edu.cn/wiki/mirrors/help/docker

编辑该文件

```
vi /etc/docker/daemon.json
```

在该文件中输入如下内容：

```
{
  "registry-mirrors": ["https://docker.mirrors.ustc.edu.cn"]
}
```

## 三、Docker的启动与停止

systemctl命令是系统服务管理器指令

启动docker：

```
systemctl start docker
```

停止docker

```
systemctl stop docker
```

重启docker

```
systemctl restart docker
```

查看docker状态

```
systemctl status docker
```

开机启动

```
systemctl enable docker
```

查看docker该要信息

```
docker info
```

查看docker帮助文档

```
docker --help
```

## 四、常用命令

#### 1.查看镜像

```
docker images
```

REPOSITORY：镜像名称

TAG：镜像标签

IMAGE ID：镜像ID

CREATED：镜像创建日期（不是获取该镜像的日期）

SIZE：镜像大小

这些镜像都是存储在Docker宿主机的/var/lib/docker目录下

#### 2.搜索镜像

如果你需要从网络查找需要的镜像，可以通过以下命令搜索

```
docker search 镜像名称
```

NAME：仓库名称

DESCRIPTION：镜像描述

STARS：用户评价，反应一个镜像的受欢迎程度

OFFICAL：是否官方

AUTOMATED：自动构建，表示该镜像由Docker Hub自动构建流程创建的

#### 3.拉取镜像

拉取镜像就是从中央仓库中下载镜像到本地

```
docker pull 镜像名称
```

例如，我要下载centos7镜像

```
docker pull centos:7
```

#### 4.删除镜像

按镜像ID删除镜像

```
docker rmi 镜像ID
```

删除所有镜像

```
docker rmi `docker images -q`
```

## 五、容器相关命令

#### 1.查看容器

查看正在运行容器

```
docker ps
```

查看所有容器

```
docker ps -a
```

查看最后一次运行的容器

```
docker ps -l
```

查看停止的容器

```
docker ps -f status=exited
```



使用容器

```
docker run -it --name=mycentos tutum/centos /bin/bash
```

退出容器

```
exit
```

守护进程启动

```
docker run -d --name=mycentos2 tutum/centos
```

执行守护进程的容器

```
docker exec -it mycentos2 /bin/bash
```



停止容器

```
docker stop 容器名称
```

启动容器

```
docker start 容器名称
```





















