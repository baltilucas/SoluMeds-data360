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
        Schema::create('enfermedadcronicapaciente', function (Blueprint $table) {
            $table->integer('idPaciente');
            $table->integer('idEnfermedadCronica')->index('idenfermedadcronica');
            $table->date('fechaDiagnostico')->nullable();

            $table->primary(['idPaciente', 'idEnfermedadCronica']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enfermedadcronicapaciente');
    }
};
