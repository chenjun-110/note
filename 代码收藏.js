//浮动广告
window.onscroll=function()
    {
          var dl=document.getElementById("duilian_left"),
              dr=document.getElementById("duilian_right");
          var scrollTop=document.documentElement.scrollTop ||document.body.scrollTop;
          // div.style.top=document.documentElement.clientHeight-div.offsetHeight+scrollTop+'px';
          var winclientHeight = /BackCompat/i.test("document.compatMode") ? document.body.clientHeight : document.documentElement.clientHeight;
          startmove (parseInt((winclientHeight-dl.offsetHeight)/2+scrollTop)); //(页面-元素)/2+页面top
                 
          //offsetHeight是div的高度
          //document.documentElement.clientHeight是到窗口的顶部
    };
    var timer=null;
    function startmove(iTarget)
    {
        var dl=document.getElementById("duilian_left"),
            dr=document.getElementById("duilian_right");
        clearInterval(timer); //每次调用前都清除上次移动定时
        timer=setInterval(function()
        {
             var speed =(iTarget-dl.offsetTop)/4;
             speed=speed>0?Math.ceil(speed):Math.floor(speed); 
             if (dl.offsetTop==iTarget)  
             {
                clearInterval(timer);
             }
             else
             {
                dl.style.top=dl.offsetTop+speed+'px';
                dr.style.top=dr.offsetTop+speed+'px';
             }
        }
            , 30); 
 
    }
    
    //函数节流,throttle
var throttle = function ( fn, interval ) {
	var __self = fn, // 保存需要被延迟执行的函数引用
	timer, // 定时器
	firstTime = true; // 是否是第一次调用
	return function () {
		var args = arguments,
		__me = this;
		if ( firstTime ) { // 如果是第一次调用，不需延迟执行
			__self.apply(__me, args);
			return firstTime = false;
		}
		if ( timer ) { // 如果定时器还在，说明前一次延迟执行还没有完成
			return false;
		}
		timer = setTimeout(function () { // 延迟一段时间执行
			clearTimeout(timer);
			timer = null;
			__self.apply(__me, args);
		}, interval || 500 );
	};
};
window.onresize = throttle(function(){
console.log( 1 );
}, 500 );

//字符串转Unicode
function encodeUnicode(str) {
    var res = [];
    for ( var i=0; i<str.length; i++ ) {
        res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);
    }
    return "\\u" + res.join("\\u");
}
//批量获取属性并转为数组
ustring=$.makeArray($('#ontheroad>li>a')).map((i)=>i.href)
//批量赋值给json对象
let arr=[];
ustring.forEach((v,i,a)=>{
    let b={};
    b.title=v;
    arr.push(b);
})
href.forEach((v,i,a)=>{arr[i].url=v;})
src.forEach((v,i,a)=>{arr[i].img_url=v;})
JSON.stringify(arr).replace(/\\\\/g, "\\");  //把双反斜杠转义成单反斜杠


//e.target.matches('div.home') 字符参数和调用dom匹配则返回ture 支持IE8
function matchesSelector(element,selector){
    if(element.matches){
        return element.matches(selector);
    } else if(element.matchesSelector){
        return element.matchesSelector(selector);
    } else if(element.webkitMatchesSelector){
        return element.webkitMatchesSelector(selector);
    } else if(element.msMatchesSelector){
        return element.msMatchesSelector(selector);
    } else if(element.mozMatchesSelector){
        return element.mozMatchesSelector(selector);
    } else if(element.oMatchesSelector){
        return element.oMatchesSelector(selector);
    } else if(element.querySelectorAll){  //IE8
        var matches = (element.document || element.ownerDocument).querySelectorAll(selector),
            i = 0;
        while(matches[i] && matches[i] !== element) i++;
        return matches[i] ? true: false;
    }
    throw new Error('Your browser version is too old,please upgrade your browser');
}