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
        Schema::table('detallereceta', function (Blueprint $table) {
            $table->foreign(['idReceta'], 'detallereceta_ibfk_1')->references(['idReceta'])->on('receta')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idMedicamento'], 'detallereceta_ibfk_2')->references(['idMedicamento'])->on('medicamento')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('detallereceta', function (Blueprint $table) {
            $table->dropForeign('detallereceta_ibfk_1');
            $table->dropForeign('detallereceta_ibfk_2');
        });
    }
};
