import 'package:flutter/material.dart';

class MainPage extends StatelessWidget {
  /// Optional callback invoked when a valid RUT is entered.
  /// The callback receives the index of the tab to switch to.
  final void Function(int)? onValidRut;

  const MainPage({super.key, this.onValidRut});
  @override
  Widget build(BuildContext context) {
    return Card(
      shadowColor: Colors.transparent,
      margin: const EdgeInsets.all(16.0),
      child: SizedBox(
        height: 200,
        width: double.infinity,
  child: Center(
          child: Padding(
            padding: EdgeInsets.all(16.0),
            child: TextoDatosPaciente(onValidRut: onValidRut),
          ),
        ),
      ),
    );
  }
}

class TextoDatosPaciente extends StatefulWidget {
  final void Function(int)? onValidRut;

  const TextoDatosPaciente({super.key, this.onValidRut});

  @override
  State<TextoDatosPaciente> createState() => _TextoDatosPacienteState();
}

class _TextoDatosPacienteState extends State<TextoDatosPaciente> {
  final TextEditingController _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 360, // keep it reasonably sized on larger screens
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextField(
            controller: _controller,
            decoration: InputDecoration(
              border: const OutlineInputBorder(),
              labelText: 'Rut Paciente',
              hintText: 'xxxxxxxx-x',
            ),
          ),
          const SizedBox(height: 12),
          FilledButton.tonal(
            onPressed: () {
              final text = _controller.text.trim();
              if (!validador(text)) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Ingrese un RUT válido antes de continuar'),
                  ),
                );
                return;
              }

              // If an onValidRut callback was provided by the parent, use it
              // to request switching to the third tab (index 2). Otherwise
              // fall back to showing a SnackBar.
              if (widget.onValidRut != null) {
                widget.onValidRut!(2);
              } else {
                ScaffoldMessenger.of(
                  context,
                ).showSnackBar(SnackBar(content: Text('RUT ingresado: $text')));
              }
            },
            child: const Text('Buscar'),
          ),
        ],
      ),
    );
  }
}

//función para validar ingreso de rut desde frontend
bool validador(String rut) {
  int suma = 0;
  List<int> n = [3, 2, 7, 6, 5, 4, 3, 2]; 
  List<String> rutPartes = rut.split('-');
  if (rutPartes.length != 2) return false;

  String cuerpo = rutPartes[0];
  String dv = rutPartes[1];

  if (!RegExp(r'^\d+$').hasMatch(cuerpo)) return false;

  cuerpo = cuerpo.padLeft(8, '0');

  for (int i = 0; i < cuerpo.length; i++) {
    suma += int.parse(cuerpo[i]) * n[i];
  }

  int resto = suma % 11;
  int d = 11 - resto;

  if (d == 10 && (dv == 'k' || dv == 'K')) {
    return true;
  } else if (d == 11 && dv == '0') {
    return true;
  } else if (int.tryParse(dv) != null && d == int.parse(dv)) {
    return true;
  } else {
    return false;
  }
}
