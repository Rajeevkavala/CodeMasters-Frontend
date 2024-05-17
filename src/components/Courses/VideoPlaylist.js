import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoPlaylist.css'; 
import { Backbtn } from './backbtn';

function VideoPlaylist({ playlistId, title }) {
    const [mainVideo, setMainVideo] = useState({ id: 'video_id', title: '01.Video Title' });
    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
        document.title = "CodeMasters"; // Setting the document title
        fetchVideoList();
    }, [playlistId]);

    const fetchVideoList = async () => {
        try {
            let nextPageToken = '';
            let allVideos = [];

            do {
                const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
                    params: {
                        part: 'snippet',
                        playlistId: playlistId,
                        key: 'AIzaSyAK80MUQMoZyhP3J88ZoHru_oYqztH8Bhc',
                        maxResults: 50, // Maximum items per request (max: 50)
                        pageToken: nextPageToken // Pagination token
                    }
                });

                const videos = response.data.items.map(item => ({
                    id: item.snippet.resourceId.videoId,
                    title: item.snippet.title
                }));

                allVideos = allVideos.concat(videos);
                nextPageToken = response.data.nextPageToken;
            } while (nextPageToken);

            setVideoList(allVideos);
            setMainVideo(allVideos[0]); // Set the first video as the main video by default

            // console.log("mainVideo:", mainVideo); // Debugging: Log mainVideo
        } catch (error) {
            console.error('Error fetching video list:', error);
        }
    };

    const handleVideoClick = (video) => {
        setMainVideo(video);
    };

    return (
        <div className='courses-video-section'>
            <div className="btn-with-head">
                <div className="back-btn-course">
                    <Backbtn/>
                </div>
                <div className="head-1">
                    <u>
                        <h3 className="heading">{title}</h3>   
                    </u>
                </div>
            </div>
            <div className="container-video">
                <div className="main-video">
                    <div className="video">
                        <div className="iframe-div">
                            <iframe
                                title="YouTube Video"
                                width="700"
                                height="415"
                                src={`https://www.youtube.com/embed/${mainVideo.id}?autoplay=1`} // Adding mute parameter
                                frameBorder="0"
                                allowFullScreen="true"
                            ></iframe>

                        </div>
                    </div>
                    <div className="title-div">
                        <h3 className="video-title">{mainVideo.title}</h3> {/* Title below the video */}
                    </div>
                </div>
                <div className="video-list">
                    {videoList.map((video, index) => (
                        <div className={`vid ${mainVideo.id === video.id ? 'active' : ''}`} key={index} onClick={() => handleVideoClick(video)}>
                            <h3 className="title">{`${index + 1}. ${video.title}`}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VideoPlaylist;
