(function () {
    angular
        .module('strive', [
            'ui.router',
            'ui.bootstrap',
            'ui-notification',
            'strive.factory',
            'strive.signIn',
            'strive.assessment'
        ])
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }])
        .config(function ($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'views/angular/home.html'
                })
                .state('assessment', {
                    url: '/assessment?id=:eventId',
                    templateUrl: 'views/angular/assessment/view.html'
                })
                .state('complete', {
                    url: '/complete',
                    templateUrl: 'views/angular/completed.html'
                })
        })
})();