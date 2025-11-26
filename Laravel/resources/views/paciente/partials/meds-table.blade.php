<div class="overflow-x-auto">
    <table class="min-w-full border-collapse">
        <thead>
            <tr class="bg-gray-100 text-left text-gray-700 uppercase text-sm">
                <th class="py-3 px-4">Doctor</th>
                <th class="py-3 px-4">Medicamento</th>
                <th class="py-3 px-4">Dosis</th>
                <th class="py-3 px-4">Formato</th>
                <th class="py-3 px-4">Frecuencia</th>
                <th class="py-3 px-4">Principio Activo</th>
                <th class="py-3 px-4">Días Restantes</th>
                <th class="py-3 px-4">Acciones</th>
            </tr>
        </thead>

        <tbody class="text-gray-700">
            @foreach ($medicamentos as $med)
                <tr class="border-b hover:bg-gray-50 transition">
                    <td class="py-3 px-4">{{ $med['nombreDoctor'] }}</td>
                    <td class="py-3 px-4 font-semibold">{{ $med['nombre'] }}</td>
                    <td class="py-3 px-4">{{ $med['dosis'] }}</td>
                    <td class="py-3 px-4">{{ $med['formato'] }}</td>
                    <td class="py-3 px-4">{{ $med['frecuencia'] }}</td>
                    <td class="py-3 px-4">{{ $med['principioActivo'] }}</td>

                    <td class="py-3 px-4">
                        <span class="px-2 py-1 rounded text-sm
                            {{ $med['diasRestantes'] <= 0 ? 'bg-gray-300 text-gray-700' :
                               ($med['diasRestantes'] <= 3 ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800')
                            }}">
                            {{ $med['diasRestantes'] }}
                        </span>
                    </td>

                    <td class="py-3 px-4">
                        <button class="text-blue-600 text-sm hover:underline">Editar</button>
                        <button class="text-red-600 text-sm hover:underline">Eliminar</button>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
