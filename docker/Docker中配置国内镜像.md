# Docker中配置国内镜像

### 一、Docker中国区官方镜像简介

在国内，可以通过registry.docker-cn.com访问官方镜像库，目前该镜像库只包含流行的公有镜像，而私有镜像仍需要从美国镜像库中拉取。

### 二、 配置Docker中国区官方镜像

使用vi修改 /etc/docker/daemon.json 文件并添加上”registry-mirrors”: [“[https://registry.docker-cn.com](https://registry.docker-cn.com/)“]，如下：

```txt
vi /etc/docker/daemon.json 
{ 
	"registry-mirrors": ["https://registry.docker-cn.com"] 
}
```

### 三、重启Docker

配置完之后执行下面的命令，以使docker的配置文件生效

```shell
systemctl daemon-reload 
systemctl restart docker
```







