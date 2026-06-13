document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Definisikan Data Anda
    const dataKataSolusi = [
        // Data Solusi/Permasalahan Utama
        ['Development', 40],
        ['Knowledge', 70],
        ['Education', 30],
        ['Learning', 28],
        ['Proficiency', 25],
        
        // Data Pendukung
        ['Student', 18],
        ['Motivation', 16],
        ['Value', 15],
        ['Experience', 15], 
        ['School', 12],
        
        // Data Sekunder (Kata Kecil)
        ['Awareness', 10],
        ['Insight', 10],
        ['Problem', 8],
        ['Discipline', 8],
        ['Innovation', 7],
        ['Digitalisasi', 6],
        ['Layanan', 5],
        ['Masyarakat', 4],
        ['Desa', 3]
    ];

    // --- Fungsi Warna Kustom ---
    function customColorFunc(word, weight) {
        return (weight >= 10) ? '#005c0cff' : '#6c5d13ff' ; '#80ff00ff'; 
    }
    // ---------------------------


    const canvasElement = document.getElementById('wordcloud-canvas');

    if (canvasElement && typeof WordCloud !== 'undefined') {
        
        // Dapatkan rasio piksel perangkat (Device Pixel Ratio), TAPI BATASI MAKSIMAL 2
        // Pembatasan ini sangat penting untuk mencegah 'Out of memory'
        const rawDpr = window.devicePixelRatio || 1; 
        const dpr = Math.min(rawDpr, 2); // Batasi maksimal 2x scaling

        // Atur ukuran piksel internal kanvas 
        const width = canvasElement.clientWidth;
        const height = canvasElement.clientHeight;

        canvasElement.width = width * dpr;
        canvasElement.height = height * dpr;

        // Atur ukuran kanvas kembali di CSS (Style) agar terlihat normal
        canvasElement.style.width = width + 'px';
        canvasElement.style.height = height + 'px';
        
        // Tentukan lebar kontainer untuk digunakan dalam WeightFactor
        // Kita menggunakan lebar visual (tanpa dikali DPR) agar faktor bobot lebih mudah dikontrol
        const wordCloudVisualWidth = width;

        WordCloud(canvasElement, {
            list: dataKataSolusi,      // Data kata yang akan digunakan
            fontFamily: 'Poppins',     // Tetap Poppins
            
            // PENTING: Mengurangi eksponen Math.pow (dari 2.6 ke 2.3)
            // Ini mengurangi perbedaan ukuran font secara keseluruhan, mengurangi kebutuhan memori kanvas
            weightFactor: function (size) {
                // Menggunakan eksponen yang lebih kecil (2.3) dan membagi dengan lebar kontainer
                return Math.pow(size, 1.5) * wordCloudVisualWidth / 1024;
            },
            
            // Gunakan fungsi warna kustom
            color: customColorFunc,    
            
            backgroundColor: '#ffffffff',  // Warna latar belakang dari contoh Anda
            
            // GridSize dikalikan dengan DPR untuk ketajaman
            gridSize: Math.round(16 * wordCloudVisualWidth / 1024) * dpr,
            
            // Rotation Steps dari contoh Anda
            rotationSteps: 2,          
            rotateRatio: 0.5,          
            
            // PENTING: Tetap gunakan pixelRatio untuk ketajaman
            pixelRatio: dpr, 
            
            drawOutOfBound: false,     
            ellipticity: 0.8,          
            shuffle: true,
        });
    } else {
        console.error("Elemen canvas tidak ditemukan atau pustaka WordCloud belum dimuat.");
    }
});
