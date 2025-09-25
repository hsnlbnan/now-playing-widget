export type Track = {
  title: string;
  artist: string;
  album: string;
  coverUrl: string | null;
  spotifyUrl: string | null;
  isPlaying: boolean;
  progressMs?: number;
  durationMs?: number;
};

