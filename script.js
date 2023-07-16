// Bagian register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function(error) {
      console.error('Service Worker registration failed:', error);
    });
}

// Bagian Fetch data dari API
function fetchData() {
  fetch('https://ibnux.github.io/BMKG-importer/cuaca/501186.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Process the data
      console.log('Received data:', data);
    })
    .catch(function(error) {
      console.error('Error fetching data:', error);
    });
}

// Bagian untuk menampilkan data dihalaman detail
function displayData(data) {
  const weatherDataElement = document.getElementById('weather-data');
  weatherDataElement.innerHTML = JSON.stringify(data);
}

// Memanggil fungsi fetchData()
fetchData();

// Bagian cache and fetch API
if ('caches' in window) {
  caches.open('app-cache-v1').then(function(cache) {
    cache.addAll([
      '/',
      'index.html',
      'style.css',
      'script.js',
      'logo.png'
    ]);
  });
}

// Bagian live data (offline storage)
const offlineData = localStorage.getItem('offline-data');

if (offlineData) {
  console.log('Offline data:', offlineData);
} else {
  console.log('No offline data available');
}

// Add to Home Screen (Installable)
let deferredPrompt;

window.addEventListener('beforeinstallprompt', function(event) {
  event.preventDefault();
  deferredPrompt = event;
  showInstallPrompt();
});

function showInstallPrompt() {
  const installButton = document.getElementById('install-button');
  installButton.style.display = 'block';

  installButton.addEventListener('click', function() {
    installButton.style.display = 'none';
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function(choiceResult) {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the installation');
      } else {
        console.log('User dismissed the installation');
      }

      deferredPrompt = null;
    });
  });
}
