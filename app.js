
(function(){
    //这是主模块 用于管理整个HTML页面
    var doubanApp=angular.module('doubanApp',['ngRoute','doubanApp.listModel','doubanApp.detailModel']);
    //这里是配置路由
    doubanApp.config(['$routeProvider',function($routeProvider){
        $routeProvider
        .when('/search/:subject/:id',{
                templateUrl:'Detail/Detail.html',
                controller:'DetailController'
            })
        .when('/:Category/:page?',{
                templateUrl:'list/list.html',
                controller:'ListController'
            })
        .otherwise({
                redirectTo:'/in_theaters'
            })
    }])
})()