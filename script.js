const nombres = ["Juan", "Ana", "Luis", "Carla", "Pedro", "Lucía", "Hugo", "Elena"];
const apellidos = ["Gómez", "Ramírez", "Torres", "López", "Martínez", "Hernández"];

function generarCorreo(nombre, apellido) {
  const dominio = ["gmail.com", "hotmail.com", "outlook.com"];
  return \`\${nombre.toLowerCase()}.\${apellido.toLowerCase()}@\${dominio[Math.floor(Math.random() * dominio.length)]}\`;
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

document.getElementById("generar").addEventListener("click", () => {
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const output = document.getElementById("output");
  const alumnos = [];

  for (let i = 0; i < cantidad; i++) {
    alumnos.push(generarAlumno(i));
  }

  output.textContent = JSON.stringify(alumnos, null, 2);
});
