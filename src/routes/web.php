<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
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

// Route::get('/', function () {
//     return view('welcome');
// });

// Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::group(['middleware' => 'api'], function()
{
   Route::get('/api/posts', [PostController::class, 'index'])
   ->name('index');
   Route::POST('/api/posts/create', [PostController::class, 'create'])
   ->name('create');
   Route::post('/api/posts/edit', [PostController::class, 'edit'])
   ->name('edit');
   Route::post('/api/posts/update', [PostController::class, 'update'])
   ->name('update');
   Route::post('/api/posts/delete', [PostController::class, 'delete'])
   ->name('delete');
});

Route::get('{any}', function () {
    return view('app');
})->where('any','.*');