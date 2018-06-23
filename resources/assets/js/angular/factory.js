(function () {
    angular
        .module('strive.factory', [])
        .factory('HttpFactory', HttpFactory)
        .factory('ValidationFactory', ValidationFactory)
        .factory('QuestionFactory', QuestionFactory);

    /**
     * http request factory
     *
     * @param $http
     * @returns {{get: get}}
     */
    function HttpFactory($http) {
        return {
            get: get,
            post: post
        };

        /**
         * Get request with optional params
         *
         * @param url
         * @param params
         */
        function get(url, params) {
            if (params) {
                return $http.get(url, {params: params});
            } else {
                return $http.get(url);
            }
        }

        /**
         * Post request with params
         *
         * @param url
         * @param params
         * @returns {*|void|undefined|AxiosPromise<any>}
         */
        function post(url, params) {
            if (!url || !params) {
                return;
            }

            return $http.post(url, {params: params});
        }
    }

    /**
     * Validate service
     *
     * @returns {{validateUser: validateUser}}
     * @constructor
     */
    function ValidationFactory() {
        return {
            validateUser: validateUser,
            validateResponses: validateResponses
        };

        /**
         * Validate user input for their information
         *
         * @param user
         * @returns {boolean}
         */
        function validateUser(user) {
            if (!user.firstName || !user.lastName || !user.email) {
                return false;
            }

            let emailRegex = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/

            if (!user.email.toLowerCase().match(emailRegex)) {
                return false;
            }

            return true;
        }

        function validateResponses(responses) {
            if (!responses['question_one_response'] ||
                !responses['question_two_response'] ||
                !responses['question_three_response'] ||
                !responses['question_four_response'] ||
                !responses['question_five_response']) {
                return false;
            }

            return true;
        }
    }

    /**
     *
     * @returns {{getStepsMapping: getStepsMapping}}
     * @constructor
     */
    function QuestionFactory() {
        return {
            getStepsMapping: getStepsMapping
        };

        function getStepsMapping() {
            return {
                1: {
                    question: 'In your career thus far, what has been your favorite job and least favorite job and why?',
                    questionField: 'question_one_response'
                },
                2: {
                    question: 'What do you hope to be doing professionally five years from now?',
                    questionField: 'question_two_response'
                },
                3: {
                    question: 'Imagine that you work at a home repair company. You recently visited a homeowner and gave them a proposal for $5,000 in repairs to fix a broken outdoor staircase ($1,000), fix a storm drain ($500) and install storm windows for the living room ($3,500). \n' +
                    '\n' +
                    'You receive the below email from the client later. Please write your reply below:\n' +
                    '\n' +
                    'Hey! Thanks for coming by earlier. I\'m interested in having your home repair company give my house some touch-ups, but I just can\'t afford the $5,000 right now. I\'ll be back in touch in six months when I\'m done with car payments and can discuss it then. Have a great day! - Doris\n' +
                    '\n',
                    questionField: 'question_three_response'
                },
                4: {
                    question: 'Imagine that you are hired to work at a home repair company. Please describe how you would go about generating customers for your new company.',
                    questionField: 'question_four_response'
                },
                5: {
                    question: 'What is a CRM?\n' +
                    '\n' +
                    'What are the greatest benefits of using a CRM?',
                    questionField: 'question_five_response'
                }
            }
        }
    }
})();