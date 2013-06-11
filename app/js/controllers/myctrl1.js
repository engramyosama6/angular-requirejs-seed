define(['angularui'], function() {
    return ['$scope','version','user','$state', function($scope,version,user,$state) {
        $scope.controller = {
            
            username : 'username',
            password : 'password',
            user : {
                username : null,
                password : null
            },
            _construct : function(){
                $scope.scopedAppVersion = version;
            },
            login : function(){
                var elem = $('form input[type=submit]');
                elem.hide();
                $('.submit-loader').append('<img src="app/img/ajax-loader-white.gif" />');
                $.post('https://shopbox.com/api/authenticate/credentials',{
                    username:$scope.controller.user.username, 
                    password:$scope.controller.user.password
                })
                .success(function(data, status, headers, config){
                    if('accessToken' in data){
                        console.log('Transition to main view..');
                        user.accessToken = data.accessToken;
                        user.links = data.links;
                        user._getClients();
                         $state.transitionTo('mainPanel');
                    }
                    else
                        alert('It Seems Like you have entered wrong crediantials.');
                    console.log(data);
                    $('.loader').remove();
                    elem.show();
                })
                .error(function(data, status, headers, config){
                    console.log('Failed to recieve response from the server.')
                    $('.loader').remove();
                    elem.show();
                });
            }
        }
        $scope.$apply();
    }];
});