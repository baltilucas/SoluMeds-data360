<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Bienvenido {{ auth()->user()->name }}
        </h2>
    </x-slot>


    <!-- ======================================================
         SECCIÓN: MÉTRICAS PRINCIPALES (KPIs) + BÚSQUEDA RÁPIDA
    ======================================================= -->
    <div class="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">

        <!-- KPI 1: Pacientes registrados (dinámico) -->
        <div class="bg-white shadow rounded-lg py-3 px-5 text-center">
            <h3 class="text-sm text-gray-500">Pacientes registrados</h3>
            <p id="kpiUsuarios" class="text-2xl font-bold mt-1">Cargando...</p>
        </div>

        <!-- KPI 2: Consultas del mes -->
        <div class="bg-white shadow rounded-lg py-3 px-5 text-center">
            <h3 class="text-sm text-gray-500">Consultas este mes</h3>
            <p class="text-2xl font-bold mt-1">412</p>
        </div>

        <!-- KPI 3: Investigaciones activas -->
        <div class="bg-white shadow rounded-lg py-3 px-5 text-center">
            <h3 class="text-sm text-gray-500">Investigaciones activas</h3>
            <p class="text-2xl font-bold mt-1">12</p>
        </div>

        <!-- KPI 4: Búsqueda rápida de paciente -->
        <div class="bg-blue-600 shadow rounded-lg py-3 px-5 text-center text-white">
            <h3 class="text-sm">Buscar paciente</h3>

            <form action="{{ route('buscar.paciente') }}" method="POST" class="mt-2">
                @csrf
                <input 
                    type="text" 
                    name="rut" 
                    placeholder="Ej: 20496709-1"
                    class="w-full px-2 py-1 rounded text-black"
                    required
                >
                <button class="mt-2 bg-blue-800 hover:bg-blue-900 w-full py-1 rounded text-white font-semibold">
                    Buscar
                </button>
            </form>
        </div>

    </div>



    <!-- ======================================================
                    SECCIÓN: GRÁFICOS ESTADÍSTICOS
    ======================================================= -->
    <div class="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

        <!-- Gráfico 1: Alergias más comunes -->
        <div class="bg-white shadow rounded-lg p-4">
            <h3 class="font-semibold text-center mb-3">Alergias más comunes</h3>
            <div style="height: 300px;">
                <canvas id="alergiasChart"></canvas>
            </div>
        </div>

        <!-- Gráfico 2: Distribución por edad -->
        <div class="bg-white shadow rounded-lg p-4">
            <h3 class="font-semibold text-center mb-3">Distribución por edad</h3>
            <div style="height: 300px;">
                <canvas id="chart2"></canvas>
            </div>
        </div>

        <!-- Gráfico 3: Distribución por sexo -->
        <div class="bg-white shadow rounded-lg p-4">
            <h3 class="font-semibold text-center mb-3">Distribución por sexo</h3>
            <div style="height: 300px;">
                <canvas id="chart3"></canvas>
            </div>
        </div>

    </div>



    <!-- ======================================================
                      SCRIPTS: KPIs + GRÁFICOS
    ======================================================= -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <script>
    /* KPI: Total de pacientes registrados */
    fetch('http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/consultas/usuarios')
        .then(response => response.json())
        .then(data => {
            const total = data[0]?.usuarios ?? 0;
            document.getElementById('kpiUsuarios').textContent = total;
        })
        .catch(() => document.getElementById('kpiUsuarios').textContent = '—');



    /* Gráfico 1: Alergias más comunes */
    fetch('http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/consultas/alergias/top')
        .then(response => response.json())
        .then(data => {
            const nombres = data.map(item => item.nombreAlergia);
            const totales = data.map(item => parseInt(item.total));

            const colores = [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                '#9966FF', '#FF9F40', '#C9CBCF', '#8AFF33',
                '#FF33F6', '#33FFF3'
            ];

            new Chart(document.getElementById('alergiasChart'), {
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
                options: { responsive: true, maintainAspectRatio: false }
            });
        });



    /* Gráfico 2: Distribución por edad */
    fetch('http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/consultas/edad')
        .then(response => response.json())
        .then(data => {
            const grupos = data.map(item => item.grupoEdad);
            const totales = data.map(item => item.total);

            new Chart(document.getElementById('chart2'), {
                type: 'bar',
                data: {
                    labels: grupos,
                    datasets: [{
                        label: 'Pacientes',
                        data: totales,
                        backgroundColor: '#36A2EB'
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { x: { beginAtZero: true } }
                }
            });
        });



    /* Gráfico 3: Distribución por sexo */
    fetch('http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/consultas/sexo')
        .then(response => response.json())
        .then(data => {
            const sexos = data.map(item => item.sexo);
            const totales = data.map(item => item.total);

            new Chart(document.getElementById('chart3'), {
                type: 'doughnut',
                data: {
                    labels: sexos,
                    datasets: [{
                        data: totales,
                        backgroundColor: ['#FF6384', '#36A2EB'],
                        borderColor: '#fff',
                        borderWidth: 2
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        });

    </script>

</x-app-layout>
