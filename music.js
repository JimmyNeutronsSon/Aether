// Welkin Music Player Essentials
(function() {
    const MUSIC_API = "https://jiosaavn-api-privatecvc2.vercel.app";
    let currentSongs = [];
    let currentIndex = -1;
    let audio = new Audio();

    // Inject HTML for Music Player
    const playerHTML = `
        <div id="music-overlay" class="music-player-overlay">
            <div class="music-player-card">
                <div class="music-close-btn" id="music-close">&times;</div>
                <div class="music-left">
                    <div class="music-cover-large" id="current-cover">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2">
                            <path d="M9 18V5l12-2v13"></path>
                            <circle cx="6" cy="18" r="3"></circle>
                            <circle cx="18" cy="16" r="3"></circle>
                        </svg>
                    </div>
                    <div class="music-song-title" id="current-title">Not Playing</div>
                    <div class="music-song-artist" id="current-artist">Search for a song</div>
                    
                    <div class="music-controls">
                        <div class="music-btn" id="music-prev">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
                        </div>
                        <div class="music-btn music-btn-play" id="music-play-pause">
                            <svg id="play-icon" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            <svg id="pause-icon" style="display:none" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                        </div>
                        <div class="music-btn" id="music-next">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
                        </div>
                    </div>

                    <div class="music-progress-container">
                        <div class="music-progress-bar" id="progress-bar">
                            <div class="music-progress-current" id="progress-current"></div>
                        </div>
                        <div class="music-time">
                            <span id="time-current">0:00</span>
                            <span id="time-total">0:00</span>
                        </div>
                    </div>
                </div>

                <div class="music-right">
                    <div class="music-search-container">
                        <svg class="music-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="text" class="music-search-input" id="music-search" placeholder="Search for songs, artists...">
                    </div>
                    <div class="music-results" id="music-results-list">
                        <!-- Results go here -->
                    </div>
                </div>
            </div>
        </div>
    `;

    document.addEventListener('DOMContentLoaded', () => {
        document.body.insertAdjacentHTML('beforeend', playerHTML);

        const overlay = document.getElementById('music-overlay');
        const searchInput = document.getElementById('music-search');
        const resultsList = document.getElementById('music-results-list');
        const playPauseBtn = document.getElementById('music-play-pause');
        const playIcon = document.getElementById('play-icon');
        const pauseIcon = document.getElementById('pause-icon');
        const nextBtn = document.getElementById('music-next');
        const prevBtn = document.getElementById('music-prev');
        const progressBar = document.getElementById('progress-bar');
        const progressCurrent = document.getElementById('progress-current');
        const timeCurrent = document.getElementById('time-current');
        const timeTotal = document.getElementById('time-total');
        const currentCover = document.getElementById('current-cover');
        const currentTitle = document.getElementById('current-title');
        const currentArtist = document.getElementById('current-artist');

        // Toggle Player
        document.addEventListener('click', (e) => {
            if (e.target.closest('#music-toggle')) {
                e.preventDefault();
                overlay.classList.add('open');
            }
            if (e.target.id === 'music-close' || e.target === overlay) {
                overlay.classList.remove('open');
            }
        });

        // Search Songs
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            const query = searchInput.value.trim();
            if (query.length < 2) return;

            searchTimeout = setTimeout(async () => {
                resultsList.innerHTML = '<div style="text-align:center; padding: 20px; opacity: 0.5;">Searching...</div>';
                try {
                    const res = await fetch(`${MUSIC_API}/search/songs?query=${encodeURIComponent(query)}&limit=20`);
                    const data = await res.json();
                    if (data.status === 'SUCCESS' && data.data.results) {
                        currentSongs = data.data.results;
                        renderResults(currentSongs);
                    }
                } catch (err) {
                    resultsList.innerHTML = '<div style="text-align:center; padding: 20px; color: #ff6b6b;">Error fetching songs</div>';
                }
            }, 500);
        });

        function renderResults(songs) {
            resultsList.innerHTML = '';
            songs.forEach((song, index) => {
                const item = document.createElement('div');
                item.className = 'music-item';
                const imgUrl = wrapUrl(song.image[1].link);
                item.innerHTML = `
                    <img class="music-item-img" src="${imgUrl}" alt="" crossorigin="anonymous">
                    <div class="music-item-info">
                        <div class="music-item-title">${cleanHtml(song.name)}</div>
                        <div class="music-item-subtitle">${cleanHtml(song.primaryArtists)}</div>
                    </div>
                `;
                item.onclick = () => playSong(index);
                resultsList.appendChild(item);
            });
        }

        function playSong(index) {
            if (index < 0 || index >= currentSongs.length) return;
            currentIndex = index;
            const song = currentSongs[index];

            // Update UI
            currentTitle.textContent = cleanHtml(song.name);
            currentArtist.textContent = cleanHtml(song.primaryArtists);
            const coverUrl = wrapUrl(song.image[2].link);
            currentCover.innerHTML = `<img src="${coverUrl}" alt="" crossorigin="anonymous">`;
            
            // Set Audio
            const originalUrl = song.downloadUrl[4]?.link || song.downloadUrl[3]?.link || song.downloadUrl[2]?.link;
            const qualityUrl = wrapUrl(originalUrl);
            audio.src = qualityUrl;
            audio.crossOrigin = "anonymous";
            audio.play();
            
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }

        function wrapUrl(url) {
            if (!url) return "";
            return `/proxy?url=${encodeURIComponent(url)}`;
        }

        playPauseBtn.onclick = () => {
            if (audio.paused) {
                audio.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            } else {
                audio.pause();
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        };

        nextBtn.onclick = () => {
            if (currentIndex < currentSongs.length - 1) {
                playSong(currentIndex + 1);
            }
        };

        prevBtn.onclick = () => {
            if (currentIndex > 0) {
                playSong(currentIndex - 1);
            }
        };

        audio.ontimeupdate = () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressCurrent.style.width = `${progress}%`;
            timeCurrent.textContent = formatTime(audio.currentTime);
            timeTotal.textContent = formatTime(audio.duration || 0);
        };

        progressBar.onclick = (e) => {
            const width = progressBar.clientWidth;
            const clickX = e.offsetX;
            const duration = audio.duration;
            audio.currentTime = (clickX / width) * duration;
        };

        audio.onended = () => {
            if (currentIndex < currentSongs.length - 1) {
                playSong(currentIndex + 1);
            } else {
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        };

        function formatTime(seconds) {
            const min = Math.floor(seconds / 60);
            const sec = Math.floor(seconds % 60);
            return `${min}:${sec < 10 ? '0' : ''}${sec}`;
        }

        function cleanHtml(str) {
            const div = document.createElement('div');
            div.innerHTML = str;
            return div.textContent || div.innerText || "";
        }
    });
})();
