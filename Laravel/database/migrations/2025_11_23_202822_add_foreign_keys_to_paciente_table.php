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
        Schema::table('paciente', function (Blueprint $table) {
            $table->foreign(['idNacionalidad'], 'paciente_ibfk_1')->references(['idNacionalidad'])->on('nacionalidad')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idPrevision'], 'paciente_ibfk_2')->references(['idPrevision'])->on('prevision')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('paciente', function (Blueprint $table) {
            $table->dropForeign('paciente_ibfk_1');
            $table->dropForeign('paciente_ibfk_2');
        });
    }
};
