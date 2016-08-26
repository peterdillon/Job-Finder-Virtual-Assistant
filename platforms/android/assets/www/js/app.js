angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards' , 'ngCordova'])


.config(function($stateProvider, $urlRouterProvider) {
    
    
   $stateProvider.state('home', {
      url: '/home',
      views: { 'tab-home': { templateUrl: 'templates/home.html' } }
    });
   
   /* ----------------------------------- */
    $stateProvider.state('assistant', {
      url: '/assistant',
      views: { 'tab-assistant': { templateUrl: 'templates/assistant.html' } }
    });
    $stateProvider.state('q1', {
      url: '/q1',
      views: {  'tab-assistant': { templateUrl: 'templates/q1.html' } }
    });
    $stateProvider.state('q2', {
      url: '/q2',
      views: {  'tab-assistant': { templateUrl: 'templates/q2.html' } }
    });
    $stateProvider.state('q3', {
      url: '/q3',
      views: {  'tab-assistant': { templateUrl: 'templates/q3.html' } }
    });
    /* ----------------------------------- */

    $stateProvider.state('settings', {
      url: '/settings',
      views: {  'tab-settings': { templateUrl: 'templates/settings.html' } }
    });

    $stateProvider.state('saved', {
      url: '/saved',
      views: {  'tab-saved': { templateUrl: 'templates/saved.html' } }
    });

    $stateProvider.state('swipe-cards', {
      url: '/swipe',
      views: {  'tab-swipe-cards': { templateUrl: 'templates/swipe.html' } }
    });

    $stateProvider.state('search', {
      url: '/search',
      views: {  'tab-search': { templateUrl: 'templates/search.html' } }
    });

    $stateProvider.state('locator', {
      url: '/locator',
      views: {  'tab-locator': { templateUrl: 'templates/locator.html' } }
    });

    $stateProvider
      .state('map', {
        url: '/',
        templateUrl: 'templates/q2.html',
        controller: 'MapCtrl'
      });

    $urlRouterProvider.otherwise('/home');

  })

  .directive('noScroll', function($document) {

      return {
        restrict: 'A',
        link: function($scope, $element, $attr) {

          $document.on('touchmove', function(e) {
            e.preventDefault();
          });
        }
      }
    })

// MapCtrl ------------------------------------------

  .controller('MapCtrl', function($scope, $ionicLoading) {
 
      google.maps.event.addDomListener(window, 'load', function() {
          var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
   
          var mapOptions = {
              center: myLatlng,
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          };
   
          var map = new google.maps.Map(document.getElementById("map"), mapOptions);
   
          navigator.geolocation.getCurrentPosition(function(pos) {
              map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
              var myLocation = new google.maps.Marker({
                  position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                  map: map,
                  title: "My Location"
              });
          });
   
          $scope.map = map;
      });
   
  })

// END MapCtrl ------------------------------------------


  .controller('CardsCtrl', function($scope, TDCardDelegate) {
    console.log('CARDS CTRL');
    var cardTypes = [
      { image: 'job-cards/swipe-1.png' },
      { image: 'job-cards/swipe-2.png' },
      { image: 'job-cards/swipe-3.png' },
      { image: 'job-cards/swipe-1.png' },
      { image: 'job-cards/swipe-2.png' },
      { image: 'job-cards/swipe-3.png' },
      { image: 'job-cards/swipe-1.png' },
      { image: 'job-cards/swipe-2.png' },
      { image: 'job-cards/swipe-3.png' }
    ];

    $scope.cards = Array.prototype.slice.call(cardTypes, 0);

    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function() {
      var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      newCard.id = Math.random();
      $scope.cards.push(angular.extend({}, newCard));
    }
  })

  .controller('CardCtrl', function($scope, TDCardDelegate) {
      $scope.cardSwipedLeft = function(index) {
        console.log('LEFT SWIPE');
        $scope.addCard();
      };
      $scope.cardSwipedRight = function(index) {
        console.log('RIGHT SWIPE');
        $scope.addCard();
      };
  })

  .controller('ModalCtrl', function($scope, $ionicModal) {

      $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });


  });


function handleBrowseClick() {
  var fileinput = document.getElementById("browse");
  fileinput.click();
}
function handleChange() {
  var fileinput = document.getElementById("browse");
  var textinput = document.getElementById("filename");
  textinput.value = fileinput.value;
}
