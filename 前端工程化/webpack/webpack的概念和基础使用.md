# webpack

## 一、webpack的基本概念

webpack 本质上是一个打包工具，它会根据代码的内容解析模块依赖，帮助我们把多个模块的代码打包。借用 webpack 官网的图片：
![webpack图片](http://webpack.github.io/assets/what-is-webpack.png)

如上图，webpack 会把我们项目中使用到的多个代码模块（可以是不同文件类型），打包构建成项目运行仅需要的几个静态文件。webpack 有着十分丰富的配置项，提供了十分强大的扩展能力，可以在打包构建的过程中做很多事情。

### 1.1 入口

如上图所示，在多个代码模块中会有一个起始的 **.js** 文件，这个便是 webpack 构建的**入口**。webpack 会读取这个文件，并从它开始解析依赖，然后进行打包。如图，一开始我们使用 webpack 构建时，默认的入口文件就是 **./src/index.js**。

在我们的项目中，一般就两种，如下：

- 如果是单页面应用，那么可能入口只有一个；
- 如果是多个页面的项目，那么经常是一个页面会对应一个构建入口。

入口可以使用 **entry** 字段来进行配置，webpack 支持配置多个入口来进行构建：

```js

/**************************
** 单页面配置              **
***************************/

// 这里就是一个入口
module.exports = {
  entry: './src/index.js' 
}

// 上述配置等同于
module.exports = {
  entry: {
    main: './src/index.js'
  }
}


/**************************
** 多页面配置              **
***************************/

// 或者配置多个入口
module.exports = {
  entry: {
    foo: './src/page-foo.js',
    bar: './src/page-bar.js', 
    // ...
  }
}

// 使用数组来对多个文件进行打包
module.exports = {
  entry: {
    main: [
      './src/foo.js',
      './src/bar.js'
    ]
  }
}
```

这个例子，可以理解为多个文件作为一个入口，webpack 会解析两个文件的依赖后进行打包。

### 1.2 loader

webpack 中提供一种处理多种文件格式的机制，就是使用 loader。我们可以把 loader 理解为是一个转换器，负责把某种文件格式的内容转换成 webpack 可以支持打包的模块。

举个例子，在没有添加额外插件的情况下，webpack 会默认把所有依赖打包成 js 文件，如果入口文件依赖一个 .hbs 的模板文件以及一个 .css 的样式文件，那么我们需要 handlebars-loader 来处理 .hbs 文件，需要 css-loader 来处理 .css 文件，最终把不同格式的文件都解析成 js 代码，以便打包后在浏览器中运行，简单来说就是如果需要编译一些非html、js、css文件的时候，则需要配置对应文件类型的**loader**进行编译处理。

当我们需要使用不同的 loader 来解析处理不同类型的文件时，我们可以在 module.rules 字段下来配置相关的规则，例如使用 Babel 来处理 .js 文件：

```js
module: {
  // ...
  rules: [
    {
      test: /\.jsx?/, // 匹配文件路径的正则表达式，通常我们都是匹配文件类型后缀
      include: [
        path.resolve(__dirname, 'src') // 指定哪些路径下的文件需要经过 loader 处理
      ],
      use: 'babel-loader', // 指定使用的 loader
    },
  ],
}
```

loader 是 webpack 中比较复杂的一块内容，它支撑着 webpack 来处理文件的多样性。

### 1.3 plugin

在 webpack 的构建流程中，plugin 用于处理更多其他的一些构建任务。可以这么理解，模块代码转换的工作由 loader 来处理，除此之外的其他任何工作都可以交由 plugin 来完成。通过添加我们需要的 plugin，可以满足更多构建中特殊的需求。例如，要使用压缩 JS 代码的 uglifyjs-webpack-plugin 插件，只需在配置中通过 plugins 字段添加新的 **plugin** 即可。

```js
const UglifyPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  plugins: [
    new UglifyPlugin()
  ],
}
```

除了压缩 JS 代码的 uglifyjs-webpack-plugin，常用的还有定义环境变量的 DefinePlugin，生成 CSS 文件的 ExtractTextWebpackPlugin 等。

plugin 理论上可以干涉 webpack 整个构建流程，可以在流程的每一个步骤中定制自己的构建需求。

### 1.4 输出

webpack 的输出即指 webpack 最终构建出来的静态文件，可以看看上面 webpack 官方图片右侧的那些文件。当然，构建结果的文件名、路径等都是可以配置的，使用 output 字段：

```js
module.exports = {
  // ...
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
}

// 或者多个入口生成不同文件
module.exports = {
  entry: {
    foo: './src/foo.js',
    bar: './src/bar.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
}

// 路径中使用 hash，每次构建时会有一个不同 hash 值，避免发布新版本时线上使用浏览器缓存
module.exports = {
  // ...
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/[hash]',
  },
}
```

我们一开始直接使用 webpack 构建时，默认创建的输出内容就是 ./dist/main.js。

## 二、一个简单的 webpack 配置

我们把上述涉及的几部分配置内容合到一起，就可以创建一个简单的 webpack 配置了，webpack 运行时默认读取项目下的 webpack.config.js 文件作为配置。

所以我们在项目中创建一个 webpack.config.js 文件：

```js
const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader',
      },
    ],
  },

  // 代码模块路径解析的配置
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src')
    ],

    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
  },

  plugins: [
    new UglifyPlugin(), 
    // 使用 uglifyjs-webpack-plugin 来压缩 JS 代码
    // 如果你留意了我们一开始直接使用 webpack 构建的结果，你会发现默认已经使用了 JS 代码压缩的插件
    // 这其实也是我们命令中的 --mode production 的效果，后续的小节会介绍 webpack 的 mode 参数
  ],
}
```

webpack 的配置其实是一个 Node.js 的脚本，这个脚本对外暴露一个配置对象，webpack 通过这个对象来读取相关的一些配置。因为是 Node.js 脚本，所以可玩性非常高，你可以使用任何的 Node.js 模块，如上述用到的 path 模块，当然第三方的模块也可以。

创建了 webpack.config.js 后再执行 webpack 命令，webpack 就会使用这个配置文件的配置了。

有的时候我们开始一个新的前端项目，并不需要从零开始配置 webpack，而可以使用一些工具来帮助快速生成 webpack 配置,或者利用别人已经写好的webpack配置文件即可。

## 三、搭建基本的前端开发环境

我们日常使用的前端开发环境应该是怎样的？我们可以尝试着把基本前端开发环境的需求列一下：

- 构建我们发布需要的 HTML、CSS、JS 文件
- 使用 CSS 预处理器来编写样式
- 处理和压缩图片
- 使用 Babel 来支持 ES6/7/8 新特性
- 本地提供静态服务以方便开发调试

### 3.1 关联 HTML

webpack 默认从作为入口的 .js 文件进行构建（更多是基于 SPA 去考虑），但通常一个前端项目都是从一个页面（即 HTML）出发的，最简单的方法是，创建一个 HTML 文件，使用 script 标签直接引用构建好的 JS 文件，如：

```html
<script src="./dist/bundle.js"></script>
```

但是，如果我们的文件名或者路径会变化，例如使用 [hash] 来进行命名，那么最好是将 HTML 引用路径和我们的构建结果关联起来，这个时候我们可以使用 **html-webpack-plugin**。

**html-webpack-plugin** 是一个独立的 node package，所以在使用之前我们需要先安装它，把它安装到项目的开发依赖中：

```js
npm install html-webpack-plugin -D 

# 或者
yarn add html-webpack-plugin -D
```

然后在 webpack 配置中，将 html-webpack-plugin 添加到 plugins 列表中：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin(),
  ],
}
```

这样配置好之后，构建时 **html-webpack-plugin** 会为我们创建一个 HTML 文件，其中会引用构建出来的 JS 文件。实际项目中，默认创建的 HTML 文件并没有什么用，我们需要自己来写 HTML 文件，可以通过 html-webpack-plugin 的配置，传递一个写好的 HTML 模板：

```js
module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'assets/index.html', // 配置文件模板
    }),
  ],
}
```

这样，通过 html-webpack-plugin 就可以将我们的页面和构建 JS 关联起来，回归日常，从页面开始开发。如果需要添加多个页面关联，那么实例化多个 html-webpack-plugin， 并将它们都放到 plugins 字段数组中就可以了。

### 3.2 构建 CSS

我们编写 CSS，并且希望使用 webpack 来进行构建，为此，需要在配置中引入 loader 来解析和处理 CSS 文件：

```js
module.exports = {
  module: {
    rules: [
      // style-loader 和 css-loader 都是单独的 node package，需要安装。
      {
        test: /\.css/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  }
}
```

我们创建一个 index.css 文件，并在 index.js 中引用它，然后进行构建。

```js
import "./index.css"
```

可以发现，构建出来的文件并没有 CSS，先来看一下新增两个 loader 的作用：

- css-loader 负责解析 CSS 代码，主要是为了处理 CSS 中的依赖，例如 @import 和 url() 等引用外部文件的声明；
- style-loader 会将 css-loader 解析的结果转变成 JS 代码，运行时动态插入 style 标签来让 CSS 代码生效。

经由上述两个 loader 的处理后，CSS 代码会转变为 JS，和 index.js 一起打包了。如果需要单独把 CSS 文件分离出来，我们需要使用 extract-text-webpack-plugin 插件。

extract-text-webpack-plugin 这个插件在笔者写作时并未发布支持 webpack 4.x 的正式版本，所以安装的时候需要指定使用它的 alpha 版本：**npm install extract-text-webpack-plugin@next -D** 或者 **yarn add extract-text-webpack-plugin@next -D**。如果你用的是 webpack 3.x 版本，直接用 **extract-text-webpack-plugin** 现有的版本即可。

看一个简单的例子：

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
        use: ExtractTextPlugin.extract({ 
          fallback: 'style-loader',
          use: 'css-loader',
        }), 
      },
    ],
  },
  plugins: [
    // 引入插件，配置文件名，这里同样可以使用 [hash]
    new ExtractTextPlugin('index.css'),
  ],
}
```

### 3.3 CSS 预处理器

在上述使用 CSS 的基础上，通常我们会使用 Less/Sass 等 CSS 预处理器，webpack 可以通过添加对应的 loader 来支持，以使用 Less 为例，我们可以在官方文档中找到对应的 loader。

我们需要在上面的 webpack 配置中，添加一个配置来支持解析后缀为 .less 的文件：

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.less$/,
        // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
        use: ExtractTextPlugin.extract({ 
          fallback: 'style-loader',
          use: [
            'css-loader', 
            'less-loader',
          ],
        }), 
      },
    ],
  },
  // ...
}
```

### 3.4 处理图片文件

在前端项目的样式中总会使用到图片，虽然我们已经提到 css-loader 会解析样式中用 url() 引用的文件路径，但是图片对应的 jpg/png/gif 等文件格式，webpack 处理不了。是的，我们只要添加一个处理图片的 loader 配置就可以了，现有的 file-loader 就是个不错的选择。

file-loader 可以用于处理很多类型的文件，它的主要作用是直接输出文件，把构建后的文件路径返回。配置很简单，在 rules中添加一个字段，增加图片类型文件的解析配置：

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
}
```

### 3.5 使用 Babel

**Babel** 是一个让我们能够使用 ES 新特性的 JS 编译工具，我们可以在 webpack 中配置 Babel，以便使用 ES6、ES7 标准来编写 JS 代码。

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.jsx?/, // 支持 js 和 jsx
        include: [
          path.resolve(__dirname, 'src'), // src 目录下的才需要经过 babel-loader 处理
        ],
        loader: 'babel-loader',
      },
    ],
  },
}
```

Babel 的相关配置可以在目录下使用 **.babelrc** 文件来处理，详细参考 Babel 官方文档 **.babelrc**。

### 3.6 启动静态服务

至此，我们完成了处理多种文件类型的 webpack 配置。我们可以使用 webpack-dev-server 在本地开启一个简单的静态服务来进行开发。

在项目下安装 **webpack-dev-server**，然后添加启动命令到 package.json 中：

```json
"scripts": {
  "build": "webpack --mode production",
  "start": "webpack-dev-server --mode development"
}
```

```
也可以全局安装 webpack-dev-server，但通常建议以项目开发依赖的方式进行安装，然后在 npm package 中添加启动脚本。
```

尝试着运行 npm run start 或者 yarn start，然后就可以访问 http://localhost:8080/ 来查看你的页面了。默认是访问 index.html，如果是其他页面要注意访问的 URL 是否正确。

### 四、webpack 如何解析代码模块路径

在 webpack 支持的前端代码模块化中，我们可以使用类似 **import * as m from './index.js'** 来引用代码模块 index.js。

引用第三方类库则是像这样：**import React from 'react'**。webpack 构建的时候，会解析依赖后，然后再去加载依赖的模块文件，那么 webpack 如何将上述编写的 ./index.js 或 react 解析成对应的模块文件路径呢？

```
在 JavaScript 中尽量使用 ECMAScript 2015 Modules 语法来引用依赖。
```

webpack 中有一个很关键的模块 **enhanced-resolve** 就是处理依赖模块路径的解析的，这个模块可以说是 Node.js 那一套模块路径解析的增强版本，有很多可以自定义的解析配置。

### 五、模块解析规则

我们简单整理一下基本的模块解析规则，以便更好地理解后续 webpack 的一些配置会产生的影响。

- 解析相对路径
	- 1.查找相对当前模块的路径下是否有对应文件或文件夹
	- 2.是文件则直接加载
	- 3.是文件夹则继续查找文件夹下的 package.json 文件
	- 4.有 package.json 文件则按照文件中 main 字段的文件名来查找文件
	- 5.无 package.json 或者无 main 字段则查找 index.js 文件
- 解析模块名：查找当前文件目录下，父级目录及以上目录下的 node_modules 文件夹，看是否有对应名称的模块
- 解析绝对路径（不建议使用）：直接查找对应路径的文件

在 webpack 配置中，和模块路径解析相关的配置都在 resolve 字段下：

```js
module.exports = {
  resolve: {
    // ...
  }
}
```

## 六、常用的一些配置

我们先从一些简单的需求来阐述 webpack 可以支持哪些解析路径规则的自定义配置。

### 6.1 resolve.alias

假设我们有个 utils 模块极其常用，经常编写相对路径很麻烦，希望可以直接 import 'utils' 来引用，那么我们可以配置某个模块的别名，如：

```js
alias: {
  // 这里使用 path.resolve 和 __dirname 来获取绝对路径
  utils: path.resolve(__dirname, 'src/utils') 
}
```

上述的配置是模糊匹配，意味着只要模块路径中携带了 utils 就可以被替换掉，如：

```js
// 等同于 import '[项目绝对路径]/src/utils/query.js'
import 'utils/query.js' 
```

如果需要进行精确匹配可以使用：

```js
alias: {
  // 只会匹配 import 'utils'
  utils$: path.resolve(__dirname, 'src/utils') 
}
```

### 6.2 resolve.extensions

```js
extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
// 这里的顺序代表匹配后缀的优先级，例如对于 index.js 和 index.jsx，会优先选择 index.js
```

看到数组中配置的字符串大概就可以猜到，这个配置的作用是和文件后缀名有关的。是的，这个配置可以定义在进行模块路径解析时，webpack 会尝试帮你补全那些后缀名来进行查找，例如有了上述的配置，当你在 src/utils/ 目录下有一个 common.js 文件时，就可以这样来引用：

```js
import * as common from './src/utils/common'
```

webpack 会尝试给你依赖的路径添加上 extensions 字段所配置的后缀，然后进行依赖路径查找，所以可以命中 src/utils/common.js 文件。

但如果你是引用 src/styles 目录下的 common.css 文件时，如 import './src/styles/common'，webpack 构建时则会报无法解析模块的错误。

你可以在引用时添加后缀，import './src/styles/common.css' 来解决，或者在 extensions 添加一个 .css 的配置：

```js
extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.css'],	
```

### 6.3 resolve.modules

前面的内容有提到，对于直接声明依赖名的模块（如 react ），webpack 会类似 Node.js 一样进行路径搜索，搜索 node_modules 目录，这个目录就是使用 resolve.modules 字段进行配置的，默认就是：

```js
resolve: {
  modules: ['node_modules'],
},
```

通常情况下，我们不会调整这个配置，但是如果可以确定项目内所有的第三方依赖模块都是在项目根目录下的 node_modules 中的话，那么可以在 node_modules 之前配置一个确定的绝对路径：

```js
resolve: {
  modules: [
    path.resolve(__dirname, 'node_modules'), // 指定当前目录下的 node_modules 优先查找
    'node_modules', // 如果有一些类库是放在一些奇怪的地方的，你可以添加自定义的路径或者目录
  ],
}
```

这样配置在某种程度上可以简化模块的查找，提升构建速度。

### 6.4 resolve.mainFields

```js
有 package.json 文件则按照文件中 main 字段的文件名来查找文件
```

我们之前有提到这么一句话，其实确切的情况并不是这样的，webpack 的 resolve.mainFields 配置可以进行调整。当引用的是一个模块或者一个目录时，会使用 package.json 文件的哪一个字段下指定的文件，默认的配置是这样的：

```js
resolve: {
  // 配置 target === "web" 或者 target === "webworker" 时 mainFields 默认值是：
  mainFields: ['browser', 'module', 'main'],

  // target 的值为其他时，mainFields 默认值为：
  mainFields: ["module", "main"],
}
```

因为通常情况下，模块的 package 都不会声明 browser 或 module 字段，所以便是使用 main 了。

在 NPM packages 中，会有些 package 提供了两个实现，分别给浏览器和 Node.js 两个不同的运行时使用，这个时候就需要区分不同的实现入口在哪里。如果你有留意一些社区开源模块的 package.json 的话，你也许会发现 browser 或者 module 等字段的声明。

### 6.5 resolve.mainFiles

当目录下没有 package.json 文件时，我们说会默认使用目录下的 index.js 这个文件，其实这个也是可以配置的，是的，使用 resolve.mainFiles 字段，默认配置是：

```js
resolve: {
  mainFiles: ['index'], // 你可以添加其他默认使用的文件名
},
```

通常情况下我们也无须修改这个配置，index.js 基本就是约定好了。

### 6.6 resolve.resolveLoader

这个字段 resolve.resolveLoader 用于配置解析 loader 时的 resolve 配置，原本 resolve 的配置项在这个字段下基本都有。我们看下默认的配置：

```js
resolve: {
  resolveLoader: {
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main'],
  },
},
```

这里提供的配置相对少用，我们一般遵从标准的使用方式，使用默认配置，然后把 loader 安装在项目根路径下的 node_modules 下就可以了。

## 七、配置loader

### 7.1 loader 匹配规则

当我们需要配置 loader 时，都是在 **module.rules** 中添加新的配置项，在该字段中，每一项被视为一条匹配使用 loader 的规则。

先来看一个基础的例子：

```js
module.exports = {
  // ...
  module: {
    rules: [ 
      {
        test: /\.jsx?/, // 条件
        include: [ 
          path.resolve(__dirname, 'src'),
        ], // 条件
        use: 'babel-loader', // 规则应用结果
      }, // 一个 object 即一条规则
      // ...
    ],
  },
}
```

loader 的匹配规则中有两个最关键的因素：一个是匹配条件，一个是匹配规则后的应用。

匹配条件通常都使用请求资源文件的绝对路径来进行匹配，在官方文档中称为 resource，除此之外还有比较少用到的 issuer，则是声明依赖请求的源文件的绝对路径。举个例子：在 /path/to/app.js 中声明引入 import './src/style.scss'，resource 是 /path/to/src/style.scss，issuer 是 /path/to/app.js，规则条件会对这两个值来尝试匹配。

上述代码中的 test 和 include 都用于匹配 resource 路径，是 resource.test 和 resource.include 的简写，你也可以这么配置：

```js
module.exports = {
  // ...
  rules: [ 
      {
        resource: { // resource 的匹配条件
          test: /\.jsx?/, 
          include: [ 
            path.resolve(__dirname, 'src'),
          ],
        },
        // 如果要使用 issuer 匹配，便是 issuer: { test: ... }
        use: 'babel-loader',
      },
      // ...
    ], 
}
```

```
issuer 规则匹配的场景比较少见，你可以用它来尝试约束某些类型的文件中只能引用某些类型的文件。
```

当规则的条件匹配时，便会使用对应的 loader 配置，如上述例子中的 babel-loader。

### 7.2 规则条件配置

大多数情况下，配置 loader 的匹配条件时，只要使用 test 字段就好了，很多时候都只需要匹配文件后缀名来决定使用什么 loader，但也不排除在某些特殊场景下，我们需要配置比较复杂的匹配条件。webpack 的规则提供了多种配置形式：

- { test: ... } 匹配特定条件
- { include: ... } 匹配特定路径
- { exclude: ... } 排除特定路径
- { and: [...] }必须匹配数组中所有条件
- { or: [...] } 匹配数组中任意一个条件
- { not: [...] } 排除匹配数组中所有条件

上述的所谓条件的值可以是：

- 字符串：必须以提供的字符串开始，所以是字符串的话，这里我们需要提供绝对路径
- 正则表达式：调用正则的 test 方法来判断匹配
- 函数：(path) => boolean，返回 true 表示匹配
- 数组：至少包含一个条件的数组
- 对象：匹配所有属性值的条件

通过例子来帮助理解：

```js
rules: [
  {
    test: /\.jsx?/, // 正则
    include: [
      path.resolve(__dirname, 'src'), // 字符串，注意是绝对路径
    ], // 数组
    // ...
  },
  {
    test: {
      js: /\.js/,
      jsx: /\.jsx/,
    }, // 对象，不建议使用
    not: [
      (value) => { /* ... */ return true; }, // 函数，通常需要高度自定义时才会使用
    ],
  },
]
```

上述多个配置形式结合起来就能够基本满足各种各样的构建场景了，通常我们会结合使用 test/and 和 include&exclude 来配置条件，如上述那个简单的例子。

### 7.3 module type

webpack 4.x 版本强化了 module type，即模块类型的概念，不同的模块类型类似于配置了不同的 loader，webpack 会有针对性地进行处理，现阶段实现了以下 5 种模块类型。

- javascript/auto：即 webpack 3 默认的类型，支持现有的各种 JS 代码模块类型 —— CommonJS、AMD、ESM
- javascript/esm：ECMAScript modules，其他模块系统，例如 CommonJS 或者 AMD 等不支持，是 .mjs 文件的默认类型
- javascript/dynamic：CommonJS 和 AMD，排除 ESM
- javascript/json：JSON 格式数据，require 或者 import 都可以引入，是 .json 文件的默认类型
- webassembly/experimental：WebAssembly modules，当前还处于试验阶段，是 .wasm 文件的默认类型

如果不希望使用默认的类型的话，在确定好匹配规则条件时，我们可以使用 type 字段来指定模块类型，例如把所有的 JS 代码文件都设置为强制使用 ESM 类型：

```js
{
  test: /\.js/,
  include: [
    path.resolve(__dirname, 'src'),
  ],
  type: 'javascript/esm', // 这里指定模块类型
},
```

上述做法是可以帮助你规范整个项目的模块系统，但是如果遗留太多不同类型的模块代码时，建议还是直接使用默认的 javascript/auto。

webpack 后续的开发计划会增加对更多模块类型的支持，例如极其常见的 CSS 和 HTML 模块类型，这个特性值得我们期待一下。

### 7.4 使用 loader 配置

当然，在当前版本的 webpack 中，module.rules 的匹配规则最重要的还是用于配置 loader，我们可以使用 use 字段：

```js
rules: [
  {
    test: /\.less/,
    use: [
      'style-loader', // 直接使用字符串表示 loader
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        },
      }, // 用对象表示 loader，可以传递 loader 配置等
      {
        loader: 'less-loader',
        options: {
          noIeCompat: true
        }, // 传递 loader 配置
      },
    ],
  },
]
```

我们看下上述的例子，先忽略 loader 的使用情况，单纯看看如何配置。use 字段可以是一个数组，也可以是一个字符串或者表示 loader 的对象。如果只需要一个 loader，也可以这样：use: { loader: 'babel-loader', options: { ... } }。

我们还可以使用 options 给对应的 loader 传递一些配置项。

### 7.5 loader 应用顺序

一个匹配规则中可以配置使用多个 loader，即一个模块文件可以经过多个 loader 的转换处理，执行顺序是从最后配置的 loader 开始，一步步往前。例如，对于上面的 less 规则配置，一个 style.less 文件会途径 less-loader、css-loader、style-loader 处理，成为一个可以打包的模块。

loader 的应用顺序在配置多个 loader 一起工作时很重要，通常会使用在 CSS 配置上，除了 style-loader 和 css-loader，你可能还要配置 less-loader 然后再加个 postcss 的 autoprefixer 等。

上述从后到前的顺序是在同一个 rule 中进行的，那如果多个 rule 匹配了同一个模块文件，loader 的应用顺序又是怎样的呢？看一份这样的配置：

```js
rules: [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "eslint-loader",
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader",
  },
]
```

这样无法法保证 eslint-loader 在 babel-loader 应用前执行。webpack 在 rules 中提供了一个 enforce 的字段来配置当前 rule 的 loader 类型，没配置的话是普通类型，我们可以配置 pre 或 post，分别对应前置类型或后置类型的 loader。

eslint-loader 要检查的是人工编写的代码，如果在 babel-loader 之后使用，那么检查的是 Babel 转换后的代码，所以必须在 babel-loader 处理之前使用。

还有一种行内 loader，即我们在应用代码中引用依赖时直接声明使用的 loader，如 const json = require('json-loader!./file.json') 这种。不建议在应用开发中使用这种 loader，后续我们还会再提到。

顾名思义，所有的 loader 按照前置 -> 行内 -> 普通 -> 后置的顺序执行。所以当我们要确保 eslint-loader 在 babel-loader 之前执行时，可以如下添加 enforce 配置：

```js
rules: [
  {
    enforce: 'pre', // 指定为前置类型
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "eslint-loader",
  },
]
```

当项目文件类型和应用的 loader 不是特别复杂的时候，通常建议把要应用的同一类型 loader 都写在同一个匹配规则中，这样更好维护和控制。

## 7.6 使用 noParse

在 webpack 中，我们需要使用的 loader 是在 module.rules 下配置的，webpack 配置中的 module 用于控制如何处理项目中不同类型的模块。

除了 module.rules 字段用于配置 loader 之外，还有一个 module.noParse 字段，可以用于配置哪些模块文件的内容不需要进行解析。对于一些不需要解析依赖（即无依赖） 的第三方大型类库等，可以通过这个字段来配置，以提高整体的构建速度。

```
使用 noParse 进行忽略的模块文件中不能使用 import、require、define 等导入机制。
```

```js
module.exports = {
  // ...
  module: {
    noParse: /jquery|lodash/, // 正则表达式

    // 或者使用 function
    noParse(content) {
      return /jquery|lodash/.test(content)
    },
  }
}
```

noParse 从某种程度上说是个优化配置项，日常也可以不去使用。

## 8.使用 plugin

webpack 中的 plugin 大多都提供额外的能力，它们在 webpack 中的配置都只是把插件实例添加到 plugins 字段的数组中。不过由于需要提供不同的功能，不同的插件本身的配置比较多样化。

### 8.1 DefinePlugin

DefinePlugin 是 webpack 内置的插件，可以使用webpack.DefinePlugin 直接获取。

这个插件用于创建一些在编译时可以配置的全局常量，这些常量的值我们可以在 webpack 的配置中去指定，例如：

```js
module.exports = {
  // ...
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true), // const PRODUCTION = true
      VERSION: JSON.stringify('5fa3b9'), // const VERSION = '5fa3b9'
      BROWSER_SUPPORTS_HTML5: true, // const BROWSER_SUPPORTS_HTML5 = 'true'
      TWO: '1+1', // const TWO = 1 + 1,
      CONSTANTS: {
        APP_VERSION: JSON.stringify('1.1.2') // const CONSTANTS = { APP_VERSION: '1.1.2' }
      }
    }),
  ],
}
```

有了上面的配置，就可以在应用代码文件中，访问配置好的变量了，如：

```js
console.log("Running App version " + VERSION);

if(!BROWSER_SUPPORTS_HTML5) require("html5shiv");
```

上面配置的注释已经简单说明了这些配置的效果，这里再简述一下整个配置规则。

- 如果配置的值是字符串，那么整个字符串会被当成代码片段来执行，其结果作为最终变量的值，如上面的 "1+1"，最后的结果是 2
- 如果配置的值不是字符串，也不是一个对象字面量，那么该值会被转为一个字符串，如 true，最后的结果是 'true'
- 如果配置的是一个对象字面量，那么该对象的所有 key 会以同样的方式去定义

这样我们就可以理解为什么要使用 JSON.stringify() 了，因为 JSON.stringify(true) 的结果是 'true'，JSON.stringify("5fa3b9") 的结果是 "5fa3b9"。

社区中关于 DefinePlugin 使用得最多的方式是定义环境变量，例如 PRODUCTION = true 或者 __DEV__ = true 等。部分类库在开发环境时依赖这样的环境变量来给予开发者更多的开发调试反馈，例如 react 等。

```
建议使用 process.env.NODE_ENV: ... 的方式来定义 process.env.NODE_ENV，而不是使用 process: { env: { NODE_ENV: ... } } 的方式，因为这样会覆盖掉 process 这个对象，可能会对其他代码造成影响。
```

## 8.2 copy-webpack-plugin

这个插件看名字就知道它有什么作用，没错，就是用来复制文件的。

我们一般会把开发的所有源码和资源文件放在 src/ 目录下，构建的时候产出一个 build/ 目录，通常会直接拿 build 中的所有文件来发布。有些文件没经过 webpack 处理，但是我们希望它们也能出现在 build 目录下，这时就可以使用 CopyWebpackPlugin 来处理了。

我们来看下如何配置这个插件：

```js
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/file.txt', to: 'build/file.txt', }, // 顾名思义，from 配置来源，to 配置目标路径
      { from: 'src/*.ico', to: 'build/*.ico' }, // 配置项可以使用 glob
      // 可以配置很多项复制规则
    ]),
  ],
}
```

### 8.3 extract-text-webpack-plugin

extract-text-webpack-plugin 之前的章节有简单介绍过，我们用它来把依赖的 CSS 分离出来成为单独的文件。这里再看一下使用 extract-text-webpack-plugin 的配置：

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
        use: ExtractTextPlugin.extract({ 
          fallback: 'style-loader',
          use: 'css-loader',
        }), 
      },
    ],
  },
  plugins: [
    // 引入插件，配置文件名，这里同样可以使用 [hash]
    new ExtractTextPlugin('index.css'),
  ],
}
```

在上述的配置中，我们使用了 index.css 作为单独分离出来的文件名，但有的时候构建入口不止一个，extract-text-webpack-plugin 会为每一个入口创建单独分离的文件，因此最好这样配置：

```js
plugins: [
  new ExtractTextPlugin('[name].css'),
],
```

这样确保在使用多个构建入口时，生成不同名称的文件。

这里再次提及 extract-text-webpack-plugin，一个原因是它是一个蛮常用的插件，另一个原因是它的使用方式比较特别，除了在 plugins 字段添加插件实例之外，还需要调整 loader 对应的配置。

在这里要强调的是，在 webpack 中，loader 和 plugin 的区分是很清楚的，针对文件模块转换要做的使用 loader，而其他干涉构建内容的可以使用 plugin。 ExtractTextWebpackPlugin 既提供了 plugin，也提供了 extract 方法来获取对应需要的 loader。

### 8.4 ProvidePlugin

ProvidePlugin 也是一个 webpack 内置的插件，我们可以直接使用 webpack.ProvidePlugin 来获取。

该组件用于引用某些模块作为应用运行时的变量，从而不必每次都用 require 或者 import，其用法相对简单：

```js
new webpack.ProvidePlugin({
  identifier: 'module',
  // ...
})

// 或者
new webpack.ProvidePlugin({
  identifier: ['module', 'property'], // 即引用 module 下的 property，类似 import { property } from 'module'
  // ...
})
```

在你的代码中，当 identifier 被当作未赋值的变量时，module 就会被自动加载了，而 identifier 这个变量即 module 对外暴露的内容。

注意，如果是 ES 的 default export，那么你需要指定模块的 default 属性：identifier: ['module', 'default'],。


### 8.5 IgnorePlugin

IgnorePlugin 和 ProvidePlugin 一样，也是一个 webpack 内置的插件，可以直接使用 webpack.IgnorePlugin 来获取。

这个插件用于忽略某些特定的模块，让 webpack 不把这些指定的模块打包进去。例如我们使用 moment.js，直接引用后，里边有大量的 i18n 的代码，导致最后打包出来的文件比较大，而实际场景并不需要这些 i18n 的代码，这时我们可以使用 IgnorePlugin 来忽略掉这些代码文件，配置如下：

```js
module.exports = {
  // ...
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
```

IgnorePlugin 配置的参数有两个，第一个是匹配引入模块路径的正则表达式，第二个是匹配模块的对应上下文，即所在目录名。

## 九、更好地使用 webpack-dev-server

在构建代码并部署到生产环境之前，我们需要一个本地环境，用于运行我们开发的代码。这个环境相当于提供了一个简单的服务器，用于访问 webpack 构建好的静态文件，我们日常开发时可以使用它来调试前端代码。

### 9.1 webpack-dev-server 的基础使用

webpack-dev-server 是一个 npm package，安装后在已经有 webpack 配置文件的项目目录下直接启动就可以：

```js
npm install webpack-dev-server -g
webpack-dev-server --mode development 
```

webpack-dev-server 本质上也是调用 webpack，4.x 版本的也要指定 mode，其实 webpack-dev-server 应该直接把 development 作为默认值。

建议把 webpack-dev-server 作为开发依赖安装，然后使用 npm scripts 来启动，如：

```js
npm install webpack-dev-server --save-dev
```

package 中的 scripts 配置：

```js
{
  // ...
  "scripts": {
    "start": "webpack-dev-server --mode development"
  }
}
```

```js
npm run start
```

webpack-dev-server 默认使用 8080 端口，如果你使用了 html-webpack-plugin 来构建 HTML 文件，并且有一个 index.html 的构建结果，那么直接访问 http://localhost:8080/ 就可以看到 index.html 页面了。如果没有 HTML 文件的话，那么 webpack-dev-server 会生成一个展示静态资源列表的页面。

### 9.2 webpack-dev-server 的配置

在 webpack 的配置中，可以通过 devServer 字段来配置 webpack-dev-server，如端口设置、启动 gzip 压缩等，这里简单讲解几个常用的配置。

public 字段用于指定静态服务的域名，默认是 http://localhost:8080/ ，当你使用 Nginx 来做反向代理时，应该就需要使用该配置来指定 Nginx 配置使用的服务域名。

port 字段用于指定静态服务的端口，如上，默认是 8080，通常情况下都不需要改动。

publicPath 字段用于指定构建好的静态文件在浏览器中用什么路径去访问，默认是 /，例如，对于一个构建好的文件 bundle.js，完整的访问路径是 http://localhost:8080/bundle.js，如果你配置了 publicPath: 'assets/'，那么上述 bundle.js 的完整访问路径就是 http://localhost:8080/assets/bundle.js。可以使用整个 URL 来作为 publicPath 的值，如 publicPath: 'http://localhost:8080/assets/'。如果你使用了 HMR，那么要设置 publicPath 就必须使用完整的 URL。

```js
建议将 devServer.publicPath 和 output.publicPath 的值保持一致。
```

proxy 用于配置 webpack-dev-server 将特定 URL 的请求代理到另外一台服务器上。当你有单独的后端开发服务器用于请求 API 时，这个配置相当有用。例如：

```js
proxy: {
  '/api': {
    target: "http://localhost:3000", // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
    pathRewrite: { '^/api': '' }, // 把 URL 中 path 部分的 `api` 移除掉
  },
}
```

webpack-dev-server 的 proxy 功能是使用 http-proxy-middleware 来实现的。

contentBase 用于配置提供额外静态文件内容的目录，之前提到的 publicPath 是配置构建好的结果以什么样的路径去访问，而 contentBase 是配置额外的静态文件内容的访问路径，即那些不经过 webpack 构建，但是需要在 webpack-dev-server 中提供访问的静态资源（如部分图片等）。推荐使用绝对路径：

```js
// 使用当前目录下的 public
contentBase: path.join(__dirname, "public") 

// 也可以使用数组提供多个路径
contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")]
```

```js
publicPath 的优先级高于 contentBase。
```

before 和 after 配置用于在 webpack-dev-server 定义额外的中间件，如

```js
before(app){
  app.get('/some/path', function(req, res) { // 当访问 /some/path 路径时，返回自定义的 json 数据
    res.json({ custom: 'response' })
  })
}
```

before 在 webpack-dev-server 静态资源中间件处理之前，可以用于拦截部分请求返回特定内容，或者实现简单的数据 mock。

after 在 webpack-dev-server 静态资源中间件处理之后，比较少用到，可以用于打印日志或者做一些额外处理。

webpack-dev-server 的配置项比较多，这里只列举了一些日常比较有用的。

### 9.3 webpack-dev-middleware

如果你熟悉使用 Node.js 来开发 Web 服务，使用过 Express 或者 Koa，那么对中间件的概念应该会有所了解。

简而言之，中间件就是在 Express 之类的 Web 框架中实现各种各样功能（如静态文件访问）的这一部分函数。多个中间件可以一起协同构建起一个完整的 Web 服务器。

webpack-dev-middleware 就是在 Express 中提供 webpack-dev-server 静态服务能力的一个中间件，我们可以很轻松地将其集成到现有的 Express 代码中去，就像添加一个 Express 中间件那么简单。

首先安装 webpack-dev-middleware 依赖：

```js
npm install webpack-dev-middleware --save-dev
```

接着创建一个 Node.js 服务的脚本文件，如 app.js：

```js
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const webpackOptions = require('./webpack.config.js') // webpack 配置文件的路径

// 本地的开发环境默认就是使用 development mode
webpackOptions.mode = 'development'

const compiler = webpack(webpackOptions)
const express = require('express')
const app = express()

app.use(middleware(compiler, {
  // webpack-dev-middleware 的配置选项
}))

// 其他 Web 服务中间件
// app.use(...)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
```

然后用 Node.js 运行该文件即可：

```js
node app.js # 使用刚才创建的 app.js 文件
```

使用 webpack-dev-server 的好处是相对简单，直接安装依赖后执行命令即可，而使用 webpack-dev-middleware 的好处是可以在既有的 Express 代码基础上快速添加 webpack-dev-server 的功能，同时利用 Express 来根据需要添加更多的功能，如 mock 服务、代理 API 请求等。

其实 webpack-dev-server 也是基于 Express 开发的，前面提及的 webpack-dev-server 中 before 或 after 的配置字段，也可以用于编写特定的中间件来根据需要添加额外的功能。

### 9.4 实现一个简单的 mock 服务

在前端的日常开发工作中，我们本地需要的不仅仅是提供静态内容访问的服务，还需要模拟后端 API 数据来做一些应用测试工作，这个时候我们需要一个 mock 数据的服务，而 webpack-dev-server 的 before 或 proxy 配置，又或者是 webpack-dev-middleware 结合 Express，都可以帮助我们来实现简单的 mock 服务。

这一部分内容涉及比较多的 Node.js 代码实现，这里不做过于详细的例子解释，只提供一些实现的思路。

我们最主要的需求是当浏览器请求某一个特定的路径时（如 /some/path ），可以访问我们想要的数据内容。

我们先基于 Express app 实现一个简单 mock 功能的方法：

```js
module.export = function mock(app) {
  app.get('/some/path', (req, res) => {
    res.json({ data: '' })
  })

  // ... 其他的请求 mock
  // 如果 mock 代码过多，可以将其拆分成多个代码文件，然后 require 进来
}
```

然后应用到配置中的 before 字段：

```js
const mock = require('./mock')

// ...
before(app) {
  mock(app) // 调用 mock 函数
}
```

这样的 mock 函数照样可以应用到 Express 中去，提供与 webpack-dev-middleware 同样的功能。

由于 app.get('', (req, res) => { ... }) 的 callback 可以拿到 req 请求对象，其实可以根据请求参数来改变返回的结果，即通过参数来模拟多种场景的返回数据来协助测试多种场景下的代码应用。

当你单独实现或者使用一个 mock 服务时，你可以通过 proxy 来配置部分路径代理到对应的 mock 服务上去，从而把 mock 服务集成到当前的开发服务中去，相对来说也很简单。

当你和后端开发进行联调时，亦可使用 proxy 代理到对应联调使用的机器上，从而可以使用本地前端代码的开发环境来进行联调。当然了，连线上环境的异常都可以这样来尝试定位问题。




















































