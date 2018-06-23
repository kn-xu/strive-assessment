(function () {
    angular
        .module('strive.assessment', [
            'strive.factory',
            'strive.questions'
        ])
        .component('assessment', {
            controller: AssessmentController,
            controllerAs: 'ctrl',
            templateUrl: '/views/angular/assessment/assessment.index.html'
        });

    AssessmentController.$inject = ['$stateParams', 'ValidationFactory', 'HttpFactory', '$state', '$q', '$interval'];

    function AssessmentController($stateParams, ValidationFactory, HttpFactory, $state, $q, $interval) {
        var ctrl = this;

        ctrl.step = 0;
        ctrl.startTest = startTest;
        ctrl.testStarted = false;

        initDependencies();

        function initDependencies() {
            var promises = [
                HttpFactory.get('/api/v1/user', {eventId: $stateParams.eventId})
            ];

            $q.all(promises)
                .then(function (response) {
                    ctrl.user = response[0].data.data;
                    ctrl.timeLeftDisplay = getTimeDisplay(ctrl.user.time_remaining);

                    if (ctrl.user.time_remaining < 90000 && ctrl.user.completed_test === false) {
                        ctrl.title = 'Welcome Back! Please click the button below to continue';
                        ctrl.btnText = 'Continue';
                    } else {
                        ctrl.title = 'Welcome to the Strive Talent assessment. This assessment will allow you to ' +
                            'prove your potential to multiple employers at once. Good luck, and we\'ll be in touch!';
                        ctrl.btnText = 'Begin';
                    }
                })
                .catch(function (response) {
                    $state.go('home')
                })
        }

        function startTest() {
            ctrl.step = 1;
            ctrl.testStarted = true;
            startTimer();
            autoSave();
        }

        function autoSave() {
            ctrl.autoSaveTimer = $interval(function () {
                HttpFactory.post('/api/v1/saveResponse', ctrl.user)
            }, 15000)
        }

        function getTimeDisplay() {
            var minutes = parseInt(ctrl.user.time_remaining / 60000) % 60;
            var seconds = parseInt(ctrl.user.time_remaining / 1000) % 60;

            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            return minutes + ":" + seconds;
        }

        function startTimer() {
            ctrl.timer = $interval(function () {
                ctrl.timeLeftDisplay = getTimeDisplay(ctrl.user.time_remaining);
                ctrl.user.time_remaining -= 1000;

                if (ctrl.user.time_remaining <= 1000) {
                    ctrl.user.time_remaining = 0;
                    ctrl.user.completed_test = true;
                    stopTimer();
                }
            }, 1000);
        }

        function stopTimer() {
            $interval.cancel(ctrl.timer);
            $interval.cancel(ctrl.autoSaveTimer);
        }
    }
})();
