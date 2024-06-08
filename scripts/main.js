async function downloadVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    if (videoUrl) {
        try {
            const response = await fetch(`https://savefrom.net/api/ajax.php?url=${encodeURIComponent(videoUrl)}`);
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Failed to download video.');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    } else {
        alert('Please enter a video URL.');
    }
}
