import 'package:flutter/material.dart';

class MainPage extends StatelessWidget{
  const MainPage({super.key});
  @override
  Widget build(BuildContext context) {
    return const Card(
          shadowColor: Colors.transparent,
          margin: const EdgeInsets.all(8.0),
          child: SizedBox.expand(
            child: Center(child: Text('Wena choroHome page')),
          ),
        );
}
}