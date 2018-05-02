/**
 * 类似于中间件
 */
layui.use('laytpl', function () {

  var laytpl = layui.laytpl

  var data = {
    "title": "LayUI模版引擎",
    "list": [
      { "modname": "弹层", "alias": "layer", "site": "layer.layui.com" }, 
      { "modname": "表单", "alias": "form", "site": "" }
    ]
  }

  var getTpl = document.getElementById('list').innerHTML
  var view = document.getElementById('list-view')
  laytpl(getTpl).render(data, function (html) { 
    view.innerHTML = html
  })

})