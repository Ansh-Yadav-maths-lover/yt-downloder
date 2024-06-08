async function downloadVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
        const data = null;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                const response = JSON.parse(this.responseText);
                if (response && response.streams && response.streams.length > 0) {
                    const downloadUrl = response.streams[0].url;  // Get the first stream's URL
                    window.location.href = downloadUrl;
                } else {
                    alert('Failed to retrieve download link.');
                }
            }
        });

        xhr.open('GET', `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${videoId}`);
        xhr.setRequestHeader('x-rapidapi-key', '2728d791f9mshb8671fa21485b82p1dcb7ajsnb42dd990814e');
        xhr.setRequestHeader('x-rapidapi-host', 'youtube-media-downloader.p.rapidapi.com');

        xhr.send(data);
    } else {
        alert('Please enter a valid YouTube video URL.');
    }
}

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
