# Grunt

## 一、什么是Grunt

Grunt是一个任务管理器，可以使用它来校验Javascript语法、css压缩、Sass编译等一些前端工程化的任务。借用官网的说法就是“对于需要反复重复的任务，例如压缩、编译、单元测试、linting等，自动化工具可以减轻你的劳动，简化你的工作。当你在 Gruntfile 文件正确配置好了任务，任务运行器就会自动帮你或你的小组完成大部分无聊的工作。”

## 二、安装及原理

### 2.1 安装命令

Grunt是基于Node.js运行并通过npm安装和管理的，安装命令如下

```js
npm install -g grunt-cli
```

在安装的时候，可能会遇到权限问题，所以，我们在linux/mac系统上需要

```js
sudo npm install -g grunt-cli
```
windows环境下需要用管理员模式来执行该命令。

### 2.2 原理工作

运行grunt的时候，它就是利用Node.js提供的require方法来找到本地安装的grunt。找到后，脚手架(CLI)加载Grunt，然后通过Gruntfile中的配置信息，执行你自己配置的任务，所以说，一个Grunt管理工具，最重要的是Gruntfile这个文件，因为里面存放着我们的task任务。

Gruntfile文件的主要作用有两个:

- 配置或定义自己的任务task
- 加载grunt插件

### 三、搭建

对于一个新的前端项目搭建，我们会如何配合grunt来做呢？

- 1.首先创建一个文件夹(目录)，例如叫project
- 2.然后进入project的根目录，我们通过```npm init```先把**package.json**这个文件创建起来，新手的话，可以直接一直按回车一直按到创建完毕，以后会详细说这个npm init创建package.json里面的内容究竟有什么用。
- 3.现在在package.json同级目录下（即project的根目录），创建一个名字为Gruntfile.js,然后编写以下代码

```js
module.exports = function(grunt){
	// 插件初始配置信息
	grunt.initConfig({
		// 读取package.json文件
		pkg: grunt.file.readJSON('package.json'),
		// uglify 插件
		uglify: {
			// 配置信息
			options: {
				beaufify: true,	//是否压缩
				mangle: true,		// 是否混淆变量名
				compress: true	// 是否使用默认选项压缩
			},
			// 任务
			app_task: {
				files: {
					'build/app.min.js': ['js/index.js', 'js/test.js']
				}
			}
		}
	})
	
	// 加载指定插件
	grunt.loadNpmTasks('grunt-contrib-uglify')
	// 注册并执行指定任务，这里的uglify就是上面uglify配置项的名称
	grunt.registerTask('default', ['uglify'])
}
```

但是现在执行grunt的话就会报错，为什么呢，因为需要安装Gruntfile当中使用了的插件，例如现在用到了**grunt-contrib-uglify**所以我们需要通过以下命令安装一下。

```js
npm install grunt-contrib-uglify --save-dev
```
这时候**grunt-contrib-uglify**这个名称和对应它的版本会写入到**package.json**

OK！，到了这里就可以去到project的根目录运行**grunt**命令了，如果没有任何参数带上，就是执行default定义的任务。registerTask函数有2个参数，自定义的任务名和任务列表，任务列表就是一个字符串数组，可以指定一个或多个任务。

grunt.registerTask注册完任务后，就可以执行grunt命令了，例如"grunt", "grunt default", "grunt uglify"等。

现在的目录结构就是

```js
project
|__build	// 这里是打包后的文件夹和文件
|	|__app.min.js
|__css
|__js
|  |__index.js
|  |__test.js
|__pages
|__Gruntfile.js
|__package.json

```

### 四、插件介绍

Grunt的插件是有很多的，但是经常用的，就那几个，现在就总结一下，哈。


| 插件名称        | 插件描述   |
| --------- | --------------------------- |
| grunt-contrib-watch | 监控文件有修改的时候，运行指定的任务 |
| grunt-contrib-clean | 删除指定的文件和文件夹 |
| grunt-contrib-copy | 复制指定的文件和文件夹 |
| grunt-contrib-uglify | 使用uglifyJS压缩js文件 |
| grunt-contrib-jshint |  使用JSHint验证Js文件 |
| grunt-contrib-concat | 合并多个文件 |
| grunt-contrib-less | 将Less文件编译成css文件 |
| grunt-contrib-cssmin | 压缩css文件 |

目前这些就是最常用的插件，用在项目上比较多，如果需要的话，可以上官网[http://www.gruntjs.net/plugins](http://www.gruntjs.net/plugins)来查看插件列表。

### 五，总结

Grunt的使用大概就是这样，到这里应该感觉到工程化的魅力，但是本人在实际开发grunt是用得较少，因为有gulp的出现后，grunt我可以说是弃用了，但是为什么我还要介绍grunt呢，其实就想大家对工程化中的任务管理task这个东西有一个了解，因为到了后面gulp的使用，也是和grunt差不多，可能就是一些配置上的写法差异，到这里，希望大家多练习一下，跟着例子，搭建一个属于自己的一个grunt工程化项目，以后就可以复用你自己搭建的工程化项目来进行开发了。
![GruntLogo](https://github.com/cilla123/FE_Study/blob/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/assest/gruntLogo.png?raw=true)
上图就是Grunt的Logo，大家请认识下，以后可以适当的在面试装装逼，哈。


















