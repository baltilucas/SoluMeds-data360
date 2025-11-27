<x-app-layout>
<x-slot name="header">
    <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Ficha del Paciente
    </h2>
</x-slot>

<div class="py-10" x-data="{ tab: 'info' }">
    <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">

        @if(isset($error))
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {{ $error }}
            </div>
        @else

        <!-- ======================= TABS ======================= -->
        <div class="flex space-x-4 border-b mb-6">
            <button :class="tab === 'info' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'"
                    @click="tab='info'" class="pb-2 border-b-2">
                Información
            </button>
            <button :class="tab === 'alergias' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'"
                    @click="tab='alergias'" class="pb-2 border-b-2">
                Alergias
            </button>
            <button :class="tab === 'meds' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'"
                    @click="tab='meds'" class="pb-2 border-b-2">
                Medicamentos Vigentes
            </button>
            <button :class="tab === 'hist' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'"
                    @click="tab='hist'" class="pb-2 border-b-2">
                Recetas Históricas
            </button>
        </div>

        <!-- ================= TAB INFO ================= -->
        <div x-show="tab === 'info'" class="space-y-4">
            <div class="bg-white shadow-md rounded-lg p-6 border border-gray-100">
                <div class="flex items-center mb-4">
                    <div class="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                        {{ strtoupper(substr($paciente[0]['nombrePaciente'], 0, 1)) }}
                    </div>
                    <div class="ml-4">
                        <h3 class="text-xl font-semibold text-gray-800">{{ $paciente[0]['nombrePaciente'] }}</h3>
                        <p class="text-gray-500 text-sm">Ficha Médica</p>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <p class="text-gray-600"><strong>Apellido:</strong> *******</p>
                        <p class="text-gray-600"><strong>Fecha Nacimiento:</strong> {{ \Carbon\Carbon::parse($paciente[0]['fechaNacimiento'])->format('d/m/Y') }}</p>
                        <p class="text-gray-600">
                            <strong>Sexo:</strong>
                            <span class="px-2 py-1 rounded text-white text-sm {{ $paciente[0]['sexo'] == 1 ? 'bg-blue-600' : 'bg-pink-500' }}">
                                {{ $paciente[0]['sexo'] == 1 ? 'Masculino' : 'Femenino' }}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p class="text-gray-600"><strong>Teléfono:</strong> *******</p>
                        <p class="text-gray-600">
                            <strong>PRAIS:</strong>
                            <span class="px-2 py-1 text-sm rounded {{ $paciente[0]['prais'] == 1 ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600' }}">
                                {{ $paciente[0]['prais'] == 1 ? 'Sí' : 'No' }}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ================= TAB ALERGIAS ================= -->
        <div x-show="tab === 'alergias'" class="space-y-4">

            <div class="bg-white shadow-md rounded-lg p-6 border border-gray-100">
                <div class="flex justify-between mb-4">
                    <h3 class="text-lg font-semibold">Alergias del Paciente</h3>
                    <button onclick="openAlergiaModal()" 
                            class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        + Agregar
                    </button>
                </div>

                <div class="grid md:grid-cols-2 gap-4">
                    @forelse($alergias as $al)
                        <div class="border rounded-lg p-4 hover:bg-gray-50 transition">
                            <p class="font-semibold text-gray-800">{{ $al['nombre_alergia'] }}</p>
                            <p class="text-sm"><strong>Síntomas:</strong> {{ $al['sintomas'] }}</p>

                            <p class="text-sm mt-1">
                                <strong>Severidad:</strong>
                                <span class="px-2 py-1 text-xs rounded 
                                    @if($al['severidad']=='SEVERO') bg-red-200 text-red-800
                                    @elseif($al['severidad']=='MODERADO') bg-yellow-200 text-yellow-800
                                    @else bg-green-200 text-green-800 @endif">
                                    {{ ucfirst(strtolower($al['severidad'])) }}
                                </span>
                            </p>

                            <p class="text-sm mt-1">
                                <strong>Diagnóstico:</strong> 
                                {{ \Carbon\Carbon::parse($al['fechaDiagnostico'])->format('d/m/Y') }}
                            </p>

                            <div class="flex space-x-2 mt-3">
                                <button class="text-blue-600 text-sm hover:underline">Editar</button>
                                <button class="text-red-600 text-sm hover:underline">Eliminar</button>
                            </div>
                        </div>
                    @empty
                        <p class="text-gray-500">No hay alergias registradas.</p>
                    @endforelse
                </div>
            </div>

            <!-- ============= MODAL AGREGAR ALERGIA ============= -->
            <div id="modalAlergia" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">

                    <h2 class="text-lg font-semibold mb-4">Agregar Alergia</h2>

                    <form id="formAlergia">

                        <div class="mb-3">
                            <label class="block text-sm font-medium">Nombre Alergia</label>
                            <input type="text" id="alergiaNombre" class="border rounded w-full px-3 py-2" required>
                        </div>

                        <div class="mb-3">
                            <label class="block text-sm font-medium">Severidad</label>
                            <select id="alergiaSeveridad" class="border rounded w-full px-3 py-2" required>
                                <option value="">Seleccione</option>
                                <option value="1">Leve</option>
                                <option value="2">Moderado</option>
                                <option value="3">Severo</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="block text-sm font-medium">Síntomas</label>
                            <textarea id="alergiaSintomas" class="border rounded w-full px-3 py-2"></textarea>
                        </div>

                        <div class="mb-3">
                            <label class="block text-sm font-medium">Fecha Diagnóstico</label>
                            <input type="date" id="alergiaFecha" class="border rounded w-full px-3 py-2">
                        </div>

                        <div class="flex justify-end space-x-2 mt-4">
                            <button type="button" onclick="closeAlergiaModal()" class="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
                        </div>

                    </form>
                </div>
            </div>
            <!-- ================================================= -->

        </div>

        <!-- ================= TAB MEDICAMENTOS ================= -->
        <div x-show="tab === 'meds'" class="space-y-4">
            <div class="bg-white shadow-md rounded-lg p-6 border border-gray-100">
                <div class="flex justify-between mb-4">
                    <h3 class="text-lg font-semibold">Medicamentos Activos</h3>
                    <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">+ Agregar</button>
                </div>
                @include('paciente.partials.meds-table', ['medicamentos' => $medicamentos])
            </div>
        </div>

        <!-- ================= TAB HISTORICO ================= -->
        <div x-show="tab === 'hist'" class="space-y-4">
            <div class="bg-white shadow-md rounded-lg p-6 border border-gray-100">
                <h3 class="text-lg font-semibold mb-4">Recetas Históricas</h3>
                @include('paciente.partials.meds-table', ['medicamentos' => $medicamentosHistoricos])
            </div>
        </div>

        @endif
    </div>
</div>

<!-- ======================= JAVASCRIPT ======================= -->
<script>
function openAlergiaModal() {
    document.getElementById('modalAlergia').classList.remove('hidden');
}

function closeAlergiaModal() {
    document.getElementById('modalAlergia').classList.add('hidden');
}

document.getElementById('formAlergia').addEventListener('submit', async function(e) {
    e.preventDefault();

    const idPaciente = {{ $paciente[0]['idPaciente'] }};

    const nombre = document.getElementById('alergiaNombre').value;
    const idSeveridad = parseInt(document.getElementById('alergiaSeveridad').value); // <-- aseguramos que sea 1,2,3 (número)
    const sintomas = document.getElementById('alergiaSintomas').value;
    const fechaDiagnostico = document.getElementById('alergiaFecha').value;
    // 👀 DEBUG: ver datos antes de enviar
    console.log("DATOS A ENVIAR:", {
        idPaciente,
        nombre,
        idSeveridad,
        sintomas,
        fechaDiagnostico
    });

    // URL correcta de tu API
    const url = `http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/alergiapaciente/ingreso/${idPaciente}/${nombre}`;

    try {
        const resp = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                idSeveridad,   // ← ahora es numérico
                sintomas,
                fechaDiagnostico
            })
        });

        const data = await resp.json();

        if (!resp.ok) {
            alert("Error: " + data.message);
            return;
        }

        alert("Alergia agregada correctamente");

        closeAlergiaModal();
        location.reload();

    } catch (error) {
        console.error(error);
        alert("Error al guardar alergia");
    }
});
</script>
</x-app-layout>