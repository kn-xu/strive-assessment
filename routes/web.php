<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::any('{path?}', function () {
    return view('welcome');
})->where("all", "^((?!api).)*");

Route::get('api/v1/user', "UserController@retrieve");
Route::post("api/v1/validate", "UserController@validate");
Route::post("api/v1/saveResponse", "UserController@saveResponse");
Route::post("api/v1/complete", "UserController@complete");