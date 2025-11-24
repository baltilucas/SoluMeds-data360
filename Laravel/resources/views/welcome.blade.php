<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="{{ asset('bootstrap/css/bootstrap.min.css') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
</head>

<body>

    {{-- Navbar --}}
    @include('components.navbar')

    {{-- Carrusel FUERA del container --}}
    <div id="carouselText" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">

            <div class="carousel-item active">
                <div class="p-5 text-center text-white" style="height:350px; background:#FF8137;">
                    <h1>SoluMeds</h1>
                    <p class="lead">Tu solución a datos médicos</p>
                </div>
            </div>

            <div class="carousel-item">
                <div class="p-5 text-center text-white" style="height:350px; background:#a400b3;">
                    <h1>Todo En un Solo Lugar</h1>
                    <p class="lead">Gestiona tus examenes, vacunas y mucho más a la palma de tu mano</p>
                </div>
            </div>

            <div class="carousel-item">
                <div class="p-5 text-center text-white" style="height:350px; background:#96264E;">
                    <h1>Seguridad en Emergencias</h1>
                    <p class="lead">Deja tus datos a disposición en caso de un accidente</p>
                </div>
            </div>

        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#carouselText" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselText" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
        </button>
    </div>

    {{-- Contenido de cada página --}}
    <div class="container mt-4">
        @yield('content')
    </div>

    <!-- Bootstrap JS -->
    <script src="{{ asset('bootstrap/js/bootstrap.bundle.min.js') }}"></script>

</body>
</html>
