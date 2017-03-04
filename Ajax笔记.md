**onreadystatechange事件回调函数处理响应数据**：当 readyState 等于 4 且状态为 200 时，表示响应已就绪。同步不使用。
readyState属性值存有XHR状态信息： 0: 请求未初始化 1: 服务器连接已建立 2: 请求已接收 3: 请求处理中 4: 请求已完成，且响应已就绪
status属性值：200: "OK"，404: 未找到页面
```
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }```

**responseText**是XMLHttpRequest对象的属性。获得字符串响应数据。
``document.getElementById("id").innerHTML=xmlhttp.responseText;``
如果是XML文件 就使用**responseXML**属性：
``document.getElementById("id").innerHTML=xmlhttp.responseXML;``
如果是async=false,把该执行代码放在send()之后。
**open（method,url,async)**method=GET/POST,async=true(异步）/false(同步)
```
xmlhttp.open("GET","demo_get.html",true); //简单请求
xmlhttp.send();

xmlhttp.open("GET","demo_get.html?t=" + Math.random(),true); 
//向URL添加ID，避免读缓存
xmlhttp.open("GET","demo_get2.html?fname=Henry&lname=Ford",true); 
//用GET发送信息，在URL添加。```
“？”就是url地址跟参数列表的分隔符。从“？”开始，后面就会被认为是参数列表了。t是自己设置的参数名。

**setRequestHeader(header,value)**:为请求添加HTTP头。header规定头名字。value规定头值。对POST是必须的。
```
xmlhttp.open("POST","ajax_test.html",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");表示请求包含URL编码的表单
xmlhttp.send("fname=Henry&lname=Ford");```
send()里面规定需要发送的数据。

.childNodes[0] 返回第一个节点
.childNodes[1].nodeValue 返回第一个节点值
若执行多个Ajax，需把url和回调函数作为参数，在外部另起函数设置。
`x=xmlhttp.responseXML.documentElement.getElementsByTagName("CD")`从XML文件的响应数据中的根节点查找CD标签

`document.getElementById('p1').innerHTML=xmlhttp.getAllResponseHeaders()`返回头信息，（）带参数可返回指定信息
loadXMLDoc(url,cfunc)参数cfunc代表函数


####JSON
```
var txt = '{
"employees" : [' + '
{ "firstName":"Bill" , "lastName":"Gates" },' + '
{ "firstName":"George" , "lastName":"Bush" },' + '
{ "firstName":"Thomas" , "lastName": "Carter" }];
}'```
三个对象（在花括号中）,数组（在方括号中）

`var obj = eval ("(" + txt + ")");`必须把文本包围在括号中。eval处理后就能调用obj属性了。、
`obj = JSON.parse(txt);`功能等价上面。Firefox3.5 IE8 Chrome Opera10 Safari4支持。