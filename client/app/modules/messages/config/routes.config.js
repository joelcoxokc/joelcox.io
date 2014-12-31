;(function(){
  'use strict';

  angular
    .module('messages')
    .config( Messages );

    function Messages ($stateProvider) {

      $stateProvider
        .state('messages', {
          url: '/messages',
          templateUrl: 'app/modules/messages/views/messages.view.html',
          controller:  'MessagesCOntroller as vm',
          resolve:     {
            resolvedMessages: resolvedMessages
          }
        });

      ////////////////////////
      ///
      ///
      function resolvedMessages (Message) {
        return Message.all()
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {

            console.error(error);
          });
      }
    }

}).call(this);