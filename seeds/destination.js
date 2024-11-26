const mongoose = require('mongoose');
const Destination = require('../models/destination');
const destination = require('../models/destination');

mongoose.connect('mongodb://127.0.0.1:27017/bestplace')
// mongoose.connect('mongodb://localhost:27017/bestplace')
  .then((results) => {
    console.log('Connected to database');
  }).catch((err) => {
    console.log(err);
  })

async function seedDestinations() {
    const destinations = [
      {
        name: 'Taman Mini Indonesia Indah',
        location: 'Taman Mini Indonesia Indah, Jakarta',
        description: 'Taman hiburan keluarga dengan berbagai replika bangunan dari seluruh Indonesia',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 20000,
      },
      {
        name: 'Pantai Kuta',
        location: 'Pantai Kuta, Kuta, Badung Regency, Bali',
        description: 'Pantai yang terkenal di Bali dengan pemandangan sunset yang indah',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 0,
      },
      {
        name: 'Borobudur',
        location: 'Borobudur, Magelang, Central Java',
        description: 'Candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 0,
      },
      {
        name: 'Kawah Putih',
        location: 'Kawah Putih, Ciwidey, West Java',
        description: 'Kawah vulkanik dengan danau berwarna putih di Bandung, Jawa Barat',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 0,
      },
      {
        name: 'Malioboro',
        location: 'Jl. Malioboro, Yogyakarta City, Special Region of Yogyakarta',
        description: 'Jalan utama di Yogyakarta dengan berbagai toko dan kuliner khas',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 0,
      },
      {
        name: 'Pantai Tanjung Aan',
        location: 'Pantai Tanjung Aan, Lombok, West Nusa Tenggara',
        description: 'Pantai dengan pasir berwarna putih dan air laut yang jernih di Lombok, Nusa Tenggara Barat',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 10000,
      },
      {
        name: 'Bukit Bintang',
        location: 'Bukit Bintang, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia',
        description: 'Kawasan perbelanjaan dan hiburan di Kuala Lumpur, Malaysia',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 0,
      },
      {
        name: 'Candi Prambanan',
        location: 'Candi Prambanan, Sleman, Special Region of Yogyakarta',
        description: 'Candi Hindu terbesar di Indonesia yang terletak di Yogyakarta',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 25000,
      },
      {
        name: 'Pantai Sanur',
        location: 'Pantai Sanur, Denpasar, Bali',
        description: 'Pantai di Bali yang cocok untuk berenang dan melihat matahari terbit',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 0,
      },
      {
        name: 'Danau Toba',
        location: 'Danau Toba, North Sumatra',
        description: 'Danau vulkanik terbesar di Indonesia yang terletak di Sumatera Utara',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 0,
      },
      {
        name: 'Kawah Ijen',
        location: 'Kawah Ijen, Banyuwangi, East Java',
        description: 'Kawah vulkanik dengan fenomena blue fire di Banyuwangi, Jawa Timur',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 10000,
      },
      {
        name: 'Candi Borobudur',
        location: 'Candi Borobudur, Borobudur, Magelang, Central Java',
        description: 'Candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 25000,
      },
      {
        name: 'Pulau Komodo',
        location: 'Pulau Komodo, East Nusa Tenggara',
        description: 'Pulau di Indonesia yang terkenal dengan komodo, hewan terbesar di dunia',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 5000000,
      },
      {
        name: 'Taman Nasional Gunung Rinjani',
        location: 'Taman Nasional Gunung Rinjani, Lombok, West Nusa Tenggara',
        description: 'Taman nasional yang terletak di Lombok dan memiliki gunung tertinggi kedua di Indonesia',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 150000,
      },
      {
        name: 'Bukit Tinggi',
        location: 'Bukit Tinggi, West Sumatra',
        description: 'Kota kecil yang terletak di Sumatera Barat dengan arsitektur khas Eropa',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 0,
      },
      {
        name: 'Pulau Weh',
        location: 'Pulau Weh, Sabang, Aceh',
        description: 'Pulau yang terletak di ujung barat Indonesia dengan keindahan bawah laut yang luar biasa',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 0,
      },
      {
        name: 'Taman Safari Indonesia',
        location: 'Taman Safari Indonesia, Cisarua, West Java',
        description: 'Taman hiburan keluarga dengan berbagai satwa liar di Cisarua, Bogor',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 0,
      },
      {
        name: 'Gunung Merbabu',
        location: 'Gunung Merbabu, Central Java',
        description: 'Gunung yang terletak di Jawa Tengah dengan pemandangan matahari terbit yang indah',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 50000,
      },
      {
        name: 'Pulau Lombok',
        location: 'Pulau Lombok, West Nusa Tenggara',
        description: 'Pulau di Indonesia yang terkenal dengan keindahan pantainya',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 0,
      },
      {
        name: 'Tanjung Lesung',
        location: 'Tanjung Lesung, Pandeglang, Banten',
        description: 'Kawasan wisata pantai di Banten yang cocok untuk bersantai dan berenang',
        image: 'https://source.unsplash.com/collection/2349781/1280x720',
        phone: 1234567890,
        price: 100000,
      }
    ]

    try {
        const newDestination = destinations.map((destination) => {
          return {...destination, author: '674577334fa1059dca329de9'}
        })
        await Destination.deleteMany({});
        await Destination.insertMany(newDestination);
        console.log('Data berhasil disimpan');
    } catch (err) {
        console.log('Terjadi kesalahan saat menyimpan data:', err);
    } finally {
        mongoose.disconnect();
    }
}

seedDestinations();