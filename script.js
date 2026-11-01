console.log("JavaScript Pertemuan 6 aktif");

const eventName = "TechStarter Day";
const maxSeats = 40;
let registered = 27;

console.log(eventName);
console.log(maxSeats);
console.log(registered);

const remaining = maxSeats - registered;
console.log(`Sisa kursi: ${remaining}`);

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

const checkSeatBtn = document.querySelector("#checkSeatBtn");

checkSeatBtn.addEventListener("click", function () {
  const requested = Number(prompt("Berapa kursi yang ingin dicek?"));
  const result = checkSeats(requested);
  console.log(result);
  alert(result);
});

function registerSeats(requested) {
  const remaining = maxSeats - registered;
  if (!Number.isInteger(requested) || requested <= 0) {
    return "Input tidak valid.";
  }
  if (requested > remaining) {
    return `Gagal. Hanya tersisa ${remaining} kursi.`;
  }
  registered = registered + requested;
  return `Berhasil. Total terdaftar sekarang ${registered}.`;
}