'use client'

import { cn } from 'src/utilities/cn'
import React, { useEffect, useRef, useState } from 'react'
import { getClientSideURL } from '@/utilities/getURL'

export const VideoMedia = (props) => {
  const { onClick, resource, videoClassName } = props
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('loadedmetadata', () => {
        setDuration(video.duration)
      })

      video.addEventListener('timeupdate', () => {
        setCurrentTime(video.currentTime)
      })
    }
  }, [])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handlePlayPause = () => {
    const video = videoRef.current
    if (video) {
      if (video.paused) {
        video.play()
        setIsPlaying(true)
      } else {
        video.pause()
        setIsPlaying(false)
      }
    }
  }

  const handleTimeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (video) {
      const time = parseFloat(e.target.value)
      video.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (video) {
      video.volume = parseFloat(e.target.value)
    }
  }

  if (resource && typeof resource === 'object') {
    const { filename } = resource

    return (
      <div className="relative group">
        <video
          ref={videoRef}
          className={cn("w-full", videoClassName)}
          onClick={onClick}
          playsInline
        >
          <source src={`${getClientSideURL()}/media/${filename}`} />
        </video>

        {/* Custom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 text-white">
            <button 
              onClick={handlePlayPause}
              className="hover:text-primary transition-colors"
            >
              {isPlaying ? 
                <span className="material-icons">pause</span> : 
                <span className="material-icons">play_arrow</span>
              }
            </button>

            {/* Time slider */}
            <div className="flex-1 flex items-center gap-2">
              <span className="text-xs">{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleTimeUpdate}
                className="w-full h-1 bg-gray-400 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs">{formatTime(duration)}</span>
            </div>

            {/* Volume control */}
            <div className="flex items-center gap-1">
              <span className="material-icons text-sm">volume_up</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                defaultValue={1}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-400 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
