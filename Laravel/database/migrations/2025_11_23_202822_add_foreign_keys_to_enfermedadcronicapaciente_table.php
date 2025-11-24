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
        Schema::table('enfermedadcronicapaciente', function (Blueprint $table) {
            $table->foreign(['idPaciente'], 'enfermedadcronicapaciente_ibfk_1')->references(['idPaciente'])->on('paciente')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idEnfermedadCronica'], 'enfermedadcronicapaciente_ibfk_2')->references(['idEnfermedadCronica'])->on('enfermedadcronica')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('enfermedadcronicapaciente', function (Blueprint $table) {
            $table->dropForeign('enfermedadcronicapaciente_ibfk_1');
            $table->dropForeign('enfermedadcronicapaciente_ibfk_2');
        });
    }
};
