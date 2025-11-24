<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/contacto', function () {
    return view('contacto');
});

Route::get('/dashboard', function () {
    return view('dashboard');
});


Route::post('/contacto/enviar', [ContactoController::class, 'enviar'])
     ->name('contacto.enviar');