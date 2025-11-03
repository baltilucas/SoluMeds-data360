import 'package:flutter/material.dart';
import 'package:solumedsflutter/tabs/ejemplo.dart';
import 'tabs/mainpage.dart';
import 'tabs/info.dart';
import 'tabs/datos_paciente_page.dart'; // <-- Asegúrate de tener esta página creada


void main() => runApp(const NavigationBarApp());

class NavigationBarApp extends StatelessWidget {
  const NavigationBarApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: NavigationExample(),
    );
  }
}

class NavigationExample extends StatefulWidget {
  const NavigationExample({super.key});

  @override
  State<NavigationExample> createState() => _NavigationExampleState();
}

class _NavigationExampleState extends State<NavigationExample> {
  int currentPageIndex = 0;

  late MainPage mainpage;
  Info info = Info();
  Paciente paciente = Paciente();

  @override
  Widget build(BuildContext context) {
    // Initialize mainpage with a callback that updates the selected tab.
    mainpage = MainPage(onValidRut: (int idx) {
      setState(() {
        currentPageIndex = idx;
      });
    });

    return Scaffold(
      bottomNavigationBar: NavigationBar(
        onDestinationSelected: (int index) {
          setState(() {
            currentPageIndex = index;
          });
        },
        indicatorColor: const Color.fromARGB(255, 255, 104, 167),
        selectedIndex: currentPageIndex,
        destinations: const <Widget>[
          NavigationDestination(
            selectedIcon: Icon(Icons.home),
            icon: Icon(Icons.home_outlined),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Badge(child: Icon(Icons.history_sharp)),
            label: 'Historial',
          ),
          NavigationDestination(
            icon: Badge(child: Icon(Icons.people)),
            label: 'Ejemplo',
          ),
        ],
      ),
      body: <Widget>[
        /// Main
        mainpage,

        /// Página Historial
        info,

        /// Ejemplo
        paciente,
      ][currentPageIndex],

      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => DatosPacientePage(),
            ),
          );
        },
        label: const Text('Ver Pacientes'),
        icon: const Icon(Icons.person_search),
        backgroundColor: const Color.fromARGB(255, 255, 104, 167),
      ),
    );
  }
}
