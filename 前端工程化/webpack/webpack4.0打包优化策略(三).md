# webpack4.0打包优化策略(三)

## 提取公共代码与第三方代码

> 将多个入口重复加载的公共资源提取出来

- 相同的资源被重复的加载，浪费用户的流量和服务器的成本；
- 每个页面需要加载的资源太大，导致网页首屏加载缓慢，影响用户体验。 如果能把公共代码抽离成单独文件进行加载能进行优化，可以减少网络传输流量，降低服务器成本

- 在webpack4.0 optimization.splitChunks替代了CommonsChunkPlugin

webpack.base.config.js提取配置

```js
optimization: {
    // runtimeChunk: {
    //     name: "manifest"
    // },
    splitChunks: {
        cacheGroups: {
            commons: {
                chunks: 'initial',
                minChunks: 2,
                maxInitialRequests: 5,
                minSize: 0
            },
            vendor: { // 将第三方模块提取出来
                test: /node_modules/,
                chunks: 'initial',
                name: 'vendor',
                priority: 10, // 优先
                enforce: true
            }
        }
    }
}
```

optimization参数介绍：

- webpack根据下述条件自动进行代码块分割：

- 新代码块可以被共享引用，OR这些模块都是来自node_modules文件夹里面
- 新代码块大于30kb（min+gziped之前的体积）
- 按需加载的代码块，最大数量应该小于或者等于5
- 初始加载的代码块，最大数量应该小于或等于3

```js
optimization: {
    splitChunks: { 
      chunks: "initial",         // 代码块类型 必须三选一： "initial"（初始化） | "all"(默认就是all) | "async"（动态加载） 
      minSize: 0,                // 最小尺寸，默认0
      minChunks: 1,              // 最小 chunk ，默认1
      maxAsyncRequests: 1,       // 最大异步请求数， 默认1
      maxInitialRequests: 1,     // 最大初始化请求书，默认1
      name: () => {},            // 名称，此选项课接收 function
      cacheGroups: {                // 缓存组会继承splitChunks的配置，但是test、priorty和reuseExistingChunk只能用于配置缓存组。
        priority: "0",              // 缓存组优先级 false | object |
        vendor: {                   // key 为entry中定义的 入口名称
          chunks: "initial",        // 必须三选一： "initial"(初始化) | "all" | "async"(默认就是异步)
          test: /react|lodash/,     // 正则规则验证，如果符合就提取 chunk
          name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
          minSize: 0,
          minChunks: 1,
          enforce: true,
          reuseExistingChunk: true   // 可设置是否重用已用chunk 不再创建新的chunk
        }
      }
    }
  }
```

在满足下述所有条件时，那些从相同代码块和缓存组来的模块，会形成一个新的代码块（译注：比如，在满足条件下，一个vendoer可能会被分割成两个，以充分利用并行请求性能）。

有四个选项可以用于配置这些条件：

- minSize(默认是30000)：形成一个新代码块最小的体积
- minChunks（默认是1）：在分割之前，这个代码块最小应该被引用的次数（译注：保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）
- maxInitialRequests（默认是3）：一个入口最大的并行请求数
- maxAsyncRequests（默认是5）：按需加载时候最大的并行请求数。

## 懒加载(按需加载)

> 是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

lazy.js

```js
export default 'lazy loader';
```

main.js 当点击按钮时 再加载lazy.js 输出里面内容

```js
let output = () => {
    import('./lazy').then(module => {
        console.log(module.default);
    });
};
ReactDOM.render(
    <div>
    <button onClick={output}>点击</button>
    </div>,
    document.querySelector('#root')
)
```

### vue中懒加载

```js
const Login = () => import(/* webpackChunkName: "login" */'./login')

new VueRouter({
  routes: [
    { path: '/login', component: Login }
  ]
})
```

### react中懒加载

```js
babel-plugin-syntax-dynamic-import plugin. This is a syntax-only plugin, meaning Babel won’t do any additional transformations. The plugin simply allows Babel to parse dynamic imports so webpack can bundle them as a code split. Your .babelrc should look something like this:{
  "presets": [
    "react"
  ],
  "plugins": [
    "syntax-dynamic-import"
  ]
}
react-loadable is a higher-order component for loading components with dynamic imports. It handles all sorts of edge cases automatically and makes code splitting simple! Here’s an example of how to use react-loadable:import Loadable from 'react-loadable';
import Loading from './Loading';

const LoadableComponent = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading,
})

export default class LoadableDashboard extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}
```

## 开启Scope Hoisting

> 在webpack4中当mode为production时默认开启了Scope Hoisting 可以让webpack打包出来的代码文件更小、运行更快，它又译作“作用域提升”。

好处： • 代码体积更小，因为函数申明语句会产生大量代码； • 代码在运行时因为创建的函数作用域更少了，内存开销也随之变小

scope.js

```js
export default 'scope hoisting'
```

main1.js

```js
import scope from './scope';
console.log(scope);
```

webpack3 配置scope Hoisting

```js
new webpack.optimize.ModuleConcatenationPlugin()
```

开启scope hoisting后的代码

```js
// CONCATENATED MODULE: ./src/scope.js
/* harmony default export */ var scope = ('scope hoisting');
// CONCATENATED MODULE: ./src/main1.js

console.log(scope);
```

ES6的静态模块分析，分析出模块之间的依赖关系，尽可能地把模块放到同一个函数中。

同时，考虑到 Scope Hoisting 依赖源码需采用 ES6 模块化语法，还需要配置 mainFields。因为大部分 Npm 中的第三方库采用了 CommonJS 语法，但部分库会同时提供 ES6 模块化的代码，为了充分发挥 Scope Hoisting 的作用，需要增加以下配置

mainFields用于配置第三方模块使用那个入口文件

```js
module.exports = {
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main']
  },
};
```

对于采用了非 ES6 模块化语法的代码，Webpack 会降级处理不使用 Scope Hoisting 优化