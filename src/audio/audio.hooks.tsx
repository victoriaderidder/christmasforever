import { useRef } from "react";
import { AudioProps } from "../audio/audio.types";
import { useAudioContext } from "./audio.context";

export const useAudio = (audioSources: Record<keyof AudioProps, string>) => {
  const audioRefs = {
    krampus: useRef(new Audio(audioSources.krampus)),
    angels: useRef(new Audio(audioSources.angels)),
    finale: useRef(new Audio(audioSources.finale)),
    silentNight: useRef(new Audio(audioSources.silentNight)),
    lastChristmas: useRef(new Audio(audioSources.lastChristmas)),
    deckTheHalls: useRef(new Audio(audioSources.deckTheHalls)),
    jbr: useRef(new Audio(audioSources.jbr)),
    circus: useRef(new Audio(audioSources.circus)),
    chipmunk: useRef(new Audio(audioSources.chipmunk)),
    jazz: useRef(new Audio(audioSources.jazz)),
    rockin: useRef(new Audio(audioSources.rockin)),
    santaBaby: useRef(new Audio(audioSources.santaBaby)),
    whiteChristmas: useRef(new Audio(audioSources.whiteChristmas)),
    fire: useRef(new Audio(audioSources.fire)),
  };

  const { playingSongs, setPlayingSongs } = useAudioContext();

  const playSong = async (
    song: HTMLAudioElement,
    previousSong?: HTMLAudioElement
  ) => {
    if (previousSong) {
      try {
        previousSong.pause();
        previousSong.currentTime = 0;
      } catch (err) {
        console.warn("Failed to stop previous song", err);
      }
      setPlayingSongs((current) => current.filter((s) => s !== previousSong));
    }

    try {
      song.loop = true;
      // await the play promise and ignore expected interruptions
      await song.play();
      setPlayingSongs((current) => [...current, song]);
    } catch (err) {
      // Browsers may reject play() due to autoplay policies or if paused immediately.
      // Swallow the error to avoid uncaught promise rejections.
      console.warn("Audio play() failed or was interrupted:", err);
    }
  };

  const stopAllAudio = async () => {
    try {
      // Pause and reset all currently playing audio, then clear state once.
      await Promise.all(
        playingSongs.map(async (audio) => {
          try {
            audio.pause();
            audio.currentTime = 0;
          } catch (err) {
            console.error("Failed to stop audio ", audio.src, err);
          }
        })
      );
      setPlayingSongs([]);
    } catch (error) {
      console.error("Error in stopAllAudio: ", error);
    }
  };

  return { audioRefs, playSong, stopAllAudio };
};
