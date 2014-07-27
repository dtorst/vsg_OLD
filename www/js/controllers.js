angular.module('starter.controllers', [])

.controller('CuisCtrl', function($scope, Cuisines) {
	$scope.cuisines = Cuisines.query();
})

.controller('CuisineDetailCtrl', function($scope, $stateParams, Cuisines) {
  $scope.restaurants = Cuisines.query({cuisineId: $stateParams.cuisineId});
})

.controller('LoadCtrl', function($scope) {
  $scope.totalDisplayed = 10;
  $scope.loadMore = function () {
      $scope.totalDisplayed += 10; 
  	if ($scope.totalDisplayed < $scope.restaurants.length) {
      $scope.noMoreEntries = false;
	} else {
  		$scope.noMoreEntries = true;
		} 
	};
})

.controller('ExploreCtrl', function($scope, $timeout, $ionicLoading, Explore, myCache, filterFilter) {

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  $scope.toggleGroup1 = function(group) {
    if ($scope.isGroup1Shown(group)) {
      $scope.shownGroup1 = null;
    } else {
      $scope.shownGroup1 = group;
    }
  };
  $scope.isGroup1Shown = function(group) {
    return $scope.shownGroup1 === group;
  };

  $scope.toggleGroup2 = function(group) {
    if ($scope.isGroup2Shown(group)) {
      $scope.shownGroup2 = null;
    } else {
      $scope.shownGroup2 = group;
    }
  };
  $scope.isGroup2Shown = function(group) {
    return $scope.shownGroup2 === group;
  };

$scope.useRating = {};
$scope.usePrice = {};
$scope.useLocal = {};
$scope.useGlutenFree = {};
$scope.useOrganic = {};
$scope.useVegan = {};

    $scope.group = {}; 
  
var cache = myCache.get('myData');
if (cache) {
	$scope.restaurants = cache;
}
else {
    $ionicLoading.show({
      template: 'Loading...',
      animation: 'fade-in',
      showDelay: 0
    });
    $timeout(function () {
    	$ionicLoading.hide();
        $scope.restaurants = Explore.query();
    }, 500);
	myCache.put('myData', Explore.query());	
}

    // Watch the restaurants that are selected
    $scope.$watch(function () {
        return {
            restaurants: $scope.restaurants,
            useRating: $scope.useRating,
            usePrice: $scope.usePrice,
            useLocal: $scope.useLocal,
            useGlutenFree: $scope.useGlutenFree,
            useOrganic: $scope.useOrganic,
            useVegan: $scope.useVegan
        }
    }, function (value) {
        var selected;
        
//        $scope.ratingGroup = uniqueItems($scope.restaurants, 'rating');
        var filterAfterRating = [];        
        selected = false;
        for (var j in $scope.restaurants) {
            var p = $scope.restaurants[j];
            for (var i in $scope.useRating) {
                if ($scope.useRating[i]) {
                    selected = true;
                    if (i === p.rating) {
                        filterAfterRating.push(p);
                        break;
                    }
                }
            }        
        }
        if (!selected) {
            filterAfterRating = $scope.restaurants;
        }

        var filterAfterLocal = [];        
        selected = false;
        for (var j in filterAfterRating) {
            var p = filterAfterRating[j];
            for (var i in $scope.useLocal) {
                if ($scope.useLocal[i]) {
                    selected = true;
                    if (i === p.local) {
                        filterAfterLocal.push(p);
                        break;
                    }
                }
            }        
        }
        if (!selected) {
            filterAfterLocal = filterAfterRating;
        }

        var filterAfterGlutenFree = [];        
        selected = false;
        for (var j in filterAfterLocal) {
            var p = filterAfterLocal[j];
            for (var i in $scope.useGlutenFree) {
                if ($scope.useGlutenFree[i]) {
                    selected = true;
                    if (i === p.glutenfree) {
                        filterAfterGlutenFree.push(p);
                        break;
                    }
                }
            }        
        }
        if (!selected) {
            filterAfterGlutenFree = filterAfterLocal;
        }

        var filterAfterOrganic = [];        
        selected = false;
        for (var j in filterAfterGlutenFree) {
            var p = filterAfterGlutenFree[j];
            for (var i in $scope.useGlutenFree) {
                if ($scope.useGlutenFree[i]) {
                    selected = true;
                    if (i === p.organic) {
                        filterAfterOrganic.push(p);
                        break;
                    }
                }
            }        
        }
        if (!selected) {
            filterAfterOrganic = filterAfterGlutenFree;
        }

        var filterAfterVegan = [];        
        selected = false;
        for (var j in filterAfterOrganic) {
            var p = filterAfterOrganic[j];
            for (var i in $scope.useVegan) {
                if ($scope.useVegan[i]) {
                    selected = true;
                    if (i === p.vegan) {
                        filterAfterVegan.push(p);
                        break;
                    }
                }
            }        
        }
        if (!selected) {
            filterAfterVegan = filterAfterOrganic;
        }
//        $scope.priceGroup = uniqueItems($scope.restaurants, 'price');
        var filterAfterPrice = [];        
        selected = false;
        for (var j in filterAfterVegan) {
            var p = filterAfterVegan[j];
            for (var i in $scope.usePrice) {
                if ($scope.usePrice[i]) {
                    selected = true;
                    if (i === p.priceNum) {
                        filterAfterPrice.push(p);
                        break;
                    }
                }
            }       
        }
        if (!selected) {
            filterAfterPrice = filterAfterVegan;
        }
      
          $scope.filteredRestaurants = filterAfterPrice;
    }, true);

})

.controller('DetailCtrl', function($scope, $stateParams, Explore) {
  $scope.restaurant = Explore.get({restaurantId: $stateParams.restaurantId});
})


.controller('PicsCtrl', function($scope, $stateParams, $ionicSlideBoxDelegate, Explore) {
  $scope.restaurant = Explore.get({restaurantId: $stateParams.restaurantId});
   $ionicSlideBoxDelegate.update();
})


.controller('MapCtrl', function($rootScope, $scope, Locations, $ionicLoading, $timeout) {

    $ionicLoading.show({
      template: 'Loading...',
      animation: 'fade-in',
      showDelay: 500
    });

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			$scope.$apply(function(){
		$scope.restaurants = Locations.query({lat: $rootScope.latitude, lng: $rootScope.longitude});
    $ionicLoading.hide();
			});
		});
	};

})

.controller('AppCtrl', function($scope, $ionicLoading, DataService) {
  
  $ionicLoading.show({
      content: 'Loading Data',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 500
  });

    DataService.getContacts().then(
        function(contacts) {
            $scope.contacts = contacts;
            $ionicLoading.hide();
        }
    )

});