
(function(){
    //������ģ�� ���ڹ�������HTMLҳ��
    var doubanApp=angular.module('doubanApp',['ngRoute','doubanApp.listModel','doubanApp.detailModel']);
    //����������·��
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