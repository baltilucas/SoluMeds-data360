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

    {{-- FORMULARIO DE CONTACTO --}}
    <form method="POST" action="{{ route('contacto.enviar') }}">
        @csrf

        <div class="card border-success m-4">
          <div class="card-header bg-transparent border-success">Contacto</div>

          <div class="card-body text-success">

            <h5 class="card-title">Nombre</h5>
            <input type="text" class="form-control mb-3" name="nombre" placeholder="Ingrese su nombre">

            <h5 class="card-title">Correo Contacto</h5>
            <input type="email" class="form-control mb-3" name="correo" placeholder="Ingrese su correo">

            <h5 class="card-title">Número Contacto</h5>
            <input type="text" class="form-control mb-4" name="telefono" placeholder="Ingrese su número">


            <h5 class="card-title">Consulta</h5>
            <textarea class="form-control mb-3" name="consulta" rows="3" placeholder="Escriba su consulta"></textarea>

            <button type="submit" class="btn btn-success w-100">Enviar</button>

          </div>
        </div>

    </form>

    {{-- Contenido de cada página --}}
    <div class="container mt-4">
        @yield('content')
    </div>

    <script src="{{ asset('bootstrap/js/bootstrap.bundle.min.js') }}"></script>

</body>
</html>
