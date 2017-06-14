/**
 * Created by pc on 2017/5/31.
 */
    window.onload=function(){
function UrlSearch()
{
    var name,value;
    var str=location.href; //取得整个地址栏
    var num=str.indexOf("?")
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
    var arr=str.split("&"); //各个参数放到数组里
    for(var i=0;i < arr.length;i++){
        num=arr[i].indexOf("=");
        if(num>0){
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            this[name]=value;
        }
    }
}
var Request=new UrlSearch(); //实例化
var merId=Request.merId;
//console.log(Request.merId);
//alert(merId);
        sessionStorage['merId']=merId;
$.ajax({
    type:"post",
    url:"http://192.168.0.131:8080/AppWhth/getFinanical",
    data:{"merId":merId},
    //data:{"merId":"M0000000000000007"},//测试数据
    success:function(data){
        console.log(data);
        $(".first>span").html(data.total);
        $("header>h1").html(data.lastDay);
        $("#wsy").html(data.rate);
        $("#total").html(data.sumIncome);
        sessionStorage['total']=data.sumIncome;
    },
    error:function(){
        console.log("响应完成但有问题");
    }
});
$('#buy').click(function(){
    $("#modal1").show();
    $(".mt-content>h4").html("买入");
    $(".mt-content input[type='button']").val("确认购买");
});
$('#sell').click(function(){
    //$(".money>input").val("");
   $(".mt-content>h4").html("卖出");
    $(".mt-content input[type='button']").val("确认卖出");
    $("#modal1").show();
});
 $(".trade>button").click(function(){
     $(".money>input").val("");
     btn=$(this).html();
     console.log(btn);
 });
$(".mt-content>a").click(function(e){
    e.preventDefault();
    $(".mt").hide();
});

var reg=/^([1-9][0-9]{0,9}\.[0-9]{2}|0\.[0-9]{2})$/;
function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x*100)/100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}
//理财交易

  $("#qb").click(function(){
             value1=$(".money>input").val();
             value1=toDecimal2(value1);
           console.log(value1);
    if(!reg.test(value1)){
        $(".money>input").val("无效金额！");
        return false;
    }
    else{
        $("#modal3").show();
        $(".mt-content>h4").html("请输入交易密码");
        $("#modal1").hide();
    }
});

        $('#pincode-input2').pincodeInput({
                inputs:6,
                complete:function(value, e, errorElement){
                    //var result=$("#pincode-callback").html("Complete callback from 6-digit test: Current value: " + value);
                    console.log(value);
                    var formbean ={
                       "merId":merId,
                       "money":value1,
                       "dealPassWord":$.md5(value),
                       "chkValue": $.md5(merId +value+ $.md5(value))
            //"chkValue": $.md5("M1705041551540001"+value+$.md5(dealPassWord))
        };
                    $("#modal3").hide();
                    if(btn=="理财买入"){
                        $.ajax({
                            type:"post",
                            //url:"http://192.168.0.112:8080/CMS/financial/buyFinancial",
                            url:"http://192.168.0.112:8080/mobile/financial/buyFinancial",
                            data:formbean,
                            dataType:"json",
                            success:function(data){
                                console.log(data);
                                if(data.resultCode=="0000"){
                                    console.log("买入"+value1);
                                    alert("买入成功！");
                                    history.go(0);
                                }
                                else{
                                    alert(data.resultMsg);
                                }
                            },
                            error:function(){
                                console.log("响应完成但有问题！");
                            }

                        });
                    }
                    else{
                        $.ajax({
                            type:"post",
                            url:"http://192.168.0.112:8080/CMS/financial/sellFinancial",
                            data:formbean,
                            dataType:"json",
                            success:function(data){
                                console.log(data);
                                if(data.resultCode=="0000"){
                                    alert("卖出成功！");
                                    history.go(0);
                                }
                                else{
                                    alert(data.resultMsg);
                                }
                            },
                            error:function(){
                                console.log("响应完成但有问题！");
                            }

                        });
                    }
                }
            });

        //跳转收益页面
        $("#head").click(function(){
            location.href="sy.html";
        });
        $("#sum").click(function(){
            location.href="sy.html";
        });
}
