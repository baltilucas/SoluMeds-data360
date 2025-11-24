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
        Schema::table('examenpaciente', function (Blueprint $table) {
            $table->foreign(['idPaciente'], 'examenpaciente_ibfk_1')->references(['idPaciente'])->on('paciente')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idExamen'], 'examenpaciente_ibfk_2')->references(['idExamen'])->on('examen')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idDoctor'], 'examenpaciente_ibfk_3')->references(['idDoctor'])->on('doctor')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('examenpaciente', function (Blueprint $table) {
            $table->dropForeign('examenpaciente_ibfk_1');
            $table->dropForeign('examenpaciente_ibfk_2');
            $table->dropForeign('examenpaciente_ibfk_3');
        });
    }
};
