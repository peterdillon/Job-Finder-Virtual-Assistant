angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards' , 'ngCordova'])


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

   $ionicConfigProvider.tabs.position('bottom'); 
    
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

     $stateProvider.state('chatassist-angular', {
      url: '/chatassist-angular',
      views: { 'tab-chatassist-angular': { templateUrl: 'templates/chatassist-angular.html' } }
    });
    /* ----------------------------------- */


    $stateProvider.state('chatassist', {
      url: '/chatassist',
      views: { 'tab-chatassist': { templateUrl: 'templates/chatassist.html' } }
    });

    $stateProvider.state('chatassist-static', {
      url: '/chatassist-static',
      views: { 'tab-chatassist-static': { templateUrl: 'templates/chatassist-static.html' } }
    });

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

  // Job Card Swipe
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

  // Hide Tabs For Chat Assist
  .directive('hideTabs', function($rootScope) {
    return {
      restrict: 'A',
      link: function($scope, $el) {
          $rootScope.hideTabs = 'tabs-item-hide';
          $scope.$on('$destroy', function() {
              $rootScope.hideTabs = '';
        });
      }
    };
  })

  // All this does is allow the message to be sent when you tap return
  .directive('input', function($timeout) {
    return {
      restrict: 'E',
      scope: {
        'returnClose': '=',
        'onReturn': '&',
        'onFocus': '&',
        'onBlur': '&'
      },
      link: function(scope, element, attr) {
        element.bind('focus', function(e) {
          if (scope.onFocus) {
            $timeout(function() {
              scope.onFocus();
            });
          }
        });
        element.bind('blur', function(e) {
          if (scope.onBlur) {
            $timeout(function() {
              scope.onBlur();
            });
          }
        });
        element.bind('keydown', function(e) {
          if (e.which == 13) {
            if (scope.returnClose) element[0].blur();
            if (scope.onReturn) {
              $timeout(function() {
                scope.onReturn();
              });
            }
          }
        });
      }
    }
  })


// .controller("DIController", function($scope, $timeout){

//     $scope.callAtTimeout = function() {
//         console.log("$scope.callAtTimeout - Timeout occurred");
//     }

//     $timeout( function(){ $scope.callAtTimeout(); }, 3000);
// })
// ----------------------------------------------------------------------------------------

.controller('MessageCtrl', function($scope, $timeout, $ionicScrollDelegate) { 

  $scope.sendMessage = function() {    
    $ionicScrollDelegate.scrollBottom(true);
  
  // Ugh - think more on this...
  //   $timeout(function() {
  //       var x =  angular.element( document.getElementById("chat1") );
  //       x.addClass('slide-right');
  // }, 10);  
  
  };

})
.directive("sendbutton", function(){
  return {
    restrict: "E",
    template: "<button processanswer class='button button-clear app-color chat-button-position' ng-click='sendMessage()'>Send</button>"
  }
})
.directive("processanswer", function($compile, $animate){
  return function(scope, element, attrs){
    element.bind("click", function(){

      if (scope.inputVal == "Manager") {
        angular
          .element(document.getElementById('chat'))
          .append($compile("<div class='messages other'><p id='chat1' class='message slide-right'>" + scope.inputVal +"</p></div><div class='messages'><p class='message'>I see you've typed <i>Manager</i>. Please add the location you are seeking:</p></div>")(scope));
        clearInput();
      }
      //-------------------------------
      if (scope.inputVal == "New York") {
        angular
          .element(document.getElementById('chat'))
          .append($compile("<div class='messages other'><p class='message slide-right'>" + scope.inputVal +"</p></div><div class='messages'><p class='message'>I see you've typed <i>New York</i>. Would you like to have your assigned recruiter 'ANGELA MORENO' call you?</p>")(scope));
        clearInput();
      }
      //-------------------------------
      if (scope.inputVal == "Yes, please call me") {
        angular
          .element(document.getElementById('chat'))
          .append($compile("<div class='messages other slide-right'><p class='message slide-right'>" + scope.inputVal +"</p></div><div class='messages'><p class='message'>Great! You will hear from 'ANGELA MORENO' shortly about positions in New York. Would you like to see job based on your current criteria?</p>")(scope));
        clearInput();
      }
      //-------------------------------
      if (scope.inputVal == "Yes, please show me jobs") {
        angular
          .element(document.getElementById('chat'))
          .append($compile("<div class='messages other slide-right'><p class='message slide-right'>" + scope.inputVal +"</p></div><div class='messages'><p class='message'>Here's a <a ng-href='#/swipe'>list of jobs</a>  based on your criteria. You can also <a ng-href='#/settings'>adjust your job preference settings</a>.</p>")(scope));
        clearInput();
      }
    });
  };
})


//-----------------------------------------------------------------------------------------

// Populate array on screen
// .controller("MessageCtrl", function($scope){
//  $scope.name="Anonymous"
//     $scope.fruits=[];
//     $scope.addFruit=function(){
//         $scope.fruits.push($scope.newFruit);
//     }
// })


// Original message display
// .controller('Messages', function($scope, $timeout, $ionicScrollDelegate) {
//   $scope.hideTime = true;
//   var alternate,
//     isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
  
//     $scope.sendMessage = function() {
//       alternate = !alternate;
//       var d = new Date();
//       d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

//       $scope.messages.push({
//         userId: alternate ? '12345' : '54321',
//         text: $scope.data.message,
//         time: d
//       });

//       delete $scope.data.message;
//       $ionicScrollDelegate.scrollBottom(true);
//     };
    
//     $scope.inputUp = function() {
//       if (isIOS) $scope.data.keyboardHeight = 216;
//       $timeout(function() {
//         $ionicScrollDelegate.scrollBottom(true);
//       }, 300);

//     };

//     $scope.inputDown = function() {
//       if (isIOS) $scope.data.keyboardHeight = 0;
//       $ionicScrollDelegate.resize();
//     };

//     $scope.closeKeyboard = function() {
//       // cordova.plugins.Keyboard.close();
//     };

//     $scope.data = {};
//     $scope.myId = '12345';
//     $scope.messages = [];
// })


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


//---------------------------------------------------------------------
// TODO: Learn how to oncorporate these into the controller/directive
// Datalist function
(function(window,document) {
  if (document.querySelectorAll) {
    var inputs = document.querySelectorAll('input[list]'),
        total = inputs.length;
    for (var i=0; i<total; i++) {
      var input = inputs[i],
        id = input.getAttribute('list'),
        list = document.getElementById(id),
        options = list.getElementsByTagName('option'),
        amount = options.length,
        //rand = Math.floor(Math.random()*amount),
        // option = options[rand],
        value = option.getAttribute('value');
      input.setAttribute('placeholder',value);
    }
  }
})(this,this.document);

// For chat assist input - because datalist value remains
function clearInput() {
  var x =  document.getElementById("inputVal");
    x.value = "";
}

// For file browser - browser only - we'll probably use a GDoc,
// or other API to link to, upload, share a resume
// Remove for PROD!
function handleBrowseClick() {
  var fileinput = document.getElementById("browse");
  fileinput.click();
}
function handleChange() {
  var fileinput = document.getElementById("browse");
  var textinput = document.getElementById("filename");
  textinput.value = fileinput.value;
}



