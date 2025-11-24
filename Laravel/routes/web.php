<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PacienteController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/paciente', function () {
    return view('paciente');
})->middleware(['auth', 'verified'])->name('paciente');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/paciente/{id}', [PacienteController::class, 'show'])->name('paciente');
    
});

require __DIR__.'/auth.php';
