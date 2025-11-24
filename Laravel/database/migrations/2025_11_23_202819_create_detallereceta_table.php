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
        Schema::create('detallereceta', function (Blueprint $table) {
            $table->integer('idReceta');
            $table->integer('idMedicamento')->index('idmedicamento');
            $table->integer('dias');
            $table->integer('frecuencia');
            $table->time('horaInicio')->nullable();
            $table->text('comentario')->nullable();

            $table->primary(['idReceta', 'idMedicamento']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detallereceta');
    }
};
