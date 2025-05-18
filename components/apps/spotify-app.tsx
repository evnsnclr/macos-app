"use client"

import { useState } from "react"
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2 } from "lucide-react"
import Image from "next/image"

export default function SpotifyApp() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)
  const [activePlaylist, setActivePlaylist] = useState("recently-played")

  const playlists = [
    { id: "recently-played", name: "Recently Played" },
    { id: "favorites", name: "Favorites" },
    { id: "discover", name: "Discover Weekly" },
    { id: "chill", name: "Chill Vibes" },
    { id: "workout", name: "Workout Mix" },
  ]

  const songs = {
    "recently-played": [
      {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:20",
        cover: "/abstract-soundscape.png",
      },
      {
        id: 2,
        title: "Don't Start Now",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        duration: "3:03",
        cover: "/blue-album-cover.png",
      },
      {
        id: 3,
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        album: "Fine Line",
        duration: "2:54",
        cover: "/red-album-cover.png",
      },
      {
        id: 4,
        title: "Levitating",
        artist: "Dua Lipa ft. DaBaby",
        album: "Future Nostalgia",
        duration: "3:23",
        cover: "/purple-album-cover.png",
      },
      {
        id: 5,
        title: "Save Your Tears",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:35",
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
        cover: "/queen-album-cover.png",
      },
      {
        id: 7,
        title: "Hotel California",
        artist: "Eagles",
        album: "Hotel California",
        duration: "6:30",
        cover: "/desert-highway-album.png",
      },
      {
        id: 8,
        title: "Sweet Child O' Mine",
        artist: "Guns N' Roses",
        album: "Appetite for Destruction",
        duration: "5:56",
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
        cover: "/indie-album-cover.png",
      },
      {
        id: 10,
        title: "Fresh Track",
        artist: "New Band",
        album: "Debut EP",
        duration: "4:12",
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
        cover: "/placeholder.svg?height=60&width=60&query=lofi%20beats",
      },
      {
        id: 12,
        title: "Ambient Waves",
        artist: "Chill Artist",
        album: "Relaxation",
        duration: "5:21",
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
        cover: "/placeholder.svg?height=60&width=60&query=workout%20music",
      },
      {
        id: 14,
        title: "High Energy",
        artist: "Cardio Beats",
        album: "Running Playlist",
        duration: "3:15",
        cover: "/placeholder.svg?height=60&width=60&query=running%20playlist",
      },
    ],
  }

  const currentSong = songs[activePlaylist as keyof typeof songs][0]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-black p-4 hidden md:block">
          <div className="mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Library</h2>
            <ul className="space-y-1">
              <li className="text-sm text-gray-300 hover:text-white cursor-pointer">Made For You</li>
              <li className="text-sm text-gray-300 hover:text-white cursor-pointer">Recently Played</li>
              <li className="text-sm text-gray-300 hover:text-white cursor-pointer">Liked Songs</li>
              <li className="text-sm text-gray-300 hover:text-white cursor-pointer">Albums</li>
              <li className="text-sm text-gray-300 hover:text-white cursor-pointer">Artists</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Playlists</h2>
            <ul className="space-y-1">
              {playlists.map((playlist) => (
                <li
                  key={playlist.id}
                  onClick={() => setActivePlaylist(playlist.id)}
                  className={`text-sm cursor-pointer ${activePlaylist === playlist.id ? "text-green-500" : "text-gray-300 hover:text-white"}`}
                >
                  {playlist.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-auto p-4">
          <h1 className="text-2xl font-bold mb-4">{playlists.find((p) => p.id === activePlaylist)?.name}</h1>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 mr-4 bg-gradient-to-br from-purple-700 to-blue-500 rounded-md flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Your Top Mix</h2>
                <p className="text-sm text-gray-400">Personalized playlist based on your listening history</p>
              </div>
            </div>

            <button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-2 font-semibold">
              Play
            </button>
          </div>

          {/* Song list */}
          <div className="bg-gray-900 bg-opacity-30 rounded-md">
            <table className="min-w-full divide-y divide-gray-800">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">#</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                    Album
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {songs[activePlaylist as keyof typeof songs].map((song, index) => (
                  <tr key={song.id} className="hover:bg-gray-800 cursor-pointer">
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-400">{index + 1}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <Image
                          src={song.cover || "/placeholder.svg"}
                          alt={song.album}
                          width={40}
                          height={40}
                          className="rounded mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium">{song.title}</div>
                          <div className="text-sm text-gray-400">{song.artist}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-400 hidden sm:table-cell">
                      {song.album}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-400 hidden md:table-cell">
                      {song.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Player controls */}
      <div className="h-20 bg-gray-900 border-t border-gray-800 p-4 flex items-center">
        <div className="flex items-center w-1/4">
          <Image
            src={currentSong.cover || "/placeholder.svg"}
            alt={currentSong.album}
            width={50}
            height={50}
            className="rounded mr-3"
          />
          <div className="hidden sm:block">
            <div className="text-sm font-medium truncate">{currentSong.title}</div>
            <div className="text-xs text-gray-400 truncate">{currentSong.artist}</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-2">
            <Shuffle className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
            <SkipBack className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            <button
              onClick={togglePlay}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-black" /> : <Play className="w-4 h-4 text-black ml-0.5" />}
            </button>
            <SkipForward className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            <Repeat className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </div>

          <div className="w-full flex items-center">
            <span className="text-xs text-gray-400 w-10 text-right">0:00</span>
            <div className="mx-2 flex-1 h-1 bg-gray-700 rounded-full">
              <div
                className="h-1 bg-gray-400 rounded-full hover:bg-green-500"
                style={{ width: `${(currentTime / 100) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400 w-10">{currentSong.duration}</span>
          </div>
        </div>

        <div className="w-1/4 flex justify-end items-center">
          <Volume2 className="w-4 h-4 text-gray-400 mr-2" />
          <div className="w-24 h-1 bg-gray-700 rounded-full">
            <div className="h-1 bg-gray-400 rounded-full hover:bg-green-500" style={{ width: `${volume}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
