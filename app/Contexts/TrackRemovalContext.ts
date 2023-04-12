import { createContext } from 'react';
import { Track } from 'spotify-types';

export const TrackRemovalContext = createContext<{
  modalOpen: boolean;
  setModalOpen: Function;
  track: Track | null;
  setTrack: Function;
}>({
  modalOpen: false,
  setModalOpen: (modalOpen: boolean) => {},
  track: null,
  setTrack: (track: Track) => {},
});
