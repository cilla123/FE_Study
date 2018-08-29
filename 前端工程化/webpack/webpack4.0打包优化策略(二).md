# webpack4.0打包优化策略(二)

## 区分开发和生产环境

> 通常我们在开发网页时需要区分构建环境

- 开发环境(development) 开发过程中方便开发调试的环境
- 生产环境(production) 发布到线上使用的运行环境

### 通过npm命令区分

通过cross-env模块设置环境变量

> cross-env 跨平台地设置及使用环境变量,而不必担心为平台正确设置或使用环境变量。

```js
npm i cross-env -D
```

### Usage

npm scripts中:

```js
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --mode production",
      "dev": "cross-env NODE_ENV=development webpack-dev-server --mode development",
  }
}
```

执行npm命令切换环境

```shell
npm run build // 生产环境 process.env.NODE_ENV === 'production'
npm run dev // 开发环境 process.env.NODE_ENV === 'development'
```

接下来我们就可以在webpack.config.js 通过process.env.NODE_ENV来得知当前环境标识

### 代码中区分环境

#### 定义环境常量

webpack4以前都是通过DefinePlugin来定义NODE_ENV环境变量，以决定library中应该引用哪些内容。

> NODE_ENV是一个由Node.js暴露给执行脚本的环境变量。通常用于决定在开发环境与生产环境下，服务工具、构建脚本和客户端library的行为。

在webpack.config.js 中添加DefinePlugin插件

```js
const webpack = require('webpack');

plugins: [
  new webpack.DefinePlugn({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  })
]
```

在main.js中通过判断process.env.NODE_ENV常量 来执行相应逻辑

#### mode模式配置

> 在webpack4 增加了mode模式配置 在浏览器环境下指定了 process.env.NODE_ENV 的值，默认是development，但node环境中还是需要cross-env来设置。 mode 是 webpack 4 中新增加的参数选项，其有两个可选值：production 和 development。mode 不可缺省，需要二选一：

##### production 模式：

- 1.生产环境默认开启了很多代码优化（minify，splite等）
- 2.开发时开启注视和验证，并且自动加上了eval devtool
- 3.生产环境不支持watching，开发环境优化了重新打包的速度
- 4.默认开启了Scope hoisting和Tree-shaking（原ModuleConcatenationPlugin）
- 5.自动设置process.env.NODE_ENV到不同环境，也就是不需要DefinePlugin来做这个了
- 6.如果你给mode设置为none，所有默认配置都去掉了
- 7.如果不加这个配置webpack会出现提醒，所以还是加上吧

#### development 模式：

- 1.主要优化了增量构建速度和开发体验
- 2.process.env.NODE_ENV 的值不需要再定义，默认是 development
- 3.开发模式下支持注释和提示，并且支持 eval 下的 source maps

```js
const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV === 'development') { // 开发环境下执行下面代码
  console.log('development', NODE_ENV);
} else { // 生产环境则执行以下环境
  console.log('production', NODE_ENV);
}
```

#### DefinePlugn

> DefinePlugin 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。

### webpack配置中区分环境

在项目目录中添加webpack配置文件

- webpack.base.config.js 保存webpack基础通用的配置的文件
- webpack.dev.config.js  保存webpack开发环境配置的文件
- webpack.prod.config.js 保存webpack生成环境配置的文件
- webpack.config.js webpack执行配置文件 保存相应环境的配置和webpack基础配置文件合并后的配置

### 基础配置 webpack.base.config.js

webpack一些loader配置

```js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HappyPack = require('happypack');
const os = require('os'); // 系统操作函数
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length}); // 指定线程池个数

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // use: 'babel-loader?cacheDirectory'
        use: 'happypack/loader?id=babel', // 缓存loader执行结果
        exclude: /node_modules/, // 排除不要加载的文件夹
        include: path.resolve(__dirname, 'src') // 指定需要加载的文件夹
      }
    ],
    noParse: function(content) { // content 从入口开始解析的模块路径
      return /no-parser/.test(content); // 返回true则忽略对no-parser.js的解析
    }
  },
  resolve: {
    modules: [ // 优化模块查找路径
      resolve('src'),
      resolve('node_modules') // 指定node_modules所在位置 当你import第三方模块式 直接从这个路径下搜寻
    ],
    alias: {
      funs$: resolve('src/util/funs.js')
    },
    extensions: ['.js', '.vue']
  },
  plugins: [
    new webpack.DefinePlugin({ // 定义环境变量
      "process.env": JSON.stringify(process.env.NODE_ENV)
    }),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
      verbose: true
    }),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      title: 'hello webpack!'
    })
  ]
}
```

### 开发配置webpack.dev.config.js

> 开发时的输入输出以及开发调试配置 如 devServer devtool 配置

```js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  devServer: {
    contentBase: resolve('dist'),
    compress: true,
    port: 9000
  }
};
```

### 生成环境webpack.prod.config.js

> 生成环境 进行压缩 代码分离等代码优化 线上配置

```js
const webpack = require('webpack');
const path = require('path');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = {
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require(path.join(__dirname, 'dll', 'react.manifest.json'))
    }),
    new ParallelUglifyPlugin({
      workerCount: 4, // 开启几个子进程去并发的执行压缩，默认是当前电脑的cpu数量减1
      uglifyJS: {
        output: {
          beautify: false, // 不需要格式化
          comments: false // 保留注释
        },
        compress: {
          warnings: false, // Uglifyjs 删除没有代码时，不输出警告
          // drop_console: true, // 删除所有console语句
          collapse_vars: true,
          reduce_vars: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    }),
    new HtmlIncludeAssetsPlugin({
      assets: ['/dll/react.dll.js'],
      append: false
    })
  ]
};
```

### webpack.config.js 配置合并

借助webpack-merge 将base配置和相应环境配置 合并到'webpack.config.js'

```js
npm i webpack-merge -D
```

webpack.config.js

```js
const base = require('./webpack.base.config');
const merge = require('webpack-merge');

let config;
if (process.env.NODE_ENV === 'production') {
  config = require('./webpack.prod.config');
} else {
  config = require('./webpack.dev.config');
}

module.exports = merge(base, config);
```

运行生产配置

```js
npm run build
```

运行开发配置

```js
npm run dev
```

## 实时重新加载(live reloading) 和 模块热替换(HMR)

> webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。

让我们设置以下：

```js
npm i webpack-dev-server -D
```

配置webpack.dev.config.js

```js
devServer: {
    contentBase: path.join(__dirname, 'dist'), // 将 dist 目录下的文件，作为可访问文件。
    compress: true, // 开启Gzip压缩
    port: 9000, // 端口号
    inline: true // 在打包后文件里注入一个websocket客户端
}
```

npm scripts

```js
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --mode development"
  }
}
```

启动server

```js
npm run dev
```

浏览器访问localhost:9000 当修改代码ctrl+s 将自动刷新浏览器

## 启用HMR

> 模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。

配置webpack.dev.config.js

```js
devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    inline: true,
    hot: true // 开启HMR
}
```

注意 此外我们还需添加NamedModulesPlugin 和 HotModuleReplacementPlugin 插件

webpack.dev.config.js

```js
{
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

### 其他代码和框架开启热替换

1.React Hot Loader（实时调整 react 组件）

Install

```js
npm install react-hot-loader
```

Getting started

1.1 Add react-hot-loader/babel to your .babelrc:

```js
// .babelrc

{
  "plugins": ["react-hot-loader/babel"]
}
```

1.2 Mark your root component as hot-exported:

```js
// App.js
import React from 'react'
import { hot } from 'react-hot-loader'

const App = () => <div>Hello World!</div>

export default hot(module)(App)
```

2.Vue loader

> vue-cli 已经集成 只需用vue-cli脚手架开发即可

- [react-hot-loader](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fgaearon%2Freact-hot-loader)
- [vue-loader](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-loader)

### HMR修改样式表

> 借助于style-loader的帮助，CSS的模块热替换实际上是相当简单的。

安装如下loader：

```shell
npm i style-loader css-loader -D
```

### HMR参考配置

- [HMR参考](https://link.juejin.im?target=http%3A%2F%2Fwww.css88.com%2Fdoc%2Fwebpack%2Fguides%2Fhot-module-replacement%2F)