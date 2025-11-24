<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid px-0">

         <a class="navbar-brand ms-3" href="{{ url('/dashboard') }}">
            <img src="{{ asset('imgs/logo.svg') }}" 
                 alt="Logo" 
                 width="30" 
                 height="24" 
                 class="d-inline-block align-text-top">
            SoluMeds360
        </a>
        <button class="btn btn-outline-light me-2" onclick="toggleSidebar()">
        <i class="fa fa-bars"></i>
        </button>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu"
            aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarMenu">
            <ul class="navbar-nav ms-auto">

                <li class="nav-item">
                    <a class="nav-link {{ request()->is('/') ? 'active' : '' }}" href="{{ url('/') }}">
                        Inicio
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link {{ request()->is('login') ? 'active' : '' }}" href="{{ url('/') }}">
                        Log out
                    </a>
                </li>

            </ul>
        </div>

    </div>
</nav>
