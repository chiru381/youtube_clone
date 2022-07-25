import React, {useEffect, useState} from 'react'

function one() {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetchVideos = async () => {
            const res = axios.get('/videos')
            setVideos(res.data)
        }
        fetchVideos()
    }, [])
  return (
    <div>
        {videos.map((video) => {
            <Card key={video.id} video={video} />
        })}
    </div>
  )
}

export default one 