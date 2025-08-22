(() => {
  // 1️⃣ Declaramos el array que almacenará los nombres de los amigos
  let amigos = [];
  
  // 2️⃣ Variable que indica si ya se realizó el sorteo (para bloquear nuevas entradas)
  let sorteado = false;

  // 3️⃣ Referencias a los elementos del DOM
  const input = document.getElementById("amigo");           // campo de texto donde se escribe el nombre
  const lista = document.getElementById("listaAmigos");     // lista donde se mostrarán los nombres agregados
  const resultado = document.getElementById("resultado");   // elemento donde se mostrará el nombre sorteado
  const btnSortear = document.querySelector(".button-draw"); // botón de sorteo

  // 4️⃣ Guardamos el HTML original del botón para poder restaurarlo después de reiniciar
  const btnSortearOriginalHTML = btnSortear.innerHTML;

  // 5️⃣ Función para agregar un amigo
  function agregarAmigo() {
    // 🔒 Si ya se sorteó, no se permite agregar más nombres
    if (sorteado) {
      alert("Se debe reiniciar para agregar nuevos nombres.");
      return;
    }

    // 🔹 Tomamos el valor del input y quitamos espacios al inicio y fin
    const nombre = input.value.trim();

    // 🔹 Validamos que el nombre no esté vacío
    if (nombre === "") {
      alert("Por favor, inserte un nombre.");
      input.focus();
      return;
    }

    // 🔹 Validamos que el nombre no esté repetido
    if (amigos.includes(nombre)) {
      alert("Este nombre ya fue agregado. Por favor ingrese otro.");
      input.value = "";
      input.focus();
      return;
    }

    // 🔹 Agregamos el nombre al array
    amigos.push(nombre);

    // 🔹 Actualizamos la lista en pantalla
    renderLista();

    // 🔹 Limpiamos y volvemos a enfocar el input
    input.value = "";
    input.focus();

    // 🔹 Limpiamos cualquier resultado previo del sorteo
    resultado.innerHTML = "";
  }

  // 6️⃣ Función para renderizar la lista de amigos en el DOM
  function renderLista() {
    lista.innerHTML = ""; // primero vaciamos la lista
    const frag = document.createDocumentFragment(); // usamos fragmento para optimizar

    // 🔹 Recorremos el array de amigos y creamos un <li> por cada nombre
    amigos.forEach((n) => {
      const li = document.createElement("li");
      li.textContent = n;
      frag.appendChild(li);
    });

    // 🔹 Insertamos todos los <li> de una vez en la lista
    lista.appendChild(frag);
  }

  // 7️⃣ Permitir agregar nombre presionando Enter
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      agregarAmigo();
    }
  });

  // 8️⃣ Función para sortear un amigo
  function sortearAmigo() {
    // 🔹 Validamos que haya al menos 2 nombres
    if (amigos.length < 2) {
      alert("Debes ingresar al menos 2 nombres para sortear.");
      input.focus();
      return;
    }

    // 🔒 Bloqueamos nuevas entradas y deshabilitamos el input
    sorteado = true;
    input.disabled = true;

    // 🔹 Elegimos un índice aleatorio del array
    const indice = Math.floor(Math.random() * amigos.length);
    const elegido = amigos[indice];

    // 🔹 Mostramos el resultado en el DOM
    resultado.innerHTML = `<li>🎉 Amigo secreto: <strong>${elegido}</strong></li>`;

    // 🔹 Cambiamos el botón a "Reiniciar" y lo vinculamos a la función reiniciar
    btnSortear.innerHTML = "Reiniciar";
    btnSortear.onclick = reiniciar;
  }

  // 9️⃣ Función para reiniciar todo
  function reiniciar() {
    amigos = [];            // vaciamos el array
    sorteado = false;       // desbloqueamos la posibilidad de agregar nombres
    input.disabled = false; // habilitamos el input de nuevo
    lista.innerHTML = "";   // limpiamos la lista de nombres
    resultado.innerHTML = "";// limpiamos el resultado del sorteo
    input.value = "";       // limpiamos el input
    input.focus();          // volvemos a enfocar el input

    // 🔹 Restauramos el botón a su estado original con ícono y texto
    btnSortear.innerHTML = btnSortearOriginalHTML;
    btnSortear.setAttribute("onclick", "sortearAmigo()");
  }

  // 🔟 Exponemos las funciones para que puedan ser llamadas desde el HTML
  window.agregarAmigo = agregarAmigo;
  window.sortearAmigo = sortearAmigo;
  window.reiniciar = reiniciar;
})();
