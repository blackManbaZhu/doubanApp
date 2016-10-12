
//�����Ƿ���ģ�� ר���ṩ���ݵ����� ɾ�� �޸ĵ�ģ��

(function(){

    var serviceModel=angular.module('doubanApp.serviceModel',[]);
    serviceModel.service('JsonService',['$window',function($window){

        //�������ݵķ���
        this.json=function(url,params,fn){
            //��һ�� ����Ҫ���ַ�����ƴ��
            var jsonUrl='?';
            //ѭ�����Ǵ����params �����key����count=5����
            for( key in params){
                jsonUrl+= key+"="+params[key]+"&&";
            }
            //���ɺ�����
            var funName='my_callback'+new Date().getTime();
            jsonUrl+='callback'+"="+funName;
            //��funName����������ص�window����ȥ
            $window[funName]=function(data){
                fn(data);
                $window.document.body.removeChild(script);
            }
            //�����൱����my_callback142331231231=function(){ �������fn���� }

            //��ҳ���ϴ���һ��script��ǩ
            var script=$window.document.createElement('script');
            script.src=url+jsonUrl;
            $window.document.body.appendChild(script);
            console.log(script.src);
        }
        this.jsonp=function(url,id,fn){
            //https://api.douban.com/v2/movie/subject/ -->url
            var jsonpUrl=id+'?';
            //���ɺ�����
            var funName='my_callback'+new Date().getTime();
            jsonpUrl+='callback'+'='+funName;
            //��funName�������ص�window����ȡ
            $window[funName]=function(data){
                fn(data);
                //���ٴ�ִ�����������ʱ�����script��ǩ  Ҫ��Ȼ����ҳ����Ӻܶ�ı�ǩ
                $window.document.body.removeChild(script);
            }
            //��ҳ�������һ��script��ǩ
            var script=$window.document.createElement('script');
            script.src=url+jsonpUrl;
            $window.document.body.appendChild(script);
        }
    }])
})()