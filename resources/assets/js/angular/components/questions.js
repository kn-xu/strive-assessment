(function () {
    angular
        .module('strive.questions', [])
        .component('questions', {
            controller: QuestionsController,
            controllerAs: 'ctrl',
            templateUrl: '/views/angular/assessment/questions.html',
            bindings: {
                user: '=',
                step: '='
            }
        });

    QuestionsController.$inject = ['$state', 'QuestionFactory', 'ValidationFactory', 'Notification', 'HttpFactory'];

    function QuestionsController($state, QuestionFactory, ValidationFactory, Notification, HttpFactory) {
        var ctrl = this;
        var questionMapping = QuestionFactory.getStepsMapping();

        ctrl.$onInit = function() {
            ctrl.question = questionMapping[ctrl.step]['question'];
            ctrl.questionField = questionMapping[ctrl.step]['questionField'];

            ctrl.nextQuestion = nextQuestion;
            ctrl.previousQuestion = previousQuestion;
            ctrl.submitResponses = submitResponses;

            function nextQuestion() {
                if (!ctrl.user.question_response[ctrl.questionField]) {
                    Notification.info('Make sure to come back and answer this question!');
                }
                ctrl.step++;
            }

            function previousQuestion() {
                if (!ctrl.user.question_response[ctrl.questionField]) {
                    Notification.info('Make sure to come back and answer this question!');
                }
                ctrl.step--;
            }

            function submitResponses() {
                if (ValidationFactory.validateResponses(ctrl.user.question_response)) {
                    HttpFactory.post('/api/v1/complete', ctrl.user)
                        .then(function (response) {
                            $state.go('complete');
                        })
                        .catch(function (response) {
                            Notification.error('Something went wrong with saving your responses, please refresh and try again.');
                        })

                } else {
                    Notification.info('Please go back and check which responses you forgot to write answers for!');
                }
            }
        };
    }
})();
