import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class CrearPacientePage extends StatefulWidget {
  const CrearPacientePage({super.key});

  @override
  State<CrearPacientePage> createState() => _CrearPacientePageState();
}

class _CrearPacientePageState extends State<CrearPacientePage> {
  final TextEditingController nombreController = TextEditingController();
  final TextEditingController segundoNombreController = TextEditingController();
  final TextEditingController apellidoController = TextEditingController();
  final TextEditingController segundoApellidoController = TextEditingController();
  final TextEditingController correoPersonalController = TextEditingController();
  final TextEditingController correoSolumedsController = TextEditingController();
  final TextEditingController rutController = TextEditingController();
  final TextEditingController direccionController = TextEditingController();
  final TextEditingController telefonoController = TextEditingController();

  String? fechaNacimiento;
  String? sexo; // 'M' o 'F'
  int idNacionalidad = 1;
  int idPrevision = 1;
  int prais = 0;

  final String apiUrl = 'http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/pacientes';

  Future<void> crearPaciente() async {
    if (nombreController.text.isEmpty || rutController.text.isEmpty || sexo == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Faltan campos obligatorios')),
      );
      return;
    }

    final Map<String, dynamic> data = {
      "nombrePaciente": nombreController.text,
      "segundoNombrePaciente": segundoNombreController.text,
      "apellidoPaciente": apellidoController.text,
      "segundoApellidoPaciente": segundoApellidoController.text,
      "correoPersonal": correoPersonalController.text,
      "correoSolumeds": correoSolumedsController.text,
      "rut": rutController.text,
      "fechaNacimiento": fechaNacimiento ?? "",
      "sexo": sexo == 'M' ? 1 : 0,
      "direccion": direccionController.text,
      "telefono": telefonoController.text,
      "idNacionalidad": idNacionalidad,
      "idPrevision": idPrevision,
      "prais": prais,
    };

    try {
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(data),
      );

      if (response.statusCode == 201) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Paciente creado correctamente')),
        );
        Navigator.pop(context);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: ${response.body}')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error de conexión: $e')),
      );
    }
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime(2000),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );
    if (picked != null) {
      setState(() {
        fechaNacimiento = "${picked.year}-${picked.month}-${picked.day}";
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Crear Paciente'),
        backgroundColor: const Color.fromARGB(255, 255, 104, 167),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            TextField(
              controller: nombreController,
              decoration: const InputDecoration(labelText: 'Nombre del paciente'),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: segundoNombreController,
              decoration: const InputDecoration(labelText: 'Segundo nombre'),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: apellidoController,
              decoration: const InputDecoration(labelText: 'Apellido paterno'),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: segundoApellidoController,
              decoration: const InputDecoration(labelText: 'Apellido materno'),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: correoPersonalController,
              decoration: const InputDecoration(labelText: 'Correo personal'),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: correoSolumedsController,
              decoration: const InputDecoration(labelText: 'Correo Solumeds'),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: rutController,
              decoration: const InputDecoration(labelText: 'RUT'),
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                Expanded(
                  child: Text(
                    fechaNacimiento != null
                        ? 'Fecha: $fechaNacimiento'
                        : 'Selecciona fecha de nacimiento',
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.calendar_today),
                  onPressed: () => _selectDate(context),
                ),
              ],
            ),
            const SizedBox(height: 10),
            DropdownButtonFormField<String>(
              value: sexo,
              hint: const Text('Selecciona sexo'),
              onChanged: (String? newValue) {
                setState(() {
                  sexo = newValue;
                });
              },
              items: const [
                DropdownMenuItem(value: 'M', child: Text('Masculino')),
                DropdownMenuItem(value: 'F', child: Text('Femenino')),
              ],
            ),
            const SizedBox(height: 10),
            TextField(
              controller: direccionController,
              decoration: const InputDecoration(labelText: 'Dirección'),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: telefonoController,
              keyboardType: TextInputType.phone,
              decoration: const InputDecoration(labelText: 'Teléfono'),
            ),
            const SizedBox(height: 20),
            ElevatedButton.icon(
              onPressed: crearPaciente,
              icon: const Icon(Icons.save),
              label: const Text('Guardar Paciente'),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color.fromARGB(255, 255, 104, 167),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
