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
        Schema::table('receta', function (Blueprint $table) {
            $table->foreign(['idPaciente'], 'receta_ibfk_1')->references(['idPaciente'])->on('paciente')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idDoctor'], 'receta_ibfk_2')->references(['idDoctor'])->on('doctor')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('receta', function (Blueprint $table) {
            $table->dropForeign('receta_ibfk_1');
            $table->dropForeign('receta_ibfk_2');
        });
    }
};
