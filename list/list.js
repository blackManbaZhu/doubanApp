
(function(){

    //这里是正在热映页面的模块
    var listModule=angular.module('doubanApp.listModel',['doubanApp.serviceModel']);
    //控制器 用于控制hot.html页面的内容
    listModule.controller('ListController',['$scope','JsonService','$routeParams','$route','$rootScope',function($scope,JsonService,$routeParams,$route,$rootScope){

        //进行分页的数据操作
        var count=5;
        var currentPage=parseInt(($routeParams.page || 1)); //获取到路由里锚点后面变化的数据
        //改变start的值 0代表的是第一页 1代表的是第二页
        var start=(currentPage-1)*count;
        //显示当前第几页
        var page=$routeParams.page ||1;
        $scope.page=page;

        //分类页面的操作 要利用到$routeParams.Category
        //console.log($routeParams.Category);

        //分类按钮的样式改变 需要利用根作用域的引入
        $rootScope.category=$routeParams.Category;
        //alert('list1');

        //搜索框
        $rootScope.search=function(){
            //敲击回车的时候拿到输入框中的值
            console.log($rootScope.inputs);
            if(!$rootScope.inputs){
                return
            }
            //当我敲击回车的时候改变 category 的名称 把它变成search
            $route.updateParams({Category:'search',q:$rootScope.inputs});
        }
        //在这里调用那个json方法 跨域请求豆瓣服务器的数据
        JsonService.json('https://api.douban.com/v2/movie/'+$routeParams.Category, { count: count, start: start ,q:$rootScope.inputs},function(data){
            //将data里的数据绑定到scope上面
            //alert('list2');

            //if(data){
            //    console.log('请求成功');
            //}else {console.log('请求失败');}

            $scope.subjects=data.subjects;

            $scope.currentPage=currentPage;
            //电影的总条数
            //页面的标题
            $scope.title=data.title;
            $scope.total=data.total;
            //显示总共有多少页数据 totalPage
            $scope.totalPage=Math.ceil(data.total/count);
            //告诉angular刷新界面上面的数据
            $scope.$apply();

            //点击 上一页或者是下一页 切换页面
            $scope.hundlePage=function(page){
                //第一种比较常规的判断方法
                //if(page < 1 || page > $scope.totalPage){  //如果满足条件就直接return 就不会执行下面的代码
                //    return
                //}
                //第二种简单的方法判断page的值
                //先让page和1比较 谁最大就返回谁 若果是2就返回2
                //然后再让2和总页数比较谁最小 谁最小就返回数 这个时候总页数如果是7的话那就是返回2 直到返回7为止就不返回了
                page=Math.min(Math.max(page,1),$scope.totalPage);
                //更改路由的参数 需要用到$route
                $route.updateParams({page:page});
            }
        })
    }])
})()