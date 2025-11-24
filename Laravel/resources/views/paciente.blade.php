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
                    <!-- Mostrar el mensaje de error, si existe -->
                    @if(isset($error))
                        <div class="alert alert-danger" role="alert">
                            {{ $error }}
                        </div>
                    @else
                        <!-- Mostrar los datos del paciente -->
                        <div class="card">
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
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
