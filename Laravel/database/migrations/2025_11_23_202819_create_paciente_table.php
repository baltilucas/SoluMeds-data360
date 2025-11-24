<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('paciente', function (Blueprint $table) {
            $table->integer('idPaciente', true);
            $table->string('nombrePaciente', 50);
            $table->string('segundoNombrePaciente', 50)->nullable();
            $table->string('apellidoPaciente', 50);
            $table->string('segundoApellidoPaciente', 50)->nullable();
            $table->string('correoPersonal', 100);
            $table->string('correoSolumeds', 100);
            $table->string('rut', 20)->nullable()->unique('idx_rut');
            $table->date('fechaNacimiento');
            $table->tinyInteger('sexo');
            $table->string('direccion', 200)->nullable();
            $table->string('telefono', 12);
            $table->integer('idNacionalidad')->nullable()->index('idnacionalidad');
            $table->integer('idPrevision')->nullable()->index('idprevision');
            $table->boolean('prais')->nullable()->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paciente');
    }
};
