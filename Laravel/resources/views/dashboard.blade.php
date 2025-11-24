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
    
</x-app-layout>
