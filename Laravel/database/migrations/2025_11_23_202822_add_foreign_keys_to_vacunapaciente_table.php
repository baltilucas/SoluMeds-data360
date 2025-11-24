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
        Schema::table('vacunapaciente', function (Blueprint $table) {
            $table->foreign(['idPaciente'], 'vacunapaciente_ibfk_1')->references(['idPaciente'])->on('paciente')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idVacuna'], 'vacunapaciente_ibfk_2')->references(['idVacuna'])->on('vacuna')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vacunapaciente', function (Blueprint $table) {
            $table->dropForeign('vacunapaciente_ibfk_1');
            $table->dropForeign('vacunapaciente_ibfk_2');
        });
    }
};
