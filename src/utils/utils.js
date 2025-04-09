/**
 * Handles entering the app with music.
 * @param {Object} audioRef - Reference to the audio element.
 * @param {Function} setIsPlaying - State setter for music playing status.
 * @param {Function} setIsLoaded - State setter for app loaded status.
 */
export const handleEnterWithMusic = (audioRef, setIsPlaying, setIsLoaded) => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.volume = 0.4;
      audio.play();
      setIsPlaying(true);
    }
    setIsLoaded(true);
  };
  
  /**
   * Handles entering the app without music.
   * @param {Object} audioRef - Reference to the audio element.
   * @param {Function} setIsPlaying - State setter for music playing status.
   * @param {Function} setIsLoaded - State setter for app loaded status.
   */
  export const handleEnterWithoutMusic = (audioRef, setIsPlaying, setIsLoaded) => {
    const audio = audioRef.current;
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
    setIsLoaded(true);
  };
  
  /**
   * Handles scroll offset to trigger overlays.
   * @param {number} offset - Current scroll offset.
   * @param {boolean} isMobile - Whether the device is mobile.
   * @param {Function} setExploreOverlayVisible - State setter for explore overlay visibility.
   * @param {Function} setBookingForm - State setter for booking form visibility.
   */
  export const handleScrollOffset = (
    offset,
    isMobile,
    setExploreOverlayVisible,
    setBookingForm
  ) => {
    if (isMobile) {
      if (offset >= 0.7514516784195425 && offset <= 0.8) {
        setExploreOverlayVisible(true);
      } else {
        setExploreOverlayVisible(false);
      }
      if (offset >= 0.99 && offset <= 1) {
        setBookingForm(true);
      } else {
        setBookingForm(false);
      }
    } else {
      if (offset >= 0.7214516784195425 && offset <= 0.8) {
        setExploreOverlayVisible(true);
      } else {
        setExploreOverlayVisible(false);
      }
      if (offset >= 0.99 && offset <= 1) {
        setBookingForm(true);
      } else {
        setBookingForm(false);
      }
    }
  };
  
  /**
   * Handles window resize to determine if the device is mobile.
   * @param {Function} setIsMobile - State setter for mobile view status.
   */
  export const handleResize = (setIsMobile) => {
    setIsMobile(window.innerWidth <= 768);
  };