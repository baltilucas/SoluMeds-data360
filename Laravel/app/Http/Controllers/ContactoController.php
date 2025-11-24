<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactoController extends Controller
{
    public function enviar(Request $request)
    {
        // Validación
        $validated = $request->validate([
            'nombre'   => 'required|string|max_length:255',
            'correo'   => 'required|email',
            'consulta' => 'required|string|min:5',
            'telefono' => 'required|string|max:20',
        ]);

        // Aquí puedes guardar en BD, enviar correo, etc.
        // Por ahora solo devolvemos un mensaje.

        return back()->with('success', '¡Consulta enviada correctamente!');
    }
}
