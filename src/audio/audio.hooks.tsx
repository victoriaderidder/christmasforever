import { useCallback, useRef } from "react";
import { AudioProps } from "../audio/audio.types";
import { useAudioContext } from "./audio.context";

const AUDIO_SINGLETONS: Record<string, HTMLAudioElement> = {};

const getAudioSingleton = (src: string) => {
  const existing = AUDIO_SINGLETONS[src];
  if (existing) return existing;
  const created = new Audio(src);
  AUDIO_SINGLETONS[src] = created;
  return created;
};

export const useAudio = (audioSources: Record<keyof AudioProps, string>) => {
  const audioRefs = {
    krampus: useRef(getAudioSingleton(audioSources.krampus)),
    angels: useRef(getAudioSingleton(audioSources.angels)),
    finale: useRef(getAudioSingleton(audioSources.finale)),
    silentNight: useRef(getAudioSingleton(audioSources.silentNight)),
    lastChristmas: useRef(getAudioSingleton(audioSources.lastChristmas)),
    deckTheHalls: useRef(getAudioSingleton(audioSources.deckTheHalls)),
    jbr: useRef(getAudioSingleton(audioSources.jbr)),
    circus: useRef(getAudioSingleton(audioSources.circus)),
    chipmunk: useRef(getAudioSingleton(audioSources.chipmunk)),
    jazz: useRef(getAudioSingleton(audioSources.jazz)),
    rockin: useRef(getAudioSingleton(audioSources.rockin)),
    santaBaby: useRef(getAudioSingleton(audioSources.santaBaby)),
    whiteChristmas: useRef(getAudioSingleton(audioSources.whiteChristmas)),
    fire: useRef(getAudioSingleton(audioSources.fire)),
    alarm: useRef(getAudioSingleton(audioSources.alarm)),
    wizardsInWinter: useRef(getAudioSingleton(audioSources.wizardsInWinter)),
    hotChocolate: useRef(getAudioSingleton(audioSources.hotChocolate)),
  };

  const { playingSongs, setPlayingSongs } = useAudioContext();

  const playSong = useCallback(
    async (song: HTMLAudioElement, previousSong?: HTMLAudioElement) => {
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
      setPlayingSongs((current) =>
        current.includes(song) ? current : [...current, song]
      );
    },
    [setPlayingSongs]
  );

  const stopAllAudio = useCallback(async () => {
    try {
      if (playingSongs.length === 0) return;
      for (const audio of playingSongs) {
        try {
          audio.pause();
          audio.currentTime = 0;
        } catch (err) {
          console.error("Failed to stop audio ", audio.src, err);
        }
      }
      setPlayingSongs([]);
    } catch (error) {
      console.error("Error in stopAllAudio: ", error);
    }
  }, [playingSongs, setPlayingSongs]);

  return { audioRefs, playSong, stopAllAudio };
};
