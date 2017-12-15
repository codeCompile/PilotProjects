function AppConstants()
{
    //var baseUrl = 'http://akimotoj.azurewebsites.net/aristoweb/';
    var baseUrl = 'http://localhost:8080/aristoweb/';
    var serviceUrlForCreatePost = baseUrl + 'api/createpost';    
    var serviceUrlAllBlogs = baseUrl + 'api/posts';
    var selectedPostService = baseUrl + 'api/getpostbyid';
    var postIdofallPostData = baseUrl + 'api/postsInfo';
    return {
    baseUrl:baseUrl,
    serviceUrlForCreatePost:serviceUrlForCreatePost,
    serviceUrlAllBlogs:serviceUrlAllBlogs,
    selectedPostService:selectedPostService,
    postIdofallPostData:postIdofallPostData
    }
    
}
AppConstants.Instance = new AppConstants();

angular.module('myApp').factory('sharedService', function($rootScope) {
   
     var DATAUPDATEDMESSAGE = 'dataupdate';

    var newUpdatePublish = function(blogDataFlag, blogData) {
        $rootScope.$broadcast(DATAUPDATEDMESSAGE,
            {
                blogDataFlag: blogDataFlag,
                blogData: blogData
            });
    };
 
    // subscribe to elevatedCoreTemperature event.
    // note that you should require $scope first 
    // so that when the subscriber is destroyed you 
    // don't create a closure over it, and te scope can clean up. 
    var onUpdateSubscribe = function($scope, handler) {
        $scope.$on(DATAUPDATEDMESSAGE, function(event, message){
            // note that the handler is passed the problem domain parameters 
            handler(message.blogDataFlag, message.blogData);
        });
    };
   
    return {
        newUpdatePublish: newUpdatePublish,
        onUpdateSubscribe:onUpdateSubscribe
    }
});  