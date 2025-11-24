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
        Schema::create('medicamento', function (Blueprint $table) {
            $table->integer('idMedicamento', true);
            $table->string('nombreMedicamento')->nullable();
            $table->integer('idPrincipio')->nullable()->index('idprincipio');
            $table->integer('idFormato')->nullable()->index('idformato');
            $table->float('dosis')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicamento');
    }
};
