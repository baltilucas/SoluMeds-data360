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
        Schema::create('examenpaciente', function (Blueprint $table) {
            $table->integer('idPaciente');
            $table->integer('idExamen')->index('idexamen');
            $table->date('fecha');
            $table->integer('idDoctor')->nullable()->index('iddoctor');
            $table->text('comentario')->nullable();
            $table->text('linkExamen')->nullable();

            $table->primary(['idPaciente', 'idExamen', 'fecha']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examenpaciente');
    }
};
