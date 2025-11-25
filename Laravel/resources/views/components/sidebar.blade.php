<div id="sidebar" class="sidebar bg-dark text-white">
    <div class="sidebar-header px-3 py-3">
        <h4 class="m-0">Menú</h4>
    </div>

    <ul class="nav flex-column px-2">
        <li class="nav-item">
            <a href="{{ url('/') }}" class="nav-link text-white">
                <i class="fa fa-home me-2"></i> Inicio
            </a>
        </li>

        <li class="nav-item">
            <a href="{{ url('/contacto') }}" class="nav-link text-white">
                <i class="fa fa-envelope me-2"></i> Contacto
            </a>
        </li>

        <li class="nav-item">
            <a href="{{ url('/usuarios') }}" class="nav-link text-white">
                <i class="fa fa-users me-2"></i> Usuarios
            </a>
        </li>

        <li class="nav-item">
            <a href="{{ url('/reportes') }}" class="nav-link text-white">
                <i class="fa fa-bar-chart me-2"></i> Reportes
            </a>
        </li>
    </ul>
</div>
