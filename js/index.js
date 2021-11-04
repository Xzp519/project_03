window.addEventListener('load', function () {
    //实现导航文字高亮
    //1.获取元素 
    var lis = document.querySelector('#nav_ul').querySelectorAll('li');
    var nav = document.querySelector('.all-class').querySelector('.show');
    var show = nav.children;
    //2.遍历lis.length 绑定鼠标经过、离开事件 显示文字高亮效果
    for (var i = 0; i < lis.length; i++) {
        lis[i].addEventListener('mouseenter', function () {
            this.className = 'active';
        });

        lis[i].addEventListener('mouseleave', function () {
            this.className = '';
        });
    }

    //遍历show里边所有的小li，实现nav栏的显示和隐藏
    for (var i = 0; i < show.length; i++) {
        show[i].addEventListener('mouseenter', function () {
            this.children[1].style.overflow = 'visible';
        });

        show[i].addEventListener('mouseleave', function () {
            this.children[1].style.overflow = 'hidden';
        });
    }


    //轮播图自动播放功能

    //1.获取元素
    var banner = document.querySelector('#banner');
    var bannerWidth = banner.offsetWidth;
    var ul = banner.querySelector('#publish-copy');
    var ol = banner.querySelector('#b_dot');
   /*  var dot = ol.children;
    console.log(bannerWidth);
    console.log(ul.children.length);
    console.log(ol.children.length);
    console.log(dot.length); */

    //2.动态创建小圆圈 方便后期banner的维护
     for (var i = 0; i < ul.children.length; i++) {
        //创建小li
        var a = document.createElement('a');
         a.href = "javascript:void(0);";
         //记录当前小圆圈索引号 通过自定义属性来实现
         a.setAttribute('index', i);
        //把小li插入到b_dot里边
        ol.appendChild(a);
        
        //3.小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
         a.addEventListener('click', function () {
             for (var i = 0; i < ol.children.length; i++) {
                 ol.children[i].className = '';
             }
             this.className = 'on';

             //4.点击小圆圈移动图片  是ul在做移动
             //ul 移动的距离是，图片的宽度乘以索引号，注意是负值
             //当我们点击小li    就能拿到当前的索引号
             var index = this.getAttribute('index');
             console.log(index);
             //当我们点击某个小a,我们就把这个a索引号给num
             num = index;
             //当我们点击某个小a，我们就要把这个所以号给b_dot
             b_dot = num;

             animate(ul, -index * bannerWidth);
         });
    }
    //给b_dot里边的第一个a设置类名on
    ol.children[0].className = 'on'; 
    
    //5.克隆一张li放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //6.给b_dot绑定点击事件，模拟右键切换
    var num = 0;//点击小a，图片滚动一张
    var b_dot = 0;
    ol.addEventListener('click', function () {
        //添加一个判断条件 滚动到最后一张图片时，我们快速复原   left 改为   0
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;//控制图片的播放

        animate(ul, -num * bannerWidth);    //实现图片移动

        //ul在点击播放的时候，小圆圈跟随一起变化    可以在声明一个变量控制小圆圈播放
        b_dot++;//控制小圆圈的播放

        if (b_dot == ol.children.length) {
            b_dot = 0;
        }

        //先清除其余小圆圈里的白点（on）
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下自己
        ol.children[b_dot].className = 'on'; 
                
    });

    //7.自动轮播图播放
    var timer = setInterval(function () {
        //手动调用点击事件
        ol.click();
    }, 2000);

    //8.当鼠标经过时 轮播图停止；当鼠标离开时，轮播图播放
    banner.addEventListener('mouseenter', function () {    
        clearInterval(timer);
        timer = null;//清除定时器
    });

    //9.鼠标离开时，轮播图自动播放
    banner.addEventListener('mouseleave', function () {
        //调用定时器，实现手动点击
        timer = setInterval(function () {
            ol.click();
        }, 2000);
    });

    //倒计时功能

    //1.获取元素
    var day = document.querySelector('#_d');
    var hour = document.querySelector('#_h');
    var minute = document.querySelector('#_m');
    var second = document.querySelector('#_s');
    var inputTime  = +new  Date('2021-7-4  19:00:00');//返回的是用户输入时间总的毫秒数
    countDown();//防止刷新时出现页面空白，先调用一次这个函数
    //2.开启定时器
    setInterval(countDown, 1000);


    function    countDown() {
        var nowTime = +new  Date();//返回的是当前时间总的毫秒数    
        var times   =  (inputTime - nowTime) / 1000;//time是剩余时间总的秒数
        var d = parseInt(times / 60 / 60 / 24);//天
        d = d < 10 ? '0' + d + '天': d;
        day.innerHTML = d;//把剩余的天数给 天数的盒子
        var h = parseInt(times / 60 / 60 % 24);//时
        h = h < 10 ? '0' + h + '时': h  + '时';
        hour.innerHTML = h;//剩余的小时
        var m = parseInt(times / 60 % 60);//分
        m = m < 10 ? '0' + m + '分': m  + '分';
        minute.innerHTML = m;//剩余的分钟
        var s = parseInt(times % 60);//秒
        s = s < 10 ? '0' + s + '秒': s  + '秒';
        second.innerHTML = s;//剩余的秒数
    }
})