# 复杂HTML解析

## 一、不是一直都要用锤子

假如已经确定了目标内容，可能是采集一个名字、一组统计数据，或者一段文字。目标内容可能隐藏在一个 HTML“烂泥堆”的第 20 层标签里，带有许多没用的标签或 HTML 属性。假如不经考虑地直接写出下面这样一行代码来抽取内容:

```python
bsObj.findAll("table")[4].findAll("tr")[2].find("td").findAll("div")[1].find("a")
```

虽然也可以达到目标，但这样看起来并不是很好。除了代码欠缺美感之外，还有一个问题 是，当网站管理员对网站稍作修改之后，这行代码就会失效，甚至可能会毁掉整个网络爬虫。

- 寻找“打印此页”的链接，或者看看网站有没有HTML样式更友好的移动版。（把自己的请求头设置成处于移动设备的状态，然后接收网站移动版。）
- 寻找隐藏在JavaScript文件里的信息。要实现这一点，可能需要查看网页加载的JavaScript 文件。
- 虽然网页标题经常会用到，但是这个信息也许可以从网页的URL链接里获取。
- 如果要找的信息只存在于一个网站上，别处没有，那是运气不佳。如果不只限于这个网站，那么可以找找其他数据源。有没有其他网站也显示了同样的数据?网站上显示的数据是不是从其他网站上抓取后攒出来的?

尤其是在面对埋藏很深或格式不友好的数据时，千万不要不经思考就写代码，一定要三思而后行。

## 二、BeautifulSoup

基本上，每个网站都会有层叠样式表(Cascading Style Sheet，CSS)。专门为了让浏览器和人类可以理解网站内容而设计一个展现样式的层，是一件愚蠢的事，但是 CSS 的发明却是网络爬虫的福音。CSS 可以让 HTML 元素呈现出差异化，使那些具有完全相同修饰的元素呈现出不同的样式。比如，有一些标签看起来是这样:

```html
<span class="green"></span>
```

而另一些标签看起来是这样:

```html
<span class="red"></span>
```

网络爬虫可以通过 class 属性的值，轻松地区分出两种不同的标签。例如，它们可以用 BeautifulSoup 抓取网页上所有的红色文字，而绿色文字一个都不抓。因为 CSS 通过属性准 确地呈现网站的样式，所以大可放心，大多数新式网站上的 **class** 和 **id** 属性资源都非常丰富。

创建一个网络爬虫来抓取 [http://www.pythonscraping.com/pages/warandpeace.html](http://www.pythonscraping.com/pages/warandpeace.html) 这个网页。

这个页面里，小说人物的对话内容都是红色的，人物名称都是绿色的。可以看到网页源代码里的 span 标签，引用了对应的 CSS 属性，如下所示:

```html
<span class="red">Heavens! what a virulent attack!</span> replied <span class="green">the prince</span>, not in the least disconcerted by this reception.
```

可以抓出整个页面，然后创建一个 BeautifulSoup 对象。

```python
from urllib.request import urlopen
from bs4 import BeautifulSoup
html = urlopen("http://www.pythonscraping.com/pages/warandpeace.html") 
bsObj = BeautifulSoup(html, "html.parser")
```

通过 BeautifulSoup 对象，可以用 findAll 函数抽取只包含在 **<span class="green"></ span>** 标签里的文字，这样就会得到一个人物名称的 Python 列表:

```python
nameList = bsObj.findAll("span", {"class":"green"}) 
for name in nameList:
	print(name.get_text())
```





























     