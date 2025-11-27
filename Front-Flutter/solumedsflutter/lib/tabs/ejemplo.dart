import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class Paciente extends StatefulWidget {
  const Paciente({super.key});

  @override
  State<Paciente> createState() => _PacienteState();
}

class _PacienteState extends State<Paciente> {
  Map<String, dynamic>? paciente;
  List<dynamic> alergias = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<void> fetchData() async {
    try {
      final pacienteRes = await http.get(Uri.parse('http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/pacientes/1'));
      final alergiasRes = await http.get(Uri.parse('http://ec2-3-80-29-195.compute-1.amazonaws.com:4000/alergiaspaciente/paciente/1'));

      if (pacienteRes.statusCode == 200 && alergiasRes.statusCode == 200) {
        setState(() {
          paciente = json.decode(pacienteRes.body)[0];
          alergias = json.decode(alergiasRes.body);
          loading = false;
        });
      } else {
        throw Exception('Error al obtener datos');
      }
    } catch (e) {
      print('Error: $e');
      setState(() => loading = false);
    }
  }

  String calcularEdad(String fechaNacimiento) {
    final fecha = DateTime.parse(fechaNacimiento);
    final hoy = DateTime.now();
    int edad = hoy.year - fecha.year;
    if (hoy.month < fecha.month || (hoy.month == fecha.month && hoy.day < fecha.day)) {
      edad--;
    }
    return '$edad años';
  }

  @override
  Widget build(BuildContext context) {
    if (loading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (paciente == null) {
      return const Center(child: Text('No se pudieron cargar los datos del paciente.'));
    }

    final nombreCompleto =
        '${paciente!["nombrePaciente"]} ${paciente!["segundoNombrePaciente"] ?? ""} ${paciente!["apellidoPaciente"]} ${paciente!["segundoApellidoPaciente"] ?? ""}';
    final sexo = paciente!["sexo"] == 1 ? "Masculino" : "Femenino";
    final edad = calcularEdad(paciente!["fechaNacimiento"]);

    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: <Widget>[
          Card(
            child: ListTile(
              leading: const Icon(Icons.person_sharp),
              title: Text('Nombre: $nombreCompleto'),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Edad: $edad'),
                  Text('Sexo: $sexo'),
                  Text('RUT: ${paciente!["rut"]}'),
                  Text('Correo: ${paciente!["correoPersonal"]}'),
                ],
              ),
            ),
          ),
          Card(
            child: ListTile(
              leading: const Icon(Icons.dangerous_outlined, color: Colors.red),
              title: const Text('Alergias'),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: alergias.isNotEmpty
                    ? alergias.map((a) => Text('${a["nombre_alergia"]} (${a["severidad"]})')).toList()
                    : [const Text('Sin alergias registradas')],
              ),
            ),
          ),
          Card(
            child: const ListTile(
              leading: Icon(Icons.vaccines),
              title: Text('Medicamentos Crónicos'),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [Text('No implementado aún')],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
