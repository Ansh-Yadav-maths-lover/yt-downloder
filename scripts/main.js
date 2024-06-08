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
            console.log('Response status:', response.status);
            console.log('Response status text:', response.statusText);

            const data = await response.json();
            console.log('Response data:', data);

            if (data.status === 'ok') {
                const links = data.links;
                if (links && links.mp4) {
                    const qualities = Object.keys(links.mp4);
                    if (qualities.length > 0) {
                        const downloadUrl = links.mp4[qualities[0]].url;  // Select the first available quality
                        window.location.href = downloadUrl;
                    } else {
                        alert('No downloadable links found.');
                    }
                } else {
                    alert('Failed to retrieve download links.');
                }
            } else {
                alert('Failed to download video.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        }
    } else {
        alert('Please enter a video URL.');
    }
}
