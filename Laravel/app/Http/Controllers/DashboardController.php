<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DashboardController extends Controller
{
    public function buscarPaciente(Request $request)
    {
        $rut = $request->input('rut');

        // Llamada a la API para obtener el id del paciente
        $response = Http::get("http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/pacientes/rut/{$rut}");

        if ($response->successful()) {
            $paciente = $response->json();
            $id = $paciente['idPaciente'] ?? null;

            if ($id) {
                // Redirige usando la ruta correcta con parámetro
                return redirect()->route('paciente.show', ['id' => $id]);
            }
        }

        return back()->with('error', 'Paciente no encontrado');
    }
}
