//搜索栏
let search = document.querySelector("#search");
search.onfocus = function(){
    if(this.value == "音乐/视频/电台/用户"){
        this.value = " ";

    }
}
search.onblur = function(){
    if(this.value,length == 0){
        this.value = "音乐/视频/电台/用户";
        this.style.color = "#787878";
    }
}



//设置展示区的宽度及按钮区的位置

window.onload=function(){
 //获取ul列表
 var imgList=document.getElementById('imgList');

 //获取所有图片标签
 var img=document.getElementsByTagName('img')


 //动态设置ul的宽度以适应图片的动态增加减少
 imgList.style.width=img.length*945+"px";

 /*设置导航按钮居中*/

 //获取handler轮播图导航栏
 var handler = document.getElementById("handler");

 //获取carousel的div
 var carousel = document.getElementById("carousel");

 //设置获取handler的left值,以适应动态的增加减少a标签达到居中效果
 handler.style.left = (carousel.offsetWidth - handler.offsetWidth)/2 + "px";
 };


 //为按钮绑定事件
 //设置图片的索引
var index=0;
//获取所有a标签
var a=document.getElementsByTagName("a");
//选中图片默认样式
a[index].style.backgroundColor="aquamarine";
//为所有的超链接都绑定单击响应函数
for(var i=0; i<a.length ; i++){

//为每一个超链接都添加一个num属性
a[i].num = i;
//为超链接绑定单击响应函数
a[i].onclick = function(){
    //关闭自动切换的定时器
    clearInterval(timer);
    //获取点击超链接的索引,并将其设置为index
    index = this.num;
    //切换图片
    /*
     * 第一张  0 0
     * 第二张  1 -945
     * 第三张  2 -1890
     */
    //设置选中的a标签
    active();
    //使用move函数来切换图片
    move(imgList , "left" , -945*index , 45,function(){
        //设置自动切换
        autoChange();
    });
}
}

//图片操作函数
function active(){
    //判断当前索引是否是最后一张图片
    if(index >= img.length - 1){
        //则将index设置为0
        index = 0;
        //此时显示的最后一张图片，而最后一张图片和第一张是一摸一样
        //通过CSS将最后一张切换成第一张
        imgList.style.left = 0;
    }
    //遍历所有a，并将它们的背景颜色设置为红色
    for(var i=0 ; i<a.length ; i++){
        a[i].style.backgroundColor = "";
    }
    a[index].style.backgroundColor = "aquamarine";
};
function move(obj, direction, target, speed, callback) {
        //关闭上一个定时器
        clearInterval(obj.timer);
        //获取元素目前的位置
        var current = parseInt(getComputedStyle(obj,null)[direction]);
        //判断速度的正负值
        //如果从0 向 target移动，则speed为正
        //如果从target向0移动，则speed为负
        if(current>target){
            speed=-speed;
        }
        //开启一个定时器，用来执行动画效果
        //向执行动画的对象中添加一个timer属性，用来保存它自己的定时器的标识
        obj.timer = setInterval(function() {
            //获取box1的原来的left值
            var oldValue = parseInt(getComputedStyle(obj,null)[direction]);
            //在旧值的基础上增加
            var newValue = oldValue + speed;
            //判断newValue是否大于target
            //向左移动时，需要判断newValue是否小于target
            //向右移动时，需要判断newValue是否大于target
            if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
                newValue = target;
            }
            //将新值设置给box1
            obj.style[direction] = newValue + "px";
            //当元素移动到0px时，使其停止执行动画
            if(newValue == target) {
                //达到目标，关闭定时器
                clearInterval(obj.timer);
                callback && callback();
            }
        }, 30);
    };
//定义一个自动切换的定时器的标识
var timer;
//创建一个函数，用来开启自动切换图片
function autoChange(){
    //开启一个定时器，用来定时去切换图片
    timer = setInterval(function(){
        //使索引自增
        index++;
        //判断index的值
        index %= img.length;
        //执行动画，切换图片
        move(imgList , "left" , -945*index , 45,function(){
         //修改导航按钮
            active();
        } );  
    },3000);
};
