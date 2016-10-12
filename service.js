
//这里是服务模块 专门提供数据的增加 删除 修改的模块

(function(){

    var serviceModel=angular.module('doubanApp.serviceModel',[]);
    serviceModel.service('JsonService',['$window',function($window){

        //请求数据的方法
        this.json=function(url,params,fn){
            //第一步 我们要做字符串的拼接
            var jsonUrl='?';
            //循环我们传入的params 里面的key就是count=5属性
            for( key in params){
                jsonUrl+= key+"="+params[key]+"&&";
            }
            //生成函数名
            var funName='my_callback'+new Date().getTime();
            jsonUrl+='callback'+"="+funName;
            //将funName这个方法挂载到window上面去
            $window[funName]=function(data){
                fn(data);
                $window.document.body.removeChild(script);
            }
            //以上相当于是my_callback142331231231=function(){ 调用这个fn函数 }

            //在页面上创建一个script标签
            var script=$window.document.createElement('script');
            script.src=url+jsonUrl;
            $window.document.body.appendChild(script);
            console.log(script.src);
        }
        this.jsonp=function(url,id,fn){
            //https://api.douban.com/v2/movie/subject/ -->url
            var jsonpUrl=id+'?';
            //生成函数名
            var funName='my_callback'+new Date().getTime();
            jsonpUrl+='callback'+'='+funName;
            //将funName方法挂载到window上面取
            $window[funName]=function(data){
                fn(data);
                //当再次执行这个方法的时候清除script标签  要不然会在页面添加很多的标签
                $window.document.body.removeChild(script);
            }
            //在页面上添加一个script标签
            var script=$window.document.createElement('script');
            script.src=url+jsonpUrl;
            $window.document.body.appendChild(script);
        }
    }])
})()