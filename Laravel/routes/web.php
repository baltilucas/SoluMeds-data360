<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleController;

// Ruta principal
Route::get('/', function () {
    return view('welcome');
});

// Dashboard
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Rutas protegidas por autenticación
Route::middleware('auth')->group(function () {

    // Perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Página de paciente sin parámetro (por ejemplo, listado o formulario de búsqueda)
    Route::get('/paciente', function () {
        return view('paciente');
    })->name('paciente.index');

    // Mostrar paciente por ID
    Route::get('/paciente/{id}', [PacienteController::class, 'show'])->name('paciente.show');

    // Buscar paciente (POST)
    Route::post('/paciente/buscar', [DashboardController::class, 'buscarPaciente'])->name('buscar.paciente');

});
 
require __DIR__.'/auth.php';

// -----------------------------------
// RUTAS PARA LOGIN CON GOOGLE
// -----------------------------------
Route::get('/auth/google', [GoogleController::class, 'redirect'])->name('google.redirect');
Route::get('/auth/google/callback', [GoogleController::class, 'callback'])->name('google.callback');
