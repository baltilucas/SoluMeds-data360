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
        Schema::create('alergiapaciente', function (Blueprint $table) {
            $table->integer('idPaciente');
            $table->integer('idAlergia')->index('idalergia');
            $table->integer('idSeveridad')->nullable()->index('idseveridad');
            $table->text('sintomas')->nullable();
            $table->date('fechaDiagnostico')->nullable();

            $table->primary(['idPaciente', 'idAlergia']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alergiapaciente');
    }
};
