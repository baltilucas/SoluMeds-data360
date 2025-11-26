<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class PacienteController extends Controller
{
    public function show($id)
    {
        // Datos del paciente
        $responsePaciente = Http::get("http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/pacientes/{$id}");
        $paciente = $responsePaciente->successful() ? $responsePaciente->json() : null;

        // Datos de medicamentos
        $responseMeds = Http::get("http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/consultaspaciente/medicamento/{$id}");
        $medicamentos = $responseMeds->successful() ? $responseMeds->json() : [];

        if (!$paciente || count($paciente) == 0) {
            return view('paciente', ['error' => 'Paciente no encontrado']);
        }

        return view('paciente', compact('paciente', 'medicamentos'));
    }
}
