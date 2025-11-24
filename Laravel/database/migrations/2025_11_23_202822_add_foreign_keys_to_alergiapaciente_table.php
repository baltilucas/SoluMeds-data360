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
        Schema::table('alergiapaciente', function (Blueprint $table) {
            $table->foreign(['idPaciente'], 'alergiapaciente_ibfk_1')->references(['idPaciente'])->on('paciente')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idAlergia'], 'alergiapaciente_ibfk_2')->references(['idAlergia'])->on('alergia')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idSeveridad'], 'alergiapaciente_ibfk_3')->references(['idSeveridad'])->on('severidad')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('alergiapaciente', function (Blueprint $table) {
            $table->dropForeign('alergiapaciente_ibfk_1');
            $table->dropForeign('alergiapaciente_ibfk_2');
            $table->dropForeign('alergiapaciente_ibfk_3');
        });
    }
};
