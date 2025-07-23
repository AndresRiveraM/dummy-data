const nombres = ["Juan", "Ana", "Luis", "Carla", "Pedro", "Lucía", "Hugo", "Elena"];
const apellidos = ["Gómez", "Ramírez", "Torres", "López", "Martínez", "Hernández"];

function generarCorreo(nombre, apellido) {
  const dominio = ["gmail.com", "hotmail.com", "outlook.com"];
  return `${nombre.toLowerCase()}.${apellido.toLowerCase()}@${dominio[Math.floor(Math.random() * dominio.length)]}`;
}

function fechaNacimientoAleatoria() {
  const start = new Date(1995, 0, 1);
  const end = new Date(2005, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

function generarAlumno(id) {
  const nombre = nombres[Math.floor(Math.random() * nombres.length)];
  const apellido1 = apellidos[Math.floor(Math.random() * apellidos.length)];
  const apellido2 = apellidos[Math.floor(Math.random() * apellidos.length)];
  return {
    matricula: 1000 + id,
    apellido_1: apellido1,
    apellido_2: apellido2,
    nombres: nombre,
    correo: generarCorreo(nombre, apellido1),
    fecha_nacimiento: fechaNacimientoAleatoria()
  };
}
// Función que genera el SQL completo basado en los alumnos actuales
function generarSQL(alumnos) {
  const header = `CREATE DATABASE IF NOT EXISTS sistema_escolar;
USE sistema_escolar;

DROP TABLE IF EXISTS alumnos;
CREATE TABLE alumnos (
    matricula INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    apellido_1 VARCHAR(50) NOT NULL,
    apellido_2 VARCHAR(50),
    nombres VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    fecha_nacimiento DATE NOT NULL
);

INSERT INTO alumnos (matricula, apellido_1, apellido_2, nombres, correo, fecha_nacimiento) VALUES
`;

  const values = alumnos.map(a => 
    `(${a.matricula}, '${a.apellido_1}', '${a.apellido_2}', '${a.nombres}', '${a.correo}', '${a.fecha_nacimiento}')`
  ).join(",\n");

  return header + values + ";";
}

// Referencias a botones y output
const btnGenerar = document.getElementById("generar");
const btnDescargar = document.getElementById("descargarSQL");
const output = document.getElementById("output");

let alumnosGenerados = [];

btnGenerar.addEventListener("click", () => {
  const cantidad = parseInt(document.getElementById("cantidad").value);
  alumnosGenerados = [];

  for (let i = 0; i < cantidad; i++) {
    alumnosGenerados.push(generarAlumno(i));
  }

  output.textContent = JSON.stringify(alumnosGenerados, null, 2);

  btnDescargar.disabled = alumnosGenerados.length === 0;
});

btnDescargar.addEventListener("click", () => {
  if (alumnosGenerados.length === 0) return;

  const sql = generarSQL(alumnosGenerados);

  const blob = new Blob([sql], { type: "application/sql" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sistema_escolar.sql";
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("generar").addEventListener("click", () => {
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const output = document.getElementById("output");
  const alumnos = [];

  for (let i = 0; i < cantidad; i++) {
    alumnos.push(generarAlumno(i));
  }

  output.textContent = JSON.stringify(alumnos, null, 2);
});
