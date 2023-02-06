import ArtistDuplicates from '../sandbox/Components/ArtistDuplicates';
import duplicate_results from '../../duplicate_results.json';

export default function DuplicatesModal() {
  return (
    <div className="mx-20 flex flex-col items-center justify-center gap-10 rounded-xl bg-gray px-20 pb-20 pt-20">
      {duplicate_results.map(({ artist, tracks_with_duplicates, total_duplicates }, idx) => {
        return (
          <ArtistDuplicates
            key={idx}
            artist_name={artist.name}
            artist_image={artist.image}
            tracks_with_duplicates={tracks_with_duplicates}
            total_duplicates={total_duplicates}
          />
        );
      })}
    </div>
  );
}
