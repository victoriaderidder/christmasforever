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
    alarm: useRef(new Audio(audioSources.alarm)),
    wizardsInWinter: useRef(new Audio(audioSources.wizardsInWinter)),
  };

  const { playingSongs, setPlayingSongs } = useAudioContext();

  const playSong = async (
    song: HTMLAudioElement,
    previousSong?: HTMLAudioElement
  ) => {
    if (previousSong) {
      previousSong.pause();
      previousSong.currentTime = 0;
      setPlayingSongs((current) => current.filter((s) => s !== previousSong));
    }
    // call play() but attach a catch to avoid uncaught promise rejections
    const playResult = song.play();
    if (
      playResult &&
      typeof (playResult as Promise<void>).catch === "function"
    ) {
      (playResult as Promise<void>).catch((err) => {
        // expected: play() may be interrupted by a subsequent pause() or blocked by autoplay policies
        // swallow to avoid uncaught promise error in console
        console.debug("play() promise rejected (suppressed):", err);
      });
    }
    song.loop = true;
    setPlayingSongs([...playingSongs, song]);
  };

  const stopAllAudio = async () => {
    try {
      await Promise.all(
        playingSongs.map(async (audio) => {
          try {
            audio.pause();
            audio.currentTime = 0;
            setPlayingSongs([]);
          } catch (err) {
            console.error("Failed to stop audio ", audio.src, err);
          }
        })
      );
    } catch (error) {
      console.error("Error in stopAllAudio: ", error);
    }
  };

  return { audioRefs, playSong, stopAllAudio };
};
