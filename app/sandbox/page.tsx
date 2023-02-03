import ArtistDuplicates from './Components/ArtistDuplicates';
import duplicate_results from '../../duplicate_results.json';

export default function SandBox() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 px-20 pb-20">
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
