## 版本管理工具gitlab安装以及配置介绍

一、 安装配置依赖项 

```shell
sudo yum install curl openssh-server openssh-clients postfix cronie -y
sudo service postfix start
sudo chkconfig postfix on
sudo yum install lokkit -y
sudo lokkit -s http -s ssh
```

二、添加[GitLab](http://www.21yunwei.com/archives/category/ywtech/codemanage/gitlab)仓库,并安装到服务器上 

```shell
wget https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el6/gitlab-ce-10.1.4-ce.0.el6.x86_64.rpm

# 如果rpm -ivh gitlab-ce-10.1.4-ce.0.el6.x86_64.rpm报错，则先执行以下
yum install policycoreutils-python
rpm -ivh gitlab-ce-10.1.4-ce.0.el6.x86_64.rpm



#启动gitlab
sudo gitlab-ctl reconfigure

# 如果访问http:127.0.0.1:80无法访问，然后用命令查看日志（gitlab-ctl tail #查看所有日志）,返现80端口被占用。
gitlab-ctl tail

# 修改gitlab启动端口
# gitlab本身采用80端口，如安装前服务器有启用80，安装完访问会报错。需更改gitlab的默认端口。
vim /etc/gitlab/gitlab.rb：external_url 'http://10.211.55.8:90'

# 执行sudo gitlab-ctl reconfigure 使之生效，访问如下
sudo gitlab-ctl reconfigure 

gitlab-ctl start|stop|status|restart

# 管理员账户为root，密码首次登陆会让你自己更改。
```

![img](file://localhost/Users/ben/Library/Group%20Containers/UBF8T346G9.Office/msoclip1/01/clip_image002.png) 















