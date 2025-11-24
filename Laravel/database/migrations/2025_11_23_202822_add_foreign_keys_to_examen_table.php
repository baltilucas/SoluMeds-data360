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
        Schema::table('examen', function (Blueprint $table) {
            $table->foreign(['idTipoExamen'], 'examen_ibfk_1')->references(['idTipoExamen'])->on('tipoexamen')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('examen', function (Blueprint $table) {
            $table->dropForeign('examen_ibfk_1');
        });
    }
};
