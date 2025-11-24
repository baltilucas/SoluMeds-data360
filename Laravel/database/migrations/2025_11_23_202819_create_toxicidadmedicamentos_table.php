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
        Schema::create('toxicidadmedicamentos', function (Blueprint $table) {
            $table->integer('idPrincipio1');
            $table->integer('idPrincipio2')->index('idprincipio2');
            $table->integer('idSeveridad')->nullable()->index('idseveridad');

            $table->primary(['idPrincipio1', 'idPrincipio2']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('toxicidadmedicamentos');
    }
};
