// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('vc', ['ionic', 'vc.loginController', 'vc.inscriptionController', 'vc.home', 'vc.bookmarks', 'vc.roadmap','vc.navigation', 'vc.perf', 'vc.details'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // Each tab has its own nav history stack:

  .state('profil', {
    url: '/profil',
    templateUrl: 'templates/profil.html',
    controller: 'loginController'
  })
    .state('subscription', {
    url: '/subscription',
    templateUrl: 'templates/subscription.html',
    controller: 'inscriptionController'
  })

  .state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })

  .state('details', {
    url: '/details/:stationId',
    templateUrl: 'templates/details.html',
    controller: 'DetailsCtrl'
  })

  .state('bookmarks', {
    url: '/bookmarks',
    templateUrl: 'templates/bookmarks.html',
    controller: 'BookmarksCtrl'
  })

  .state('performance', {
    url: '/performance',
    templateUrl: 'templates/performance.html',
    controller: 'PerformanceCtrl'
  })
  .state('roadmap', {
    url: '/roadmap',
    templateUrl: 'templates/roadmap.html',
    controller: 'RoadmapCtrl'
 })
  .state('roadmapStation', {
      url: '/roadmap/selectedStation/:stationId',
      templateUrl: 'templates/roadmap.html',
      controller: 'RoadmapCtrl'
   })
  .state('navigation', {
     url: '/navigation',
     templateUrl: 'templates/navigation.html',
     controller: 'NavigationCtrl'
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

  //set $httpProvider interceptor for token
  $httpProvider.interceptors.push('APIInterceptor');

});

