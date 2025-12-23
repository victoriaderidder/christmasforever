import { useCallback, useMemo, useRef } from "react";
import { AudioProps } from "../audio/audio.types";
import { useAudioContext } from "./audio.context";

export const useAudio = (audioSources: Record<keyof AudioProps, string>) => {
  const krampus = useRef(new Audio(audioSources.krampus));
  const angels = useRef(new Audio(audioSources.angels));
  const finale = useRef(new Audio(audioSources.finale));
  const silentNight = useRef(new Audio(audioSources.silentNight));
  const lastChristmas = useRef(new Audio(audioSources.lastChristmas));
  const deckTheHalls = useRef(new Audio(audioSources.deckTheHalls));
  const jbr = useRef(new Audio(audioSources.jbr));
  const circus = useRef(new Audio(audioSources.circus));
  const chipmunk = useRef(new Audio(audioSources.chipmunk));
  const jazz = useRef(new Audio(audioSources.jazz));
  const rockin = useRef(new Audio(audioSources.rockin));
  const santaBaby = useRef(new Audio(audioSources.santaBaby));
  const whiteChristmas = useRef(new Audio(audioSources.whiteChristmas));
  const fire = useRef(new Audio(audioSources.fire));
  const alarm = useRef(new Audio(audioSources.alarm));
  const wizardsInWinter = useRef(new Audio(audioSources.wizardsInWinter));

  const audioRefs = useMemo(
    () => ({
      krampus,
      angels,
      finale,
      silentNight,
      lastChristmas,
      deckTheHalls,
      jbr,
      circus,
      chipmunk,
      jazz,
      rockin,
      santaBaby,
      whiteChristmas,
      fire,
      alarm,
      wizardsInWinter,
    }),
    []
  );

  const { setPlayingSongs } = useAudioContext();

  const playSong = useCallback(
    (song: HTMLAudioElement, previousSong?: HTMLAudioElement) => {
      if (previousSong) {
        previousSong.pause();
        previousSong.currentTime = 0;
      }

      const playResult = song.play();
      if (
        playResult &&
        typeof (playResult as Promise<void>).catch === "function"
      ) {
        (playResult as Promise<void>).catch((err) => {
          console.debug("play() promise rejected (suppressed):", err);
        });
      }
      song.loop = true;

      setPlayingSongs((current) => {
        const next = previousSong
          ? current.filter((s) => s !== previousSong)
          : current;
        if (next.includes(song)) return next;
        return [...next, song];
      });
    },
    [setPlayingSongs]
  );

  const stopAllAudio = useCallback(async () => {
    try {
      setPlayingSongs((current) => {
        current.forEach((audio) => {
          try {
            audio.pause();
            audio.currentTime = 0;
          } catch (err) {
            console.error("Failed to stop audio ", audio.src, err);
          }
        });
        return [];
      });
    } catch (error) {
      console.error("Error in stopAllAudio: ", error);
    }
  }, [setPlayingSongs]);

  return { audioRefs, playSong, stopAllAudio };
};
