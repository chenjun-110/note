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
function startmove(iTarget) {
    var dl=document.getElementById("duilian_left"),
        dr=document.getElementById("duilian_right");
    clearInterval(timer); //每次调用前都清除上次移动定时
    timer=setInterval(function() {
            var speed =(iTarget-dl.offsetTop)/4;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if (dl.offsetTop==iTarget) {
                clearInterval(timer);
            }
            else {
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

//字符串转Unicode编码
function encodeUnicode(str) {
    var res = [];
    for ( var i=0; i<str.length; i++ ) {
        res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);
    }
    return "\\u" + res.join("\\u");
}
//批量获取html属性并转为json格式输出
ustring=$.makeArray($('#ontheroad>li>a')).map((i)=>i.href)
let arr=[];
ustring.forEach((v,i,a)=>{ //批量赋值给json对象
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

//手动触发事件
if(document.all) {// IE
    document.getElementById("clickMe").click();
}
else { // 其它浏览器
    var e = document.createEvent("MouseEvents");
    e.initEvent("click", true, true);
    document.getElementById("clickMe").dispatchEvent(e);
}

//绑定事件
var EventUtil = {
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);} //DOM2事件
        else if (element.attachEvent){
            element.attachEvent("on"+type,handler);} //IE事件
        else {element["on"+type]=handler;} //DOM0事件
    },
    removeHandler:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);} //DOM2删除事件
        else if (element.detachEvent){
            element.detachEvent("on"+type,handler);} //IE删除事件
        else{element["on"+type]=null;} //DOM0删除事件
    },
    getEvent:function(event){return event ? event : window.event;}, //event对象
    getTarget:function(event){return event.target || event.srcElement;}, //目标元素
    preventDefault:function(event){
        if(event.preventDefault){event.preventDefault();} //阻止默认
        else{event.returnValue = false;}  //IE阻止默认
    },
    stioPropagation:function(event){
        if(event.stopPropagation){event.stopPropagation();} //停止冒泡
        else {event.cancelBubble = false;}   //IE停止冒泡
    },
    getRelatedTarget: function(event){ //获取移入移出事件的关联元素
        if (event.relatedTarget){return event.relatedTarget;} //非IE
        else if (event.toElement){return event.toElement;} //IE的被移出元素
        else if (event.fromElement){return event.fromElement;} //IE的移入元素
        else {return null;}
    },
    getButton: function(event){ //获取被按压的鼠标键
        if (document.implementation.hasFeature("MouseEvents","2.0")){return event.button;}
        else {
            switch(event.button){
                case 0: case 1: case 3: case 5:
                case 7:
                    return 0;
                case 2: case 6: return 2; case 4: return 1;}}
    },
    getshubiao:function(e){  //这个是自己写的，可能要加滚动条高宽
        if(e.x){return e.x + e.y}  //IE鼠标坐标
        else {return e.pageX + e.pageY} //火狐
    },
    getCharCode: function(event){   //获取键码
        if (typeof event.charCode == "number"){return event.charCode;} //IE9
        else {return event.keyCode;}
    }
};
btn.onclick = function(event){event = EventUtil.getEvent(event);};//使用方法

// requestAnimationFrame的兼容处理
if (!window.requestAnimationFrame) {
    requestAnimationFrame = function(fn) {
        setTimeout(fn, 17);
    };
}
/*
 缓动函数
 * t: current time（当前时间）；
 * b: beginning value（起点）；
 * c: change in value（起-终点差值）；
 * d: duration（持续时间）。
 */
Tween.Linear = function(current, beginning, change, duration) {
    return change*current/duration + beginning;
}; //t为小于d的任何值时，该函数返回那时刻的坐标。
/*
解析：
current*v=s1-beginning     duration*v=change
v=(s1-beginning)/current = change/duration
s1=change*current/duration+beginning
重点思考(s1-beginning),我要求的是坐标，不是差值。而时间*速度得出的是路程，路程是差值，非坐标。
* */

Tween.BounceEaseOut=function(t, b, c, d) { //判断时间t在总时间d内的不同阶段，计算不同的路程。
    if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
    } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
    } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
    }
};
//使用方法
let step = function(t, b, c, d) {
    let left = Tween.BounceEaseOut(t, b, c, d);  // 当前的运动位置
    if (history.pushState) { // 高级浏览器
        eleBall.style.transform = 'translateX(' + left + 'px)';
    } else {
        eleBall.style.left = left + 'px';
    }
    t++; //外面的t仍然是线性变化的，只是缓动函数内是判断阶段的。
    if (t <= d) {  // 如果还没有运动到位，继续
        requestAnimationFrame(step);
    } else {
        // callback()...
        isMoving = false;  // 标记动画已结束，可以再次点击小球执行动画
    }
};

Tween.easeOutBounce=function(pos){ //pos是时间比率，这是prototype流派的缓动公式
    if ((pos) < (1/2.75)) {
        return (7.5625*pos*pos);
    } else if (pos < (2/2.75)) {
        return (7.5625*(pos-=(1.5/2.75))*pos + .75);
    } else if (pos < (2.5/2.75)) {
        return (7.5625*(pos-=(2.25/2.75))*pos + .9375);
    } else {
        return (7.5625*(pos-=(2.625/2.75))*pos + .984375);
    }
};
let transition = function(el,options={}){
    el.style.position = "absolute";
    let {begin,change,duration=500,field,ftp,ease,onEnd=()=>{}} = options, //field必须指定，基本上对top,left,width,height这个属性进行设置，ftp是帧率
        end = begin + change,//结束位置
        startTime = new Date().getTime();//开始执行的时间
    let setStyle = (p)=>{
        if (history.pushState) { // 高级浏览器用transform位移
            el.style.transform = 'translateX(' + p + 'px)';//这个函数想通用的话自己写还是要提出来解耦，根据设置的style来判断。
        } else {
            el.style[field] = p + "px";
        }
    };
    if (window.requestAnimationFrame && ftp) {
        requestAnimationFrame = (fn)=> setTimeout(fn, 1000/ftp);
    }
    (function(){
        requestAnimationFrame(function(){
            let newTime = new Date().getTime(),//当前帧开始的时间
                timestamp = newTime - startTime,//逝去时间
                delta = ease(timestamp / duration);//递归传入时间比率
            setStyle(Math.ceil(begin + delta * change));
            if(duration <= timestamp){
                setStyle(end);
                onEnd();
            }else{
                requestAnimationFrame(arguments.callee);
            }
        })
    })()
};
transition(eleBall,{field:'left',begin:parseFloat(getStyle(eleBall,'left')),change:400,ease:Tween.easeOutBounce});//使用方法
//getComputedStyle兼容
let getStyle = function(el, style){
    if(!+"\v1"){
        style = style.replace(/\-(\w)/g, function(all, letter){
            return letter.toUpperCase();
        });
        let value = el.currentStyle[style];
        (value === "auto")&&(value = "0px" );
        return value;
    }else{
        return document.defaultView.getComputedStyle(el, null).getPropertyValue(style)
    }
};
//getBoundingClientRect兼容
function getRect(obj){
    var xy = obj.getBoundingClientRect();
    var top = xy.top-document.documentElement.clientTop+document.documentElement.scrollTop,//document.documentElement.clientTop 在IE67中始终为2，其他高级点的浏览器为0
        bottom = xy.bottom,
        left = xy.left-document.documentElement.clientLeft+document.documentElement.scrollLeft,//document.documentElement.clientLeft 在IE67中始终为2，其他高级点的浏览器为0
        right = xy.right,
        width = xy.width||right - left, //IE67不存在width 使用right - left获得
        height = xy.height||bottom - top;
    return {
        top:top,
        right:right,
        bottom:bottom,
        left:left,
        width:width,
        height:height
    }
}