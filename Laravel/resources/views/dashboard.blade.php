<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Bienvenido {{ auth()->user()->name }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                
                <form action="{{ route('buscar.paciente') }}" method="POST">
                    @csrf
                    <div class="mb-4">
                        <label for="rut" class="block text-gray-700 font-bold mb-2">RUT del paciente:</label>
                        <input type="text" name="rut" id="rut" class="border rounded w-full py-2 px-3" placeholder="Ej: 20496709-1" required>
                    </div>
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Buscar paciente
                    </button>
                </form>

            </div>
        </div>
    </div>

    <div class="mt-6" style="max-width: 500px; max-height: 400px; margin: auto;">
    <canvas id="alergiasChart"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
fetch('http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/consultas/alergias/top')
    .then(response => response.json())
    .then(data => {
        const nombres = data.map(item => item.nombreAlergia);
        const totales = data.map(item => parseInt(item.total));

        const colores = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
            '#FF9F40', '#C9CBCF', '#8AFF33', '#FF33F6', '#33FFF3'
        ];

        const ctx = document.getElementById('alergiasChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: nombres,
                datasets: [{
                    data: totales,
                    backgroundColor: colores.slice(0, nombres.length),
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // importante para que respete el tamaño del contenedor
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}`;
                            }
                        }
                    }
                }
            }
        });
    })
    .catch(err => console.error('Error al obtener datos:', err));
</script>

</x-app-layout>
