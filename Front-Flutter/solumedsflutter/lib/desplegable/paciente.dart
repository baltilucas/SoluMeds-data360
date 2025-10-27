import 'package:flutter/material.dart';

class Paciente extends StatelessWidget {
  const Paciente({super.key});
  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.all(8.0),
      child: Column(
        children: <Widget>[
          Card(
            child: ListTile(
              leading: Icon(Icons.person_sharp),
              title: Text('Nombre: Karina Gonzalez'),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Edad: 27 Años, 9 meses'),
                  Text('Sexo: Femenino'),
                ],
              ),
            ),
          ),
          Card(
            child: ListTile(
              leading: Icon(Icons.dangerous_outlined, color: Colors.red),
              title: Text('Alergias'),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [Text('Polen'), Text('Penicilina')],
              ),
            ),
          ),
          Card(
            child: ListTile(
              leading: Icon(Icons.vaccines),
              title: Text('Medicamentos Crónicos'),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [Text('Metformina'), Text('Quetiapina')],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
