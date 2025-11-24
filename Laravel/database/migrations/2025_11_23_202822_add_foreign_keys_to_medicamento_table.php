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
        Schema::table('medicamento', function (Blueprint $table) {
            $table->foreign(['idPrincipio'], 'medicamento_ibfk_1')->references(['idPrincipio'])->on('principioActivo')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idFormato'], 'medicamento_ibfk_2')->references(['idFormato'])->on('formato')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('medicamento', function (Blueprint $table) {
            $table->dropForeign('medicamento_ibfk_1');
            $table->dropForeign('medicamento_ibfk_2');
        });
    }
};
