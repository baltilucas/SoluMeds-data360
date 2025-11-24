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
        Schema::table('toxicidadmedicamentos', function (Blueprint $table) {
            $table->foreign(['idPrincipio1'], 'toxicidadmedicamentos_ibfk_1')->references(['idPrincipio'])->on('principioActivo')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idPrincipio2'], 'toxicidadmedicamentos_ibfk_2')->references(['idPrincipio'])->on('principioActivo')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['idSeveridad'], 'toxicidadmedicamentos_ibfk_3')->references(['idSeveridad'])->on('severidad')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('toxicidadmedicamentos', function (Blueprint $table) {
            $table->dropForeign('toxicidadmedicamentos_ibfk_1');
            $table->dropForeign('toxicidadmedicamentos_ibfk_2');
            $table->dropForeign('toxicidadmedicamentos_ibfk_3');
        });
    }
};
