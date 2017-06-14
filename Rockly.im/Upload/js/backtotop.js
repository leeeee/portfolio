$(function(){
    //点击回到顶部元素
     $("#top").click(function(e) {
         //以1秒间隔返回顶部
         $('body,html').animate({scrollTop:0},1000);
     });
     $("#top").hover(function(e) {
         $(this).css("background-color","rgba(0,0,0,0.7)");
     },function(e) {
         $(this).css("color","#fff");
     });
     scrollFn();
 });

 function scrollFn(){
   if($(window).scrollTop()>100){
       $("#top").fadeIn(1000);//以1秒的间隔渐显
       $('.type-2').addClass('scrolled');
   }else{
       $("#top").fadeOut(1000);//以1秒的间隔渐隐
       $('.type-2').removeClass('scrolled');
   }
 }
 window.onscroll=function() {
     scrollFn();
 };
