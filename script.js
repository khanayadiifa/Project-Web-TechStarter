const eventName = "TechStarter Day";
const maxSeats = 40;
let registered = 27;

function checkSeats(requested) {
  const sisaSekarang = maxSeats - registered;
  if (!Number.isInteger(requested) || requested <= 0) {
    return "Masukkan jumlah kursi berupa bilangan bulat lebih dari 0.";
  }
  if (requested <= sisaSekarang) {
    return `Tersedia. Sisa saat ini ${sisaSekarang} kursi.`;
  }
  return `Tidak cukup. Hanya tersisa ${sisaSekarang} kursi.`;
}

const seatForm = document.querySelector("#seatForm");
const seatMessage = document.querySelector("#seatMessage");
const seatRequestInput = document.querySelector("#seatRequestRegistration");

function setStatus(message, type) {
  seatMessage.textContent = message;
  seatMessage.className = `status ${type}`;
}

seatForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const requested = Number(seatRequestInput.value);
  const remaining = maxSeats - registered;
  
  if (!Number.isInteger(requested) || requested <= 0) {
    setStatus("Masukkan jumlah kursi bulat lebih dari 0.", "error");
    return;
  }

  if (requested <= remaining) {
    setStatus(`Tersedia. Masih ada ${remaining} kursi.`, "success");
  } else {
    setStatus(`Tidak cukup. Sisa kursi hanya ${remaining}.`, "error");
  }
});

seatRequestInput.addEventListener("input", function () {
  setStatus("Nilai berubah. Tekan Cek Kursi untuk memeriksa.", "neutral");
});

const registrationList = document.querySelector("#registrationList");
const registrationSummary = document.querySelector("#registrationSummary");
const registrationForm = document.querySelector("#registrationForm");
const participantNameInput = document.querySelector("#participantName");

const STORAGE_KEY = "techstarter.registrations.v1";

function saveRegistrations() {
  const json = JSON.stringify(registrations);
  localStorage.setItem(STORAGE_KEY, json);
}

function loadRegistrations() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Data localStorage tidak valid:", error);
    return [];
  }
}

let registrations = loadRegistrations(); 

function getUsedSeats() {
  return registrations.reduce((total, item) => total + item.seats, 0);
}

let editingId = null;

function deleteRegistration(id) {
  registrations = registrations.filter((item) => item.id !== id);
  saveRegistrations();
  renderRegistrations();
  setStatus("Registrasi dihapus.", "success");
}

function startEdit(item) {
  editingId = item.id;
  participantNameInput.value = item.name;
  seatRequestInput.value = item.seats;
  participantNameInput.focus();
  setStatus("Mode edit aktif. Ubah data lalu tekan Simpan.", "neutral");
}

function renderRegistrations() {
  registrationList.replaceChildren();
  
  for (const item of registrations) {
    const li = document.createElement("li");
    li.textContent = `${item.name} : ${item.seats} kursi`;

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      startEdit(item);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Hapus";
    deleteButton.addEventListener("click", function () {
      deleteRegistration(item.id);
    });

    li.append(" ", editButton, " ", deleteButton);
    registrationList.append(li);
  }

  const used = getUsedSeats();
  const remaining = maxSeats - used;
  const count = registrations.length;

  if (count === 0) {
    registrationSummary.textContent = "Belum ada registrasi. 0/40 kursi terpakai, sisa 40.";
  } else {
    registrationSummary.textContent =
      `${count} registrasi • ${used}/${maxSeats} kursi terpakai • sisa ${remaining} kursi.`;
  }
}

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = participantNameInput.value.trim();
  const seats = Number(seatRequestInput.value);

  if (name.length < 2) {
    setStatus("Nama minimal 2 karakter.", "error");
    return;
  }
  if (!Number.isInteger(seats) || seats <= 0) {
    setStatus("Jumlah kursi harus bilangan bulat positif.", "error");
    return;
  }

  const usedWithoutCurrent = registrations
    .filter((item) => item.id !== editingId)
    .reduce((total, item) => total + item.seats, 0);

  if (usedWithoutCurrent + seats > maxSeats) {
    setStatus("Kursi tidak mencukupi.", "error");
    return;
  }

  if (editingId === null) {
    registrations.push({ id: Date.now(), name, seats });
    setStatus("Registrasi ditambahkan.", "success");
  } else {
    const index = registrations.findIndex((item) => item.id === editingId);
    if (index !== -1) {
      registrations[index] = { ...registrations[index], name, seats };
    }
    editingId = null;
    setStatus("Registrasi diperbarui.", "success");
  }

  saveRegistrations();
  renderRegistrations();
  registrationForm.reset();
});

renderRegistrations();