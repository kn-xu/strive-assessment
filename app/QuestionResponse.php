<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuestionResponse extends Model
{
    //
    protected $table = 'question_responses';

    public function User()
    {
        return $this->hasOne('App\User');
    }
}
