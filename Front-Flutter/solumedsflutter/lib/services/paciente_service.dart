import 'package:http/http.dart' as http;
import 'dart:convert';

class PacienteService {
  static const String baseUrl = 'http://54.166.37.210:4000/pacientes';

  static Future<List<dynamic>> getPacientes() async {
    final response = await http.get(Uri.parse(baseUrl));

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Error al obtener pacientes');
    }
  }

  static Future<Map<String, dynamic>> getPacientePorRut(String rut) async {
    final response = await http.get(Uri.parse('$baseUrl/rut/$rut'));

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Paciente no encontrado');
    }
  }
}
