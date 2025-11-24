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
        Schema::create('vacunapaciente', function (Blueprint $table) {
            $table->integer('idPaciente');
            $table->integer('idVacuna')->index('idvacuna');
            $table->timestamp('fecha')->nullable();
            $table->float('dosis')->nullable();
            $table->string('establecimiento')->nullable();
            $table->string('proveedor', 100)->nullable();

            $table->primary(['idPaciente', 'idVacuna']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacunapaciente');
    }
};
