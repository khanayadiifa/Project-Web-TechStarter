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
const seatRequestInput = document.querySelector("#seatRequest");
const seatMessage = document.querySelector("#seatMessage");

function setStatus(message, type) {
  seatMessage.textContent = message;
  seatMessage.className = `status ${type}`;
}

seatForm.addEventListener("submit", function (event) {
  
//event.preventDefault(); 

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