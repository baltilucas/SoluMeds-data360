<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class PacienteController extends Controller
{
    public function show($id)
    {
        // ============================
        // 1. Datos del paciente
        // ============================
        $responsePaciente = Http::get("http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/pacientes/{$id}");
        $paciente = $responsePaciente->successful() ? $responsePaciente->json() : null;

        if (!$paciente || count($paciente) == 0) {
            return view('paciente', ['error' => 'Paciente no encontrado']);
        }

        // ============================
        // 2. Datos de medicamentos
        // ============================
        $responseMeds = Http::get("http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/consultaspaciente/medicamento/{$id}");
        $medicamentosRaw = $responseMeds->successful() ? $responseMeds->json() : [];

        // ============================
        // 3. Datos de alergias
        // ============================
        $responseAlergias = Http::get("http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/alergiaspaciente/paciente/{$id}");
        $alergias = $responseAlergias->successful() ? $responseAlergias->json() : [];

        // ============================
        // 4. Clasificar medicamentos:
        //    → Vigentes
        //    → Históricos (vencidos)
        // ============================
        $hoy = Carbon::today();
        $medicamentos = [];
        $medicamentosHistoricos = [];

        foreach ($medicamentosRaw as $med) {
            $fin = Carbon::parse($med['finalReceta']);

            if ($fin->isPast()) {
                // Receta vencida → histórico
                $medicamentosHistoricos[] = $med;
            } else {
                // Aún vigente
                $medicamentos[] = $med;
            }
        }

        // ============================
        // 5. Enviar todo a la vista
        // ============================
        return view('paciente', [
            'paciente' => $paciente,
            'medicamentos' => $medicamentos,
            'medicamentosHistoricos' => $medicamentosHistoricos,
            'alergias' => $alergias
        ]);
    }
}
