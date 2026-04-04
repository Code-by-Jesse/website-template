'use client'

import { useRef, useEffect, useCallback } from 'react'
import styles from './BunnyBackground.module.scss'

interface BunnyBackgroundProps {
  src: string
  lazy?: boolean
  autoplay?: boolean
  muted?: boolean
  className?: string
}

export default function BunnyBackground({
  src,
  lazy = false,
  autoplay = true,
  muted: initialMuted = true,
  className,
}: BunnyBackgroundProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<any>(null)
  const isAttached = useRef(false)
  const lastPauseBy = useRef<'io' | 'manual' | ''>('')
  const pendingPlay = useRef(false)

  const setStatus = useCallback((s: string) => {
    const el = wrapRef.current
    if (el && el.dataset.playerStatus !== s) {
      el.dataset.playerStatus = s
    }
  }, [])

  const setActivated = useCallback((v: boolean) => {
    const el = wrapRef.current
    if (el) el.dataset.playerActivated = v ? 'true' : 'false'
  }, [])

  const safePlay = useCallback((video: HTMLVideoElement) => {
    const p = video.play()
    if (p && typeof p.then === 'function') p.catch(() => {})
  }, [])

  const attachMedia = useCallback(() => {
    if (isAttached.current) return
    isAttached.current = true

    const video = videoRef.current
    if (!video || !src) return

    // Destroy oude HLS instance
    if (hlsRef.current) {
      try { hlsRef.current.destroy() } catch {}
      hlsRef.current = null
    }

    const isSafariNative = !!video.canPlayType('application/vnd.apple.mpegurl')
    const canUseHlsJs = typeof window !== 'undefined' && !!(window as any).Hls && (window as any).Hls.isSupported() && !isSafariNative

    if (isSafariNative) {
      video.preload = lazy ? 'none' : 'auto'
      video.crossOrigin = 'anonymous'
      video.src = src

      video.addEventListener('loadedmetadata', () => {
        if (!pendingPlay.current && wrapRef.current?.dataset.playerActivated !== 'true' && wrapRef.current?.dataset.playerStatus === 'idle') {
          setStatus('ready')
        }
      }, { once: true })
    } else if (canUseHlsJs) {
      const Hls = (window as any).Hls
      const hls = new Hls({ maxBufferLength: 10 })
      hls.attachMedia(video)
      hls.on(Hls.Events.MEDIA_ATTACHED, () => hls.loadSource(src))
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!pendingPlay.current && wrapRef.current?.dataset.playerActivated !== 'true' && wrapRef.current?.dataset.playerStatus === 'idle') {
          setStatus('ready')
        }
      })
      hlsRef.current = hls
    } else {
      // Fallback: direct src (mp4)
      video.src = src
    }
  }, [src, lazy, setStatus])

  useEffect(() => {
    const video = videoRef.current
    const wrap = wrapRef.current
    if (!video || !wrap) return

    // Reset
    try { video.pause() } catch {}
    try { video.removeAttribute('src'); video.load() } catch {}

    wrap.dataset.playerStatus = 'idle'
    wrap.dataset.playerActivated = 'false'

    if (autoplay) {
      video.muted = true
      video.loop = true
    } else {
      video.muted = initialMuted
    }

    // Init
    if (!lazy) {
      attachMedia()
    }

    // Video events
    const onPlay = () => { setActivated(true); setStatus('playing') }
    const onPlaying = () => { pendingPlay.current = false; setStatus('playing') }
    const onPause = () => { pendingPlay.current = false; setStatus('paused') }
    const onWaiting = () => { setStatus('loading') }
    const onCanplay = () => {
      if (!pendingPlay.current && wrap.dataset.playerActivated !== 'true' && wrap.dataset.playerStatus === 'idle') {
        setStatus('ready')
      }
    }
    const onEnded = () => { pendingPlay.current = false; setStatus('paused'); setActivated(false) }

    video.addEventListener('play', onPlay)
    video.addEventListener('playing', onPlaying)
    video.addEventListener('pause', onPause)
    video.addEventListener('waiting', onWaiting)
    video.addEventListener('canplay', onCanplay)
    video.addEventListener('ended', onEnded)

    // IntersectionObserver voor autoplay
    let io: IntersectionObserver | null = null
    if (autoplay) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting && entry.intersectionRatio > 0
          if (inView) {
            if (lazy && !isAttached.current) attachMedia()
            if (lastPauseBy.current === 'io' || (video.paused && lastPauseBy.current !== 'manual')) {
              setStatus('loading')
              if (video.paused) {
                pendingPlay.current = true
                lastPauseBy.current = ''
                safePlay(video)
              }
            }
          } else {
            if (!video.paused && !video.ended) {
              lastPauseBy.current = 'io'
              video.pause()
            }
          }
        })
      }, { threshold: 0.1 })
      io.observe(wrap)
    }

    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('waiting', onWaiting)
      video.removeEventListener('canplay', onCanplay)
      video.removeEventListener('ended', onEnded)
      if (io) io.disconnect()
      if (hlsRef.current) {
        try { hlsRef.current.destroy() } catch {}
        hlsRef.current = null
      }
    }
  }, [src, lazy, autoplay, initialMuted, attachMedia, setStatus, setActivated, safePlay])

  return (
    <div
      ref={wrapRef}
      className={`${styles.wrap} ${className || ''}`}
      data-player-status="idle"
      data-player-activated="false"
    >
      <video
        ref={videoRef}
        className={styles.video}
        playsInline
        muted
      />
    </div>
  )
}
