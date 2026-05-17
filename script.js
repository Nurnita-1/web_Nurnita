// script.js - Mini Project Web Nurnita

// ===== TAB NAVIGASI =====
function showTab(id, btn) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    btn.classList.add('active');

    // Ambil data API saat tab api dibuka
    if (id === 'api' && semuaUser.length === 0) ambilData();
}

// ===== INPUT NAMA =====
const tampilkanNama = () => {
    const nama = document.getElementById('namaInput').value.trim();
    if (nama === '') {
        alert('Nama tidak boleh kosong!');
        return;
    }
    document.getElementById('hasilNama').innerHTML = `Halo, <strong>${nama}</strong> 👋`;
};

document.getElementById('namaInput').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') tampilkanNama();
});

// ===== UBAH WARNA =====
const ubahWarna = (warna) => {
    document.body.style.backgroundColor = warna;
};

// ===== DAFTAR HOBI =====
let daftarHobi = JSON.parse(localStorage.getItem('hobi')) || [];

const tambahHobi = () => {
    const input = document.getElementById('hobiInput');
    const hobi = input.value.trim();
    if (hobi === '') {
        alert('Hobi tidak boleh kosong!');
        return;
    }
    daftarHobi.push(hobi);
    localStorage.setItem('hobi', JSON.stringify(daftarHobi));
    renderHobi();
    input.value = '';
};

document.getElementById('hobiInput').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') tambahHobi();
});

const renderHobi = () => {
    const list = document.getElementById('listHobi');
    list.innerHTML = '';
    daftarHobi.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        li.onclick = () => {
            daftarHobi.splice(index, 1);
            localStorage.setItem('hobi', JSON.stringify(daftarHobi));
            renderHobi();
        };
        list.appendChild(li);
    });
};

const hapusSemua = () => {
    if (daftarHobi.length === 0) return;
    if (confirm('Yakin hapus semua hobi?')) {
        daftarHobi = [];
        localStorage.removeItem('hobi');
        renderHobi();
    }
};

// ===== FETCH API =====
let semuaUser = [];

const ambilData = async () => {
    const loading = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const list    = document.getElementById('dataUser');

    loading.style.display = 'block';
    errorEl.innerHTML = '';
    list.innerHTML = '';

    try {
        const response = await fetch('https://dummyjson.com/users?limit=30');
        if (!response.ok) throw new Error('Gagal mengambil data!');
        const data = await response.json();
        loading.style.display = 'none';
        semuaUser = data.users;
        renderUser(semuaUser);
    } catch (error) {
        loading.style.display = 'none';
        errorEl.innerHTML = '❌ ' + error.message;
    }
};

const renderUser = (users) => {
    const list = document.getElementById('dataUser');
    list.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${user.firstName} ${user.lastName}</strong>
                        <span style="color:#999; font-size:0.82rem; margin-left:8px;">${user.email}</span>`;
        list.appendChild(li);
    });
};

document.getElementById('searchInput').addEventListener('keyup', function () {
    const keyword = this.value.toLowerCase();
    const hasil = semuaUser.filter(u =>
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(keyword)
    );
    renderUser(hasil);
});

// ===== SIMULASI LOADING =====
const mulaiLoading = () => {
    const status = document.getElementById('loadingStatus');
    status.textContent = 'Loading...';
    setTimeout(() => {
        status.textContent = '✅ Loading selesai!';
    }, 3000);
};

// ===== INIT =====
renderHobi();
