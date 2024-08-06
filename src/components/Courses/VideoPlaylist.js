import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { database, auth } from '../Features/Auth/FireBase'; // Corrected path to the firebase file
import { ref, get, set, update } from "firebase/database"; 
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase Authentication
import './VideoPlaylist.css'; 
import { Backbtn } from './backbtn';

function VideoPlaylist({ playlistId, title }) {
    const [mainVideo, setMainVideo] = useState({ id: 'video_id', title: '01.Video Title' });
    const [videoList, setVideoList] = useState([]);
    const [completedVideos, setCompletedVideos] = useState([]);
    const [progress, setProgress] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        document.title = "CodeMasters"; // Setting the document title

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                fetchUserProgress(currentUser.uid, playlistId); // Fetch user progress from Firebase Realtime Database
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [playlistId]);

    useEffect(() => {
        if (user) {
            fetchVideoList();
        }
    }, [playlistId, user]);

    useEffect(() => {
        if (videoList.length > 0) {
            calculateProgress(completedVideos);
        }
    }, [videoList, completedVideos]);

    async function fetchVideoList() {
        try {
            let nextPageToken = '';
            let allVideos = [];

            do {
                const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
                    params: {
                        part: 'snippet',
                        playlistId: playlistId,
                        key: process.env.REACT_APP_YOUTUBE_API_KEY, // Securely use the API key
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

            // Calculate progress after fetching the video list
            if (completedVideos.length > 0) {
                calculateProgress(completedVideos, allVideos);
            }
        } catch (error) {
            console.error('Error fetching video list:', error);
        }
    }

    async function fetchUserProgress(userId, playlistId) {
        try {
            const userProgressRef = ref(database, `userProgress/${userId}/playlists/${playlistId}`);
            const snapshot = await get(userProgressRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                setCompletedVideos(userData.completedVideos || []);
                
                // Calculate progress after fetching user progress
                if (videoList.length > 0) {
                    calculateProgress(userData.completedVideos || [], videoList);
                }
            } else {
                // If no user data exists, create an initial entry
                await set(userProgressRef, {
                    completedVideos: []
                });
            }
        } catch (error) {
            console.error('Error fetching user progress:', error);
        }
    }

    function calculateProgress(completedVideos) {
        if (videoList.length === 0) {
            setProgress(0);
            return;
        }
        const progress = (completedVideos.length / videoList.length) * 100;
        setProgress(progress.toFixed(2));
    }

    const handleVideoClick = (video) => {
        setMainVideo(video);
    };

    const handleMarkAsDone = async (videoId) => {
        if (!completedVideos.includes(videoId)) {
            const updatedCompletedVideos = [...completedVideos, videoId];
            setCompletedVideos(updatedCompletedVideos);
            calculateProgress(updatedCompletedVideos);

            if (user) {
                // Update in Firebase Realtime Database
                const userProgressRef = ref(database, `userProgress/${user.uid}/playlists/${playlistId}`);
                await update(userProgressRef, {
                    completedVideos: updatedCompletedVideos
                });
            }
        }
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
                                src={`https://www.youtube.com/embed/${mainVideo.id}?autoplay=1&mute=1`} // Adding mute parameter
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <div className="title-div">
                        <h3 className="video-title">{mainVideo.title}</h3> {/* Title below the video */}
                        <button className="mark-done-btn" onClick={() => handleMarkAsDone(mainVideo.id)}>
                            <button alt="Mark As Done">
                                <i>M</i>
                                <i>a</i>
                                <i>r</i>
                                <i>k</i>
                                <i>&nbsp;</i>
                                <i>A</i>
                                <i>s</i>
                                <i>&nbsp;</i>
                                <i>D</i>
                                <i>o</i>
                                <i>n</i>
                                <i>e</i>
                                </button>
                            </button>
                    </div>
                </div>
                <div className="video-list">
                    {videoList.map((video, index) => (
                        <div className={`vid ${mainVideo.id === video.id ? 'active' : ''} ${completedVideos.includes(video.id) ? 'done' : ''}`} key={index} onClick={() => handleVideoClick(video)}>
                            <h3 className="title">{`${index + 1}. ${video.title}`}</h3>
                            {completedVideos.includes(video.id) && 
                            <span className="active-done">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z"/></svg>
                            </span>}
                        </div>
                    ))}
                </div>
                <div className="progress-div">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <h3>Progress: {progress}%</h3>
                </div>
            </div>
        </div>
    );
}

export default VideoPlaylist;
