import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { buildApiUrl } from "../../config/api";

const playerShellStyle = {
  position: "relative",
  width: "min(960px, 100%)",
  margin: "0 auto",
  padding: "16px",
  borderRadius: "20px",
  background: "#020617",
  boxShadow: "0 24px 60px rgba(15, 23, 42, 0.24)"
};

const videoStyle = {
  display: "block",
  width: "100%",
  maxHeight: "75vh",
  borderRadius: "14px",
  background: "#000",
  boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
};

const actionButtonStyle = {
  border: "none",
  borderRadius: "999px",
  padding: "10px 16px",
  background: "rgba(15, 23, 42, 0.72)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700
};

const popupButtonStyle = {
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "10px 14px",
  cursor: "pointer",
  fontWeight: 700
};

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { video } = location.state || {};
  const videoId = video?.id ?? null;
  const videoTitle = video?.title ?? "Video Player";

  const videoRef = useRef(null);
  const playerShellRef = useRef(null);
  const startSentRef = useRef(false);
  const lastPlaybackTimeRef = useRef(0);
  const seekStartTimeRef = useRef(0);
  const popupBlockedRef = useRef(false);
  const sessionWindowStartedRef = useRef(0);
  const pauseCountRef = useRef(0);
  const rewindCountRef = useRef(0);
  const lastProgressSentAtRef = useRef(0);
  const trackingHandlersRef = useRef({
    resetTracking: null
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const normalizedPath = video?.filePath ? video.filePath.replace(/\\/g, "/") : "";
  const videoUrl = normalizedPath
    ? buildApiUrl(`/stream?filePath=${encodeURIComponent(normalizedPath)}`)
    : "";

  let token = "";
  try {
    const storedToken = localStorage.getItem("JWT");
    token = storedToken ? JSON.parse(storedToken) : "";
  } catch (error) {
    console.error("Unable to read JWT from localStorage", error);
  }

  const handleChoice = (type) => {
    if (!videoId) {
      return;
    }

    const currentTime = Math.floor(videoRef.current?.currentTime || 0);

    setShowPopup(false);

    const smartDoubtPayload = {
      videoId,
      currentTime,
      type,
      topic: videoTitle
    };

    navigate(type === "chatbot" ? "/chat" : "/mentor", {
      state: { smartDoubtPayload }
    });
  };

  const handlePopupDismiss = () => {
    setShowPopup(false);
    setPopupBlocked(false);
    trackingHandlersRef.current.resetTracking?.();
  };

  const handleFullscreenToggle = async () => {
    const shell = playerShellRef.current;

    if (!shell) {
      return;
    }

    try {
      if (document.fullscreenElement === shell) {
        await document.exitFullscreen();
        return;
      }

      await shell.requestFullscreen();
    } catch (error) {
      console.error("Unable to toggle fullscreen", error);
    }
  };

  useEffect(() => {
    popupBlockedRef.current = popupBlocked;
  }, [popupBlocked]);

  useEffect(() => {
    setShowPopup(false);
    setPopupBlocked(false);
    popupBlockedRef.current = false;
    startSentRef.current = false;
    lastPlaybackTimeRef.current = 0;
    seekStartTimeRef.current = 0;
    sessionWindowStartedRef.current = 0;
    pauseCountRef.current = 0;
    rewindCountRef.current = 0;
    lastProgressSentAtRef.current = 0;
  }, [videoId]);

  useEffect(() => {
    if (!popupBlocked) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setPopupBlocked(false);
      popupBlockedRef.current = false;
    }, 60000);

    return () => window.clearTimeout(timer);
  }, [popupBlocked]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === playerShellRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    const trackingHandlers = trackingHandlersRef.current;

    if (!videoElement || !videoId) {
      return undefined;
    }

    const headers = token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      : null;

  const sendEvent = async (action) => {
      if (!headers) {
        return;
      }

      try {
        const currentTime = Math.floor(videoElement.currentTime || 0);
        const rawDuration = Number(videoElement.duration);
        const durationSeconds = Number.isFinite(rawDuration) && rawDuration > 0
          ? Math.floor(rawDuration)
          : undefined;
        const response = await axios.post(
          buildApiUrl("/tracking/update"),
          null,
          {
            params: {
              videoId,
              currentTime,
              action,
              durationSeconds
            },
            headers
          }
        );

        if (response.data === "STUCK_DETECTED" && !popupBlockedRef.current) {
          setShowPopup(true);
          setPopupBlocked(true);
        }
      } catch (error) {
        console.error("Video tracking failed", error);
      }
    };

    const resetLocalTrackingState = () => {
      sessionWindowStartedRef.current = Date.now();
      pauseCountRef.current = 0;
      rewindCountRef.current = 0;
      popupBlockedRef.current = false;
    };

    const initializeTrackingWindow = () => {
      const now = Date.now();
      const windowDuration = 10 * 60 * 1000;

      if (
        sessionWindowStartedRef.current === 0 ||
        now - sessionWindowStartedRef.current > windowDuration
      ) {
        resetLocalTrackingState();
      }
    };

    const checkLocalStuckState = (action) => {
      initializeTrackingWindow();

      if (action === "pause") {
        pauseCountRef.current += 1;
      }

      if (action === "rewind") {
        rewindCountRef.current += 1;
      }

      const isStuck =
        (pauseCountRef.current >= 4 && rewindCountRef.current >= 2) ||
        rewindCountRef.current >= 5;

      if (isStuck && !popupBlockedRef.current) {
        setShowPopup(true);
        setPopupBlocked(true);
      }
    };

    const resetTracking = async () => {
      resetLocalTrackingState();

      if (!headers) {
        return;
      }

      try {
        const currentTime = Math.floor(videoElement.currentTime || 0);
        await axios.post(
          buildApiUrl("/tracking/update"),
          null,
          {
            params: {
              videoId,
              currentTime,
              action: "reset"
            },
            headers
          }
        );
      } catch (error) {
        console.error("Video reset tracking failed", error);
      }
    };

    const sendExitEvent = () => {
      if (!headers) {
        return;
      }

      const currentTime = Math.floor(videoElement.currentTime || 0);
      const rawDuration = Number(videoElement.duration);
      const durationSeconds = Number.isFinite(rawDuration) && rawDuration > 0
        ? Math.floor(rawDuration)
        : undefined;
      const params = new URLSearchParams({
        videoId: String(videoId),
        currentTime: String(currentTime),
        action: "exit"
      });

      if (durationSeconds) {
        params.set("durationSeconds", String(durationSeconds));
      }

      fetch(`${buildApiUrl("/tracking/update")}?${params.toString()}`, {
        method: "POST",
        headers,
        keepalive: true
      }).catch((error) => {
        console.error("Video exit tracking failed", error);
      });
    };

    const handlePlay = () => {
      if (startSentRef.current) {
        return;
      }

      initializeTrackingWindow();
      startSentRef.current = true;
      sendEvent("start");
    };

    const handlePause = () => {
      if (!videoElement.ended) {
        checkLocalStuckState("pause");
        sendEvent("pause");
      }
    };

    const handleTimeUpdate = () => {
      lastPlaybackTimeRef.current = videoElement.currentTime;

      const currentTime = Math.floor(videoElement.currentTime || 0);
      if (currentTime >= lastProgressSentAtRef.current + 10) {
        lastProgressSentAtRef.current = currentTime;
        sendEvent("progress");
      }
    };

    const handleSeeking = () => {
      seekStartTimeRef.current = lastPlaybackTimeRef.current;
    };

    const handleSeeked = () => {
      if (videoElement.currentTime < seekStartTimeRef.current) {
        checkLocalStuckState("rewind");
        sendEvent("rewind");
      }

      lastPlaybackTimeRef.current = videoElement.currentTime;
    };

    const handleEnded = () => {
      startSentRef.current = false;
      sendEvent("end");
    };

    const handlePageHide = () => {
      if (!videoElement.ended) {
        sendExitEvent();
      }
    };

    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("seeking", handleSeeking);
    videoElement.addEventListener("seeked", handleSeeked);
    videoElement.addEventListener("ended", handleEnded);
    window.addEventListener("pagehide", handlePageHide);
    trackingHandlers.resetTracking = resetTracking;

    return () => {
      if (!videoElement.ended) {
        sendExitEvent();
      }

      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("seeking", handleSeeking);
      videoElement.removeEventListener("seeked", handleSeeked);
      videoElement.removeEventListener("ended", handleEnded);
      window.removeEventListener("pagehide", handlePageHide);
      trackingHandlers.resetTracking = null;
    };
  }, [token, videoId]);

  if (!video?.filePath) {
    return <p>No video available</p>;
  }

  return (
    <div style={{ textAlign: "center", padding: "24px 16px" }}>
      <style>{`
        .video-player__media::-webkit-media-controls-fullscreen-button {
          display: none;
        }
      `}</style>

      <h2 className="text-2xl font-bold mb-5">{videoTitle}</h2>

      <div
        ref={playerShellRef}
        style={{
          ...playerShellStyle,
          padding: isFullscreen ? "20px" : "16px",
          height: isFullscreen ? "100%" : "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "12px"
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={handleFullscreenToggle} style={actionButtonStyle} type="button">
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </div>

        <video
          ref={videoRef}
          className="video-player__media"
          src={videoUrl}
          controls
          controlsList="nodownload nofullscreen"
          playsInline
          style={videoStyle}
        />

        {showPopup && (
          <div
            style={{
              position: "absolute",
              top: "28px",
              right: "28px",
              zIndex: 10,
              width: "min(320px, calc(100% - 32px))",
              background: "rgba(15, 23, 42, 0.96)",
              color: "#fff",
              padding: "16px",
              borderRadius: "14px",
              boxShadow: "0 20px 45px rgba(0,0,0,0.45)",
              textAlign: "left"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
              <div>
                <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 800 }}>You seem stuck</h4>
                <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
                  Do you want help from ChatBot or AI Mentor at this point in the lesson?
                </p>
              </div>

              <button
                onClick={handlePopupDismiss}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "1.1rem"
                }}
                type="button"
              >
                x
              </button>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
              <button onClick={() => handleChoice("chatbot")} style={popupButtonStyle} type="button">
                ChatBot
              </button>

              <button onClick={() => handleChoice("mentor")} style={popupButtonStyle} type="button">
                AI Mentor
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
