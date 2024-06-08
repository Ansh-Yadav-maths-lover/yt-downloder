async function downloadVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    if (videoUrl) {
        try {
            const y2mateUrl = `https://www.y2mate.com/mates/en68/analyze/ajax?url=${encodeURIComponent(videoUrl)}&q_auto=0&ajax=1`;
            const response = await fetch(y2mateUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            const data = await response.json();
            if (data.status === 'ok') {
                // Extract the video download link from the response
                const downloadUrl = data.links.mp4['18'].url;  // Adjust this based on the desired format/quality
                window.location.href = downloadUrl;
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
