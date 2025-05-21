"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle, 
  Volume2, 
  Search, 
  Heart, 
  MoreHorizontal,
  Home as HomeIcon,
  Library,
  PlusSquare,
  Clock,
  VolumeX,
  Volume1
} from "lucide-react"
import Image from "next/image"

export default function SpotifyApp() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)
  const [activePlaylist, setActivePlaylist] = useState("recently-played")
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(80)
  const [isShuffleOn, setIsShuffleOn] = useState(false)
  const [isRepeatOn, setIsRepeatOn] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchActive, setIsSearchActive] = useState(false)

  const progressBarRef = useRef<HTMLDivElement>(null)
  const volumeBarRef = useRef<HTMLDivElement>(null)

  const playlists = [
    { id: "recently-played", name: "Recently Played" },
    { id: "favorites", name: "Favorites" },
    { id: "discover", name: "Discover Weekly" },
    { id: "chill", name: "Chill Vibes" },
    { id: "workout", name: "Workout Mix" },
    { id: "focus", name: "Focus Flow" },
    { id: "throwbacks", name: "2010s Throwbacks" },
  ]

  const songs = {
    "recently-played": [
      {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:20",
        length: 200, // in seconds
        cover: "/abstract-soundscape.png",
      },
      {
        id: 2,
        title: "Don't Start Now",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        duration: "3:03",
        length: 183,
        cover: "/blue-album-cover.png",
      },
      {
        id: 3,
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        album: "Fine Line",
        duration: "2:54",
        length: 174,
        cover: "/red-album-cover.png",
      },
      {
        id: 4,
        title: "Levitating",
        artist: "Dua Lipa ft. DaBaby",
        album: "Future Nostalgia",
        duration: "3:23",
        length: 203,
        cover: "/purple-album-cover.png",
      },
      {
        id: 5,
        title: "Save Your Tears",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:35",
        length: 215,
        cover: "/dark-album-cover.png",
      },
    ],
    favorites: [
      {
        id: 6,
        title: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        duration: "5:55",
        length: 355,
        cover: "/queen-album-cover.png",
      },
      {
        id: 7,
        title: "Hotel California",
        artist: "Eagles",
        album: "Hotel California",
        duration: "6:30",
        length: 390,
        cover: "/desert-highway-album.png",
      },
      {
        id: 8,
        title: "Sweet Child O' Mine",
        artist: "Guns N' Roses",
        album: "Appetite for Destruction",
        duration: "5:56",
        length: 356,
        cover: "/guns-n-roses-album-art.png",
      },
    ],
    discover: [
      {
        id: 9,
        title: "New Discovery 1",
        artist: "Emerging Artist",
        album: "First Album",
        duration: "3:45",
        length: 225,
        cover: "/indie-album-cover.png",
      },
      {
        id: 10,
        title: "Fresh Track",
        artist: "New Band",
        album: "Debut EP",
        duration: "4:12",
        length: 252,
        cover: "/placeholder-1i1vf.png",
      },
    ],
    chill: [
      {
        id: 11,
        title: "Chill Beats",
        artist: "Lo-fi Producer",
        album: "Study Session",
        duration: "3:33",
        length: 213,
        cover: "/placeholder.svg?height=60&width=60&query=lofi%20beats",
      },
      {
        id: 12,
        title: "Ambient Waves",
        artist: "Chill Artist",
        album: "Relaxation",
        duration: "5:21",
        length: 321,
        cover: "/placeholder.svg?height=60&width=60&query=ambient%20music",
      },
    ],
    workout: [
      {
        id: 13,
        title: "Pump Up",
        artist: "Fitness DJ",
        album: "Gym Mix",
        duration: "2:55",
        length: 175,
        cover: "/placeholder.svg?height=60&width=60&query=workout%20music",
      },
      {
        id: 14,
        title: "High Energy",
        artist: "Cardio Beats",
        album: "Running Playlist",
        duration: "3:15",
        length: 195,
        cover: "/placeholder.svg?height=60&width=60&query=running%20playlist",
      },
    ],
    focus: [
      {
        id: 15,
        title: "Deep Focus",
        artist: "Brain Waves",
        album: "Concentration",
        duration: "4:18",
        length: 258,
        cover: "/placeholder.svg?height=60&width=60&query=focus%20music",
      },
      {
        id: 16,
        title: "Productivity Boost",
        artist: "Mind Collective",
        album: "Work Mode",
        duration: "3:45",
        length: 225,
        cover: "/placeholder.svg?height=60&width=60&query=productivity%20music",
      },
    ],
    throwbacks: [
      {
        id: 17,
        title: "Party In The USA",
        artist: "Miley Cyrus",
        album: "The Time of Our Lives",
        duration: "3:22",
        length: 202,
        cover: "/placeholder.svg?height=60&width=60&query=miley%20cyrus",
      },
      {
        id: 18,
        title: "Teenage Dream",
        artist: "Katy Perry",
        album: "Teenage Dream",
        duration: "3:47",
        length: 227,
        cover: "/placeholder.svg?height=60&width=60&query=katy%20perry",
      },
    ],
  }

  const activeSongs = songs[activePlaylist as keyof typeof songs]
  const currentSong = activeSongs[currentSongIndex]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNextSong = useCallback(() => {
    if (isShuffleOn) {
      // Pick a random song that's not the current one
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * activeSongs.length);
      } while (randomIndex === currentSongIndex && activeSongs.length > 1);
      
      setCurrentSongIndex(randomIndex);
    } else {
      // Move to next song or loop back to the beginning
      setCurrentSongIndex((prevIndex) => 
        prevIndex < activeSongs.length - 1 ? prevIndex + 1 : 0
      );
    }
    setCurrentTime(0);
  }, [isShuffleOn, activeSongs, currentSongIndex]);

  // Start/pause the song timer when playing state changes
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          const currentSongLength = activeSongs[currentSongIndex].length;
          
          // If the song has ended, move to the next one or loop
          if (prevTime >= currentSongLength) {
            if (isRepeatOn) {
              return 0; // Loop the current song
            } else {
              handleNextSong();
              return 0; // Reset time for the next song
            }
          }
          return prevTime + 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSongIndex, activePlaylist, isRepeatOn, activeSongs, handleNextSong]);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePrevSong = () => {
    // If we're more than 3 seconds into the song, restart it
    if (currentTime > 3) {
      setCurrentTime(0);
      return;
    }
    
    // Otherwise go to previous song
    setCurrentSongIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : activeSongs.length - 1
    );
    setCurrentTime(0);
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = Math.floor(percent * currentSong.length);
    
    setCurrentTime(newTime);
  }

  const handleVolumeBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeBarRef.current) return;
    
    const rect = volumeBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.floor(percent * 100);
    
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  }

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
      setVolume(0);
    }
  }

  const playSong = (index: number) => {
    setCurrentSongIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  // Filter songs based on search query
  const filteredSongs = activeSongs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX />;
    if (volume < 50) return <Volume1 />;
    return <Volume2 />;
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - desktop */}
        <div className={`w-56 bg-black p-4 hidden md:block`}>
          <div className="mb-6">
            <div className="mb-6 flex items-center">
              <Image src="/spotify.svg" alt="Spotify" width={32} height={32} className="mr-2" />
              <span className="font-bold text-lg">Spotify</span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300 hover:text-white cursor-pointer font-medium">
                <HomeIcon className="w-5 h-5 mr-3" /> Home
              </li>
              <li className="flex items-center text-gray-300 hover:text-white cursor-pointer font-medium">
                <Search className="w-5 h-5 mr-3" /> Search
              </li>
              <li className="flex items-center text-gray-300 hover:text-white cursor-pointer font-medium">
                <Library className="w-5 h-5 mr-3" /> Your Library
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <PlusSquare className="w-5 h-5 mr-2 text-gray-300" />
              <span className="text-gray-300 font-medium">Create Playlist</span>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-700 to-blue-500 rounded-md mb-4">
              <h3 className="font-bold mb-1">Liked Songs</h3>
              <p className="text-xs text-gray-300">320 songs</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Your Playlists</h2>
            <ul className="space-y-2">
              {playlists.map((playlist) => (
                <li
                  key={playlist.id}
                  onClick={() => {
                    setActivePlaylist(playlist.id);
                    setCurrentSongIndex(0);
                    setCurrentTime(0);
                  }}
                  className={`text-sm cursor-pointer py-1 px-2 rounded ${
                    activePlaylist === playlist.id 
                      ? "bg-gray-800 text-white" 
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {playlist.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden bg-black px-4 py-2 fixed bottom-20 left-0 right-0 z-10 border-t border-gray-800">
          <div className="flex justify-around">
            <button className="flex flex-col items-center text-xs">
              <HomeIcon className="w-5 h-5 mb-1" />
              <span>Home</span>
            </button>
            <button 
              className="flex flex-col items-center text-xs"
              onClick={() => setIsSearchActive(!isSearchActive)}  
            >
              <Search className="w-5 h-5 mb-1" />
              <span>Search</span>
            </button>
            <button 
              className="flex flex-col items-center text-xs"
              onClick={() => setShowMobileNav(!showMobileNav)}
            >
              <Library className="w-5 h-5 mb-1" />
              <span>Library</span>
            </button>
          </div>
        </div>

        {/* Mobile playlist drawer */}
        {showMobileNav && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-20 md:hidden p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Library</h2>
              <button 
                onClick={() => setShowMobileNav(false)}
                className="p-2 text-gray-300"
              >
                ×
              </button>
            </div>
            <ul className="space-y-3">
              {playlists.map((playlist) => (
                <li
                  key={playlist.id}
                  onClick={() => {
                    setActivePlaylist(playlist.id);
                    setCurrentSongIndex(0);
                    setCurrentTime(0);
                    setShowMobileNav(false);
                  }}
                  className="p-3 bg-gray-900 rounded-md flex justify-between items-center"
                >
                  <span>{playlist.name}</span>
                  <span>→</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main content area */}
        <div className="flex-1 overflow-auto p-4 relative">
          {/* Search bar - appears when search is active */}
          {isSearchActive && (
            <div className="sticky top-0 bg-gray-900 p-2 rounded-full mb-4 z-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search in playlist"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          )}

          {/* Playlist header */}
          <div className="flex items-start mb-6">
            <div className="w-40 h-40 mr-6 bg-gradient-to-br from-purple-700 to-blue-500 rounded-md flex items-center justify-center shadow-lg hidden sm:flex">
              <Image 
                src={activeSongs[0]?.cover || "/placeholder.svg"} 
                alt="Playlist cover" 
                width={160} 
                height={160}
                className="rounded-md"
              />
            </div>
            <div>
              <p className="text-xs text-gray-300 font-medium uppercase">Playlist</p>
              <h1 className="text-3xl sm:text-5xl font-bold mb-4">{playlists.find((p) => p.id === activePlaylist)?.name}</h1>
              <p className="text-sm text-gray-300">{activeSongs.length} songs • approximately {Math.floor(activeSongs.reduce((total, song) => total + song.length, 0) / 60)} minutes</p>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-6 flex items-center space-x-4">
            <button 
              onClick={togglePlay}
              className="w-12 h-12 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
            </button>
            
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`text-3xl ${isLiked ? 'text-green-500' : 'text-gray-300 hover:text-white'}`}
            >
              <Heart className="w-7 h-7" fill={isLiked ? "#22c55e" : "none"} />
            </button>
            
            <button className="text-gray-300 hover:text-white">
              <MoreHorizontal className="w-7 h-7" />
            </button>
          </div>

          {/* Song list */}
          <div className="bg-gray-900 bg-opacity-20 rounded-md">
            <table className="min-w-full divide-y divide-gray-800">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-xs">
                  <th className="px-4 py-3 text-left font-medium">#</th>
                  <th className="px-4 py-3 text-left font-medium">
                    TITLE
                  </th>
                  <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">
                    ALBUM
                  </th>
                  <th className="px-4 py-3 text-right font-medium hidden md:table-cell">
                    <Clock className="w-4 h-4 inline" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {(searchQuery ? filteredSongs : activeSongs).map((song, index) => (
                  <tr 
                    key={song.id} 
                    className={`hover:bg-white hover:bg-opacity-10 cursor-pointer ${
                      currentSongIndex === index && activePlaylist === activePlaylist 
                        ? "bg-gray-800 bg-opacity-40" 
                        : ""
                    }`}
                    onClick={() => playSong(index)}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {currentSongIndex === index && isPlaying ? (
                        <div className="w-4 flex items-center justify-center">
                          <div className="equalizer">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      ) : (
                        <span className={
                          currentSongIndex === index ? "text-green-500" : "text-gray-400"
                        }>{index + 1}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <Image
                          src={song.cover || "/placeholder.svg"}
                          alt={song.album}
                          width={40}
                          height={40}
                          className="rounded mr-3"
                        />
                        <div>
                          <div className={`text-sm font-medium ${
                            currentSongIndex === index ? "text-green-500" : ""
                          }`}>{song.title}</div>
                          <div className="text-sm text-gray-400">{song.artist}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400 hidden sm:table-cell">
                      {song.album}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400 hidden md:table-cell text-right">
                      {song.duration}
                    </td>
                  </tr>
                ))}
                {filteredSongs.length === 0 && searchQuery && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                      No results found for &quot;{searchQuery}&quot;
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Player controls */}
      <div className="h-20 bg-gray-900 border-t border-gray-800 p-4 flex items-center sticky bottom-0">
        <div className="flex items-center w-1/4">
          <Image
            src={currentSong.cover || "/placeholder.svg"}
            alt={currentSong.album}
            width={50}
            height={50}
            className="rounded mr-3"
          />
          <div className="hidden xs:block">
            <div className="text-sm font-medium truncate">{currentSong.title}</div>
            <div className="text-xs text-gray-400 truncate">{currentSong.artist}</div>
          </div>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="ml-3 hidden xs:block"
          >
            <Heart className="w-4 h-4" fill={isLiked ? "#22c55e" : "none"} />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center max-w-lg mx-auto">
          <div className="flex items-center space-x-4 mb-2">
            <button 
              onClick={() => setIsShuffleOn(!isShuffleOn)}
              className={`w-5 h-5 ${isShuffleOn ? 'text-green-500' : 'text-gray-400 hover:text-white'} cursor-pointer`}
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button 
              onClick={handlePrevSong}
              className="w-7 h-7 text-gray-400 hover:text-white cursor-pointer"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-black" /> : <Play className="w-4 h-4 text-black ml-0.5" />}
            </button>
            <button 
              onClick={handleNextSong}
              className="w-7 h-7 text-gray-400 hover:text-white cursor-pointer"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsRepeatOn(!isRepeatOn)}
              className={`w-5 h-5 ${isRepeatOn ? 'text-green-500' : 'text-gray-400 hover:text-white'} cursor-pointer`}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full flex items-center">
            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
            <div 
              ref={progressBarRef}
              onClick={handleProgressBarClick}
              className="mx-2 flex-1 h-1 bg-gray-700 rounded-full relative cursor-pointer group"
            >
              <div
                className="h-1 bg-gray-400 group-hover:bg-green-500 rounded-full"
                style={{ width: `${(currentTime / currentSong.length) * 100}%` }}
              ></div>
              <div 
                className="absolute w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 top-1/2 transform -translate-y-1/2"
                style={{ left: `${(currentTime / currentSong.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400 w-10">{currentSong.duration}</span>
          </div>
        </div>

        <div className="w-1/4 flex justify-end items-center">
          <button 
            onClick={toggleMute}
            className="text-gray-400 hover:text-white mr-2"
          >
            <VolumeIcon />
          </button>
          <div 
            ref={volumeBarRef}
            onClick={handleVolumeBarClick}
            className="w-20 h-1 bg-gray-700 rounded-full relative cursor-pointer group hidden sm:block"
          >
            <div className="h-1 bg-gray-400 group-hover:bg-green-500 rounded-full" style={{ width: `${volume}%` }}></div>
            <div 
              className="absolute w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 top-1/2 transform -translate-y-1/2"
              style={{ left: `${volume}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Add this at the end of your component for the equalizer animation */}
      <style jsx>{`
        .equalizer {
          display: flex;
          align-items: flex-end;
          height: 14px;
          width: 16px;
        }
        
        .equalizer span {
          background-color: #1DB954;
          width: 3px;
          margin-right: 2px;
          height: 4px;
          animation: equalize 1s infinite;
        }
        
        .equalizer span:nth-child(2) {
          animation-delay: 0.3s;
        }
        
        .equalizer span:nth-child(3) {
          margin-right: 0;
          animation-delay: 0.6s;
        }
        
        @keyframes equalize {
          0% { height: 4px; }
          50% { height: 12px; }
          100% { height: 4px; }
        }
      `}</style>
    </div>
  )
}
