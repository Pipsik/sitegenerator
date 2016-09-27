angular.
module('core.site').
factory('dataService', ['$http', function ($http) {
    return {
url: "http://localhost:3000/", //from web.config
post: function (addr, data, headers) {
    if (headers) {
        return $http({
            url: this.url + addr,
            method: "POST",
            data: data,
            headers: headers
        });
    }
    return $http.post(this.url + addr, data);
},

get: function (addr, data, headers) {
    if (headers) {
        return $http({
            url: this.url + addr,
            method: "Get",
            params: {
                data: data
            },
            headers: headers
        });
    }
    return $http({
        url: this.url + addr,
        method: "Get",
        params: {
            data: data
        }
    });

},

delete: function (addr, data) {
    return $http.delete(this.url + addr, data);
}
}
}]);