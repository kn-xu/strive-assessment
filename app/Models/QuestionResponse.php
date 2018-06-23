<?php

namespace App\Models;

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
