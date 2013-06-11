define([], function() {
    return ['$scope','user', function($scope,user) {
        $scope.controller = {
            deals : null,
            _construct : function(){
                this.getActiveDeals();
            },
            getActiveDeals : function(){
                var that = this;
                $('main-body').append('<img src="app/img/ajax-loader.gif" class="loader" />');
                console.log(user);
                setTimeout(function(){
                    $.get(user.defaultClient.links.deals.published)
                    .success(function(data, status, headers, config){
                        console.log(data);
                        that.deals = data.deals;
                        $('.loader').remove();
                    })
                    .error(function(data, status, headers, config){
                        console.log('Failed to recieve response from the server.')
                        $('.loader').remove();
                    });
                },5000)
            }
        }
        $scope.controller._construct();
        $scope.$apply();
    }];
});