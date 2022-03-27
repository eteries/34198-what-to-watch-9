import { MutableRefObject } from 'react';

export type Player = {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  duration: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  getCurrentProgress: () => number;
  getIsLoading: () => boolean;
}
