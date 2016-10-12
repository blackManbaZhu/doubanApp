

//这里是详细页面模板 控制器
(function(){
    var detailModel=angular.module('doubanApp.detailModel',['doubanApp.serviceModel']);
    detailModel.controller('DetailController',['$scope','JsonService','$routeParams','$route','$rootScope','$location',
        function($scope,JsonService,$routeParams,$route,$rootScope,$location){
        //console.log($routeParams.id);
        //返回上一页
        $scope.back=function(){
            //js原生的方法
            history.back();
            //行不通
            //$location.path('/:Category/:page?')
        }
         //搜素框的
         //   alert('detail1');
        $rootScope.subject=$routeParams.subject;
        $rootScope.id=$routeParams.id;
        $rootScope.search=function(){
            if(!$rootScope.inputs){
                return
            }
            $route.updateParams({subject:'',id:''});
        };
            //调用服务模块里的请求数据的方法
        JsonService.jsonp('https://api.douban.com/v2/movie/'+$routeParams.subject+'/',$routeParams.id,function(data){
            //alert('detail2');
            $scope.data=data;
            //电影标题
            $scope.title=data.title;
            //电影图片
            $scope.images=data.images.large;
            //电影评分
            $scope.average=data.rating.average;
            //电影年份
            $scope.year=data.year;
            //电影主演
            $scope.casts=data.casts;
            //电影导演
            $scope.directors=data.directors;
            $scope.length=data.directors.length;
            //电影类型
            $scope.genres=data.genres;
            //地区
            $scope.countries=data.countries;
            //原文片名
            $scope.aka=data.aka[0];
            //剧情简介
            $scope.summary=data.summary;
            $scope.$apply();
        });
    }])
})()