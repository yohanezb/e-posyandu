document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#medical-report");
    const dataTable = document.querySelector("#data-table tbody");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Mencegah pengiriman default formulir

        // Ambil nilai dari elemen formulir
        const patientName = document.querySelector("#patientName").value.trim();
        const height = document.querySelector("#height").value.trim();
        const weight = document.querySelector("#weight").value.trim();
        const report = document.querySelector("#report").value.trim();

        // Validasi data
        if (!patientName || !height || !weight || !report) {
            alert("Mohon isi semua field sebelum submit.");
            return;
        }

        // Tambahkan data ke tabel
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${patientName}</td>
            <td>${height}</td>
            <td>${weight}</td>
            <td>${report}</td>
        `;
        dataTable.appendChild(row);

        // Reset form
        form.reset();

        // Tampilkan pesan sukses
        alert("Data berhasil ditambahkan ke tabel!");
    });
});