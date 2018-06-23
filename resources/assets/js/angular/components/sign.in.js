(function () {
    angular
        .module('strive.signIn', [
            'strive.factory'
        ])
        .component('signIn', {
            controller: SignInController,
            controllerAs: 'ctrl',
            templateUrl: '/views/angular/sign.in.html'
        });

    SignInController.$inject = ['ValidationFactory', 'HttpFactory', '$state'];

    /**
     *
     * @param ValidationFactory
     * @param HttpFactory
     * @param $state
     * @constructor
     */
    function SignInController(ValidationFactory, HttpFactory, $state) {
        var ctrl = this;

        ctrl.user = {};
        ctrl.submitUser = submitUser;

        function submitUser() {
            if (ValidationFactory.validateUser(ctrl.user)) {
                HttpFactory.post('/api/v1/validate', ctrl.user)
                    .then(function (response) {
                        if (response.data.data.action === 'assessment') {
                            $state.go('assessment', {eventId: response.data.data.eventId});
                        } else {
                            $state.go('complete');
                        }
                    })
                    .catch(function (response) {

                    })
                    .finally(function (response) {

                    })
            } else {

            }
        }
    }
})();