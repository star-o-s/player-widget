const playPauseBtn = document.getElementById('playPauseBtn');
let audio = null;
let isPlaying = false;

// Tu Client ID de la API de Jamendo
const clientId = '77117b46';

// Función para obtener una pista aleatoria desde Jamendo
async function fetchRandomTrack() {
  const apiUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=77117b46&format=json&limit=1&order=popularity_total`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.results.length > 0) {
      const track = data.results[0];
      return track.audio; // URL de la pista
    }
  } catch (error) {
    console.error('Error fetching track:', error);
    return null;
  }
}

// Manejar el botón Play/Pause
playPauseBtn.addEventListener('click', async () => {
  if (!audio) {
    const trackUrl = await fetchRandomTrack();
    if (!trackUrl) {
      alert('No se pudo cargar la pista. Inténtalo más tarde.');
      return;
    }
    audio = new Audio(trackUrl);
  }

  if (isPlaying) {
    audio.pause();
    playPauseBtn.classList.remove('pause');
  } else {
    audio.play();
    playPauseBtn.classList.add('pause');
  }

  isPlaying = !isPlaying;
});