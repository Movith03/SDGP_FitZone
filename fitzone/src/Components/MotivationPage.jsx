import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MotivationPage = () => {
  const [videos, setVideos] = useState([])
  const [loadingVideos, setLoadingVideos] = useState(true)
  const [error, setError] = useState('')

  const YOUTUBE_API_KEY = 'AIzaSyC8OH1bM_AHHNpfXLSdX1PsXJ0AX1IZeY0' // Replace with your YouTube API key

  useEffect(() => {
    fetchMotivationalVideos()
  }, [])

  const fetchMotivationalVideos = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=gym+motivation&key=${YOUTUBE_API_KEY}`
      )
      setVideos(response.data.items)
    } catch (error) {
      setError('Error fetching motivational videos.')
    } finally {
      setLoadingVideos(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Motivational Content</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div>
        <h2 className="text-2xl font-semibold mt-4">Motivational Videos</h2>
        {loadingVideos ? (
          <p>Loading videos...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div key={video.id.videoId} className="border rounded-lg p-2">
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  title={video.snippet.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <h3 className="mt-2 font-semibold">{video.snippet.title}</h3>
                <p>{video.snippet.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mt-4">Motivational Music</h2>
        <iframe
          src="https://open.spotify.com/embed/playlist/20OSJJXopKEuN1jkOKNrwa?utm_source=generator"
          width="100%"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          title="Spotify Playlist"
        ></iframe>
      </div>
    </div>
  )
}

export default MotivationPage
