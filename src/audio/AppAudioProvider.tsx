import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import homeMenuBgmTrack from "../assets/home-bgm-blocklight-horizon.mp3";

type AppAudioContextValue = {
  ensureBgmPlayback: () => Promise<void>;
  hasUnlockedBgm: boolean;
  isBgmPlaying: boolean;
};

const AppAudioContext = createContext<AppAudioContextValue | null>(null);
const DEFAULT_BGM_VOLUME = 0.05;

export function AppAudioProvider({ children }: PropsWithChildren) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasUnlockedBgm, setHasUnlockedBgm] = useState(false);
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);

  useEffect(() => {
    const bgm = new Audio(homeMenuBgmTrack);

    bgm.loop = true;
    bgm.volume = DEFAULT_BGM_VOLUME;
    audioRef.current = bgm;

    const handlePlay = () => {
      setIsBgmPlaying(true);
    };

    const handlePause = () => {
      setIsBgmPlaying(false);
    };

    bgm.addEventListener("play", handlePlay);
    bgm.addEventListener("pause", handlePause);

    return () => {
      bgm.removeEventListener("play", handlePlay);
      bgm.removeEventListener("pause", handlePause);
      bgm.pause();
      bgm.currentTime = 0;

      if (audioRef.current === bgm) {
        audioRef.current = null;
      }
    };
  }, []);

  const ensureBgmPlayback = async () => {
    const bgm = audioRef.current;

    if (!bgm) {
      return;
    }

    bgm.volume = DEFAULT_BGM_VOLUME;

    try {
      await bgm.play();
      setHasUnlockedBgm(true);
      setIsBgmPlaying(true);
    } catch {
      // Browser autoplay policies can block playback until a valid user gesture.
    }
  };

  return (
    <AppAudioContext.Provider value={{ ensureBgmPlayback, hasUnlockedBgm, isBgmPlaying }}>
      {children}
    </AppAudioContext.Provider>
  );
}

export function useAppAudio() {
  const context = useContext(AppAudioContext);

  if (!context) {
    throw new Error("useAppAudio must be used within AppAudioProvider.");
  }

  return context;
}
