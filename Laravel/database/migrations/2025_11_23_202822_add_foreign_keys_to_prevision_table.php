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
        Schema::table('prevision', function (Blueprint $table) {
            $table->foreign(['idTipoPrevision'], 'prevision_ibfk_1')->references(['idTipoPrevision'])->on('tipoprevision')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prevision', function (Blueprint $table) {
            $table->dropForeign('prevision_ibfk_1');
        });
    }
};
