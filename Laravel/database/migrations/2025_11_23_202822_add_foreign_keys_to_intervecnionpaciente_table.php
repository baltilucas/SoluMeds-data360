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
        Schema::table('intervecnionpaciente', function (Blueprint $table) {
            $table->foreign(['idPaciente'], 'intervecnionpaciente_ibfk_1')->references(['idPaciente'])->on('paciente')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idIntervencion'], 'intervecnionpaciente_ibfk_2')->references(['idIntervencion'])->on('intervencion')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idDoctor'], 'intervecnionpaciente_ibfk_3')->references(['idDoctor'])->on('doctor')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('intervecnionpaciente', function (Blueprint $table) {
            $table->dropForeign('intervecnionpaciente_ibfk_1');
            $table->dropForeign('intervecnionpaciente_ibfk_2');
            $table->dropForeign('intervecnionpaciente_ibfk_3');
        });
    }
};
