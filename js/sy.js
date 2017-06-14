/**
 * Created by pc on 2017/6/9.
 */
//查询收益详情
    $("#sum").html(sessionStorage['total']);
$.ajax({
    type:"get",
    //url:"http://192.168.1.105:8080/AppWhth/getFinanicalRecord",
    url:"http://192.168.2.23:8080/AppWhth/getFinanicalRecord",//merId=M0000000000000007
    data:{merId:sessionStorage['merId']},
    //data:{merId:"M0000000000000007"},
    success:function(data){
        var list=data.datas;
        //console.log(data);
        //console.log(data.datas);
        if(data.respCode=="0001"){
          $(".tip").html(data.respDesc);
        }
        else if(data.respCode=="0000"){
        var html="";
        $.each(list,function(i,obj){
            html +=`
             <li>
                <span class="left">${obj.date}</span>
                <span class="right">${obj.money}</span>
        </li>
            `;
        });
            $(".sy").html(html);
        }
       else{
            $(".tip").html("无法连接数据库，稍后再试");
        }
    },
    error:function(){
        console.log("响应完成但有问题");
        $(".tip").html("无法连接数据库，稍后再试...");
    }
});
