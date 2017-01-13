app.factory('Url', function($http, $q) {

	var urlFactory = {};

	// api call for genrate url
	urlFactory.postUrl = function(url) {
        var deferred = $q.defer();
		$http.post('/api/url', {
			url : url
		}).success(function(data) {
            deferred.resolve({
                url: data});
			console.log(data);
		}).error(function(data){
            deferred.reject(data);
			data = "invalid";
		})
        return deferred.promise;

	};

    return urlFactory;
});
