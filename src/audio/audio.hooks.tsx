import { useCallback, useMemo, useRef } from "react";
import { AudioProps } from "../audio/audio.types";
import { useAudioContext } from "./audio.context";

export const useAudio = (audioSources: Record<keyof AudioProps, string>) => {
  const krampusAudio = useMemo(
    () => new Audio(audioSources.krampus),
    [audioSources.krampus]
  );
  const angelsAudio = useMemo(
    () => new Audio(audioSources.angels),
    [audioSources.angels]
  );
  const finaleAudio = useMemo(
    () => new Audio(audioSources.finale),
    [audioSources.finale]
  );
  const silentNightAudio = useMemo(
    () => new Audio(audioSources.silentNight),
    [audioSources.silentNight]
  );
  const lastChristmasAudio = useMemo(
    () => new Audio(audioSources.lastChristmas),
    [audioSources.lastChristmas]
  );
  const deckTheHallsAudio = useMemo(
    () => new Audio(audioSources.deckTheHalls),
    [audioSources.deckTheHalls]
  );
  const jbrAudio = useMemo(() => new Audio(audioSources.jbr), [audioSources.jbr]);
  const circusAudio = useMemo(
    () => new Audio(audioSources.circus),
    [audioSources.circus]
  );
  const chipmunkAudio = useMemo(
    () => new Audio(audioSources.chipmunk),
    [audioSources.chipmunk]
  );
  const jazzAudio = useMemo(
    () => new Audio(audioSources.jazz),
    [audioSources.jazz]
  );
  const rockinAudio = useMemo(
    () => new Audio(audioSources.rockin),
    [audioSources.rockin]
  );
  const santaBabyAudio = useMemo(
    () => new Audio(audioSources.santaBaby),
    [audioSources.santaBaby]
  );
  const whiteChristmasAudio = useMemo(
    () => new Audio(audioSources.whiteChristmas),
    [audioSources.whiteChristmas]
  );
  const fireAudio = useMemo(() => new Audio(audioSources.fire), [audioSources.fire]);
  const alarmAudio = useMemo(
    () => new Audio(audioSources.alarm),
    [audioSources.alarm]
  );
  const wizardsInWinterAudio = useMemo(
    () => new Audio(audioSources.wizardsInWinter),
    [audioSources.wizardsInWinter]
  );

  const audioRefs = {
    krampus: useRef(krampusAudio),
    angels: useRef(angelsAudio),
    finale: useRef(finaleAudio),
    silentNight: useRef(silentNightAudio),
    lastChristmas: useRef(lastChristmasAudio),
    deckTheHalls: useRef(deckTheHallsAudio),
    jbr: useRef(jbrAudio),
    circus: useRef(circusAudio),
    chipmunk: useRef(chipmunkAudio),
    jazz: useRef(jazzAudio),
    rockin: useRef(rockinAudio),
    santaBaby: useRef(santaBabyAudio),
    whiteChristmas: useRef(whiteChristmasAudio),
    fire: useRef(fireAudio),
    alarm: useRef(alarmAudio),
    wizardsInWinter: useRef(wizardsInWinterAudio),
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
