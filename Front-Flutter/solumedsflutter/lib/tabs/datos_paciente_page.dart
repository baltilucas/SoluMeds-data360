import 'package:flutter/material.dart';
import '../services/paciente_service.dart';
import 'crear_paciente_page.dart'; // 👈 importa la página de creación

class DatosPacientePage extends StatefulWidget {
  const DatosPacientePage({super.key});

  @override
  State<DatosPacientePage> createState() => _DatosPacientePageState();
}

class _DatosPacientePageState extends State<DatosPacientePage> {
  List<dynamic> pacientes = [];
  bool loading = true;
  String error = '';

  @override
  void initState() {
    super.initState();
    _loadPacientes();
  }

  Future<void> _loadPacientes() async {
    try {
      final data = await PacienteService.getPacientes();
      setState(() {
        pacientes = data;
        loading = false;
      });
    } catch (e) {
      setState(() {
        error = e.toString();
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (loading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    if (error.isNotEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('Datos Paciente')),
        body: Center(child: Text('Error: $error')),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Datos Paciente'),
        backgroundColor: const Color.fromARGB(255, 255, 104, 167),
      ),
      body: ListView.builder(
        itemCount: pacientes.length,
        itemBuilder: (context, index) {
          final paciente = pacientes[index];
          return Card(
            margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            child: ListTile(
              leading: const Icon(Icons.person, color: Colors.pinkAccent),
              title: Text(paciente['nombrePaciente'] ?? 'Sin nombre'),
              subtitle: Text('RUT: ${paciente['rut'] ?? 'N/A'}'),
              onTap: () {
                // Aquí podrías navegar a los detalles del paciente
              },
            ),
          );
        },
      ),

      // 👇 Botón flotante para crear un nuevo paciente
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const CrearPacientePage(),
            ),
          );
        },
        label: const Text('Nuevo Paciente'),
        icon: const Icon(Icons.add),
        backgroundColor: Colors.pinkAccent,
      ),
    );
  }
}
