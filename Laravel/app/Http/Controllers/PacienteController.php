<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http; // Para usar el HTTP Client de Laravel
use Carbon\Carbon;

class PacienteController extends Controller
{
   public function show($id)
{
    // Hacer la solicitud a la API de Express
    $response = Http::get("http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/pacientes/{$id}");

    // Verificamos si la respuesta es exitosa
    if ($response->successful()) {
        $paciente = $response->json(); // Los datos vienen en formato JSON

        // Verifica si hay al menos un paciente en la respuesta
        if (count($paciente) > 0) {
            return view('paciente', compact('paciente'));
        } else {
            return view('paciente', ['error' => 'Paciente no encontrado']);
        }
    }

    // Si la API no responde correctamente, muestra un mensaje de error
    return view('paciente', ['error' => 'No se pudo obtener los datos del paciente']);
}

}
