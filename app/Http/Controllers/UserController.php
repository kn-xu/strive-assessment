<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Webpatser\Uuid\Uuid;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\QuestionResponse;

class UserController extends BaseController
{
    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|JsonResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function retrieve(Request $request)
    {
        $user = User::where('event_id', $request->get('eventId'))->with('QuestionResponse')->first();
        if (!$user) {
            return response('Invalid Event ID', JsonResponse::HTTP_BAD_REQUEST);
        }

        $user->returnLink = $request->getHost() . '/assessment?eventId=' . $user->event_id;
        $response['meta']['code'] = JsonResponse::HTTP_OK;
        $response['data'] = $user;

        return response()->json($response);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function validate(Request $request)
    {
        $params = $request->get('params');
        $user = User::where('email', $params['email'])->first();
        $response = array();
        $response['meta']['code'] = JsonResponse::HTTP_OK;

        if (!$user) {
            // If no user exists, create user
            $user = new User;
            $user->first_name = strtolower($params['firstName']);
            $user->last_name = strtolower($params['lastName']);
            $user->email = strtolower($params['email']);
            $user->event_id = Uuid::generate()->string;
            $user->time_remaining = 900000; // Saved as milliseconds
            $user->completed_test = false;
            $user->save();

            // Create response with FK pointing to user
            $questionResponses = new QuestionResponse;
            $questionResponses->user_id = $user->id;
            $questionResponses->save();
        }

        if (!$user->completed_test && $user->time_remaining > 0) {
            $response['data']['msg'] = 'User created or continuing.';
            $response['data']['action'] = 'assessment';
            $response['data']['eventId'] = $user->event_id;
        } else {
            $response['data']['action'] = 'completed';
            $response['data']['msg'] = 'User already completed';
        }

        return response()->json($response);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function saveResponse(Request $request)
    {
        $params = $request->get('params');
        $user = User::where('event_id', $params['event_id'])->first();
        $user->time_remaining = (int) $params['time_remaining'];
        $user->save();

        $responses = QuestionResponse::where('user_id', $user->id)->first();
        $paramResponses = $params['question_response'];

        $this->saveUserResponses($responses, $paramResponses);

        return response()->json('success', JsonResponse::HTTP_OK);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function complete(Request $request)
    {
        $params = $request->get('params');
        $user = User::where('event_id', $params['event_id'])->first();
        $user->time_remaining = 0;
        $user->completed_test = true;
        $user->save();

        $responses = QuestionResponse::where('user_id', $user->id)->first();
        $paramResponses = $params['question_response'];

        $this->saveUserResponses($responses, $paramResponses);

        return response()->json('success', JsonResponse::HTTP_OK);
    }

    /**
     * PRIVATE FUNCTIONS
     */

    /**
     * @param $responseObject
     * @param $userInput
     * @return mixed
     */
    private function saveUserResponses($responseObject, $userInput)
    {
        $responseObject->question_one_response = $userInput['question_one_response'];
        $responseObject->question_two_response = $userInput['question_two_response'];
        $responseObject->question_three_response = $userInput['question_three_response'];
        $responseObject->question_four_response = $userInput['question_four_response'];
        $responseObject->question_five_response = $userInput['question_five_response'];
        $responseObject->save();

        return $responseObject;
    }
}
