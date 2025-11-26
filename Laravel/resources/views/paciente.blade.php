<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Paciente
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    @if(isset($error))
                        <div class="alert alert-danger" role="alert">
                            {{ $error }}
                        </div>
                    @else
                        <!-- Datos del paciente -->
                        <div class="card mb-4">
                            <div class="card-header">
                                <h3>Datos del Paciente</h3>
                            </div>
                            <div class="card-body">
                                <p><strong>Nombre:</strong> {{ $paciente[0]['nombrePaciente'] }}</p>
                                <p><strong>Apellido:</strong> <i>Censurado</i></p>
                                <p><strong>Fecha de Nacimiento:</strong> {{ \Carbon\Carbon::parse($paciente[0]['fechaNacimiento'])->format('d/m/Y') }}</p>
                                <p><strong>Sexo:</strong> {{ $paciente[0]['sexo'] == 1 ? 'Masculino' : 'Femenino' }}</p>
                                <p><strong>Teléfono:</strong> <i>Censurado</i></p>
                                <p><strong>Prais:</strong> {{ $paciente[0]['prais'] == 1 ? 'Sí' : 'No' }}</p>
                            </div>
                        </div>

                        <!-- Tabla de medicamentos -->
                        @if(count($medicamentos) > 0)
                            <div class="card">
                                <div class="card-header">
                                    <h3>Medicamentos</h3>
                                </div>
                                <div class="card-body p-0">
                                    <table class="table table-bordered table-hover mb-0">
                                        <thead class="table-dark text-center">
                                            <tr>
                                                <th class="font-weight-bold">Doctor</th>
                                                <th class="font-weight-bold">Medicamento</th>
                                                <th class="font-weight-bold">Dosis</th>
                                                <th class="font-weight-bold">Formato</th>
                                                <th class="font-weight-bold">Frecuencia (hrs)</th>
                                                <th class="font-weight-bold">Principio Activo</th>
                                                <th class="font-weight-bold">Días Restantes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach ($medicamentos as $med)
                                                <tr class="text-center align-middle">
                                                    <td>{{ $med['nombreDoctor'] ?? '' }}</td>
                                                    <td>{{ $med['nombre'] ?? '' }}</td>
                                                    <td>{{ $med['dosis'] ?? '' }}</td>
                                                    <td>{{ $med['formato'] ?? '' }}</td>
                                                    <td>{{ $med['frecuencia'] ?? '' }}</td>
                                                    <td>{{ $med['principioActivo'] ?? '' }}</td>
                                                    <td>{{ $med['diasRestantes'] ?? '' }}</td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        @else
                            <p class="text-muted mt-2">No se encontraron medicamentos para este paciente.</p>
                        @endif
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
