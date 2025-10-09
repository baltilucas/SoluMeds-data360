import 'package:flutter/material.dart';

class Info extends StatelessWidget{
  const Info({super.key});
  @override
  Widget build(BuildContext context) {
    return const Padding(
          padding: EdgeInsets.all(8.0),
          child: Column(
            children: <Widget>[
              Card(
                child: ListTile(
                  leading: Icon(Icons.notifications_sharp),
                  title: Text('José Perez - 12/06/2024'),
                  subtitle: Text('Hombre, 45 años'),
                ),
              ),
              Card(
                child: ListTile(
                  leading: Icon(Icons.notifications_sharp),
                  title: Text('Karina Gonzalez - 10/06/2024'),
                  subtitle: Text('Mujer, 27 años'),
                ),
              ),
            ],
          ),
        );
}
}