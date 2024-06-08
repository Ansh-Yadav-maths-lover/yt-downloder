from flask import Flask, request, jsonify
from pytube import YouTube

app = Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/download', methods=['GET'])
def download_video():
    video_url = request.args.get('videoUrl')
    try:
        yt = YouTube(video_url)
        title = yt.title
        description = yt.description
        stream = yt.streams.get_highest_resolution()
        download_url = stream.url
        watch_url = video_url  # Directly use video URL for watching on web
        return jsonify({
            'status': 'success',
            'title': title,
            'description': description,
            'downloadUrl': download_url,
            'watchUrl': watch_url
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

if __name__ == '__main__':
    app.run(debug=True)
