import React, { useState, useEffect } from 'react'
import { db, auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import "../DashboardPage.css"
import Authentication from './Authentication';
import searchIcon from "../images/search.png";

const Dashboard = () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    console.log((auth.currentUser) ? auth.currentUser : "not logged in");

    const [watchHistory, setWatchHistory] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [user, setUser] = useState(null);
    const [videoTitles, setVideoTitles] = useState({});
    
    

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // Clean up the listener when the component unmounts
  return () => unsubscribe();
}, []);
    

    const navigate = useNavigate();

    useEffect(() => {
        const retrieveHistoryAndFavorites = async () => {
            if(user) {
                // access firestore and retrieve user info by uid
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);
                let history = userDoc.data().history;
                let favorite = userDoc.data().favorites;

                // set state variables to user info
                setWatchHistory(history);
                setFavorites(favorite);
            } else {
                console.error("error");
            }
        }
        retrieveHistoryAndFavorites();
        console.log(watchHistory);
        console.log(favorites);
    }, [user]);

    useEffect(() => {
        // Assuming videos is an array of your video URLs...
        watchHistory.forEach(async (video) => {
          const title = await handleYoutubeTitle(video);
          setVideoTitles(prevTitles => ({ ...prevTitles, [video]: title }));
        });
      }, [watchHistory]);

    const handleFavorites = async (video) => {
        const userRef = doc(db, "users", user.uid);

        // Update the document;
        if(favorites.includes(video)) {
            // if video is already favorited, remove it
            setFavorites(favorites.filter(favorite => favorite != video));
            await updateDoc(userRef, {
                favorites: arrayRemove(video)
            });
        } else {
            setFavorites([...favorites, video]);

            await updateDoc(userRef, {
                favorites: arrayUnion(video)
            });
        }
    }

    const handleYouTubeThumbnail = (video) => {
        let link = video.split("?v=")[1];
        let thumbnail = "https://img.youtube.com/vi/" + link + "/0.jpg"
        return thumbnail;
    }

    const handleYoutubeTitle = async (video) => {
        let videoId = video.split("?v=")[1];
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`);
            const data = await response.json();
            const title = data.items[0].snippet.title;
            console.log(title);
            return title;
        } catch (error) {
            console.error('Error:', error);
        }
    }



    return (
    <div>
        <nav className="nav">
        <ul>
          <li className="active">
            <NavLink to="/">Home</NavLink>
          </li>
          <Authentication />
        </ul>
        </nav>
        <div className="dashboard-container">
            <div className="video-container watched-videos">
            <h2>History</h2>
            <div className="search-container">
                <input type="text" placeholder="Search" />
                <img src={searchIcon} alt="" className="search-button" />
            </div>
            <div>
            {watchHistory && watchHistory.length > 0 ? 
            watchHistory.map((video, index) => {
                    return (
                        <div key = {index} >
                            <img src={handleYouTubeThumbnail(video)}/>
                            <h2>{videoTitles[video]}</h2>
                            {favorites && favorites.includes(video) ? null : (
                                <button onClick={() => handleFavorites(video)}>
                                Favorite
                            </button>
                            )}
                        </div>
                    )
                
            })
            : (
                <h2>You have no videos watched!</h2>
            )}
            </div>

            </div>

            <div className="video-container starred-videos">
            <h2>Favorites</h2>
            <div className="search-container">
                <input type="text" placeholder="Search" />
                <img src={searchIcon} alt="" className="search-button" />
            </div>
            <div>
            {favorites && favorites.length > 0 ? 
                    favorites.map((video, index) => {
                            return (
                                <div key = {index}>
                                    <img src={handleYouTubeThumbnail(video)}/>
                                    <h2>{videoTitles[video]}</h2>
                                    <button onClick={() => handleFavorites(video)}>
                                        Unfavorite
                                    </button>
                                </div>
                            )
                    })
                : (
                    <h2>
                        You haven't favorited any videos!
                    </h2>
                )}
            </div>
            </div>
        </div>
                
        {/*         
        <div className="container1">
          <div className ="formDiv changePadding">
            <h1>History</h1>
            <div style={{ overflowY: 'auto'}}>
            {watchHistory && watchHistory.length > 0 ? 
            watchHistory.map((video, index) => {
                    return (
                        <div key = {index} >
                            <img src={handleYouTubeThumbnail(video)} style={{ width: '350px', height: '300px'}} />
                            <h2>{videoTitles[video]}</h2>
                            {favorites.includes(video) ? null : (
                                <button onClick={() => handleFavorites(video)}>
                                Favorite
                            </button>
                            )}
                        </div>
                    )
                
            })
            : (
                <h1>You have no videos watched!</h1>
            )}
            </div>

          </div>
      </div>


        <div className="container1">
          <div className ="formDiv changePadding">
            <h1>Favorites</h1>
            <div style={{ overflowY: 'auto'}}>
            {favorites && favorites.length > 0 ? 
                    favorites.map((video, index) => {
                            return (
                                <div key = {index}>
                                    <img src={handleYouTubeThumbnail(video)} style={{ width: '350px', height: '300px' }} />
                                    <h2>{videoTitles[video]}</h2>
                                    <button onClick={() => handleFavorites(video)}>
                                        Unfavorite
                                    </button>
                                </div>
                            )
                    })
                : (
                    <h1>
                        You haven't favorited any videos!
                    </h1>
                )}
            </div>
          </div>
      </div>
            */}        
    </div>
  )
}

export default Dashboard;
