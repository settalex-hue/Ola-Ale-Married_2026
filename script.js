function loadGuestMessages() {
  if (!messageList) return;
  try {
    const saved = localStorage.getItem("guestbookMessages");
    if (!saved) return;
    const messages = JSON.parse(saved);
    messageList.innerHTML = messages
      .map((item, index) => `
        <div class="guestbook-message">
          <div style="display:flex; justify-content:space-between;">
            <strong>${item.name}</strong>
            <button onclick="deleteMessage(${index})" style="background:none; border:none; color:red; cursor:pointer; font-size:0.8rem;">Elimina</button>
          </div>
          <p>${item.message}</p>
        </div>
      `)
      .join("");
  } catch(e) { console.warn("Guestbook non caricato", e); }
}

// Aggiungi questa nuova funzione subito sotto
function deleteMessage(index) {
  if(confirm("Vuoi davvero eliminare questo messaggio?")) {
    const saved = localStorage.getItem("guestbookMessages");
    let messages = JSON.parse(saved);
    messages.splice(index, 1); // Rimuove il messaggio selezionato
    localStorage.setItem("guestbookMessages", JSON.stringify(messages));
    loadGuestMessages(); // Ricarica la lista
    showToast("Messaggio eliminato");
  }
}
