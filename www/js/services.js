angular.module('starter.services', ['ngResource'])

/**
 * A simple example service that returns some data.
 */
.factory('Employees', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var employees = [
    { id: 0, firstName: 'Scruff McGruff' },
    { id: 1, firstName: 'G.I. Joe' },
    { id: 2, firstName: 'Miss Frizzle' },
    { id: 3, firstName: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return employees;
    },
    get: function(employeeId) {
      // Simple index lookup
      return employees[employeeId];
    }
  }
})

.factory('Explore', ['$resource',
    function ($resource) {
    return $resource('http://api.veggiesetgo.com/restaurants/:restaurantId', {});
    }])

.factory('Cuisines', ['$resource',
    function ($resource) {
    return $resource('http://api.veggiesetgo.com/cuisines/:cuisineId', {});
    }])

.factory('Locations', ['$resource',
  function ($resource) {
    return $resource('http://api.veggiesetgo.com/nearby/:lat/:lng', {});
  }])

.factory('myCache', function ($cacheFactory) {
        return $cacheFactory('myData');
});