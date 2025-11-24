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
        Schema::create('prevision', function (Blueprint $table) {
            $table->integer('idPrevision', true);
            $table->string('nombrePrevision', 60)->nullable();
            $table->integer('idTipoPrevision')->nullable()->index('idtipoprevision');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prevision');
    }
};
