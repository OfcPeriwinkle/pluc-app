import { Artist, PlaylistTrack } from 'spotify-types';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_ROOT = 'https://api.spotify.com/v1';

const client_id = process.env.SPOTIFY_ID;
const client_secret = process.env.SPOTIFY_SECRET;
const basic_authorization = Buffer.from(
  `${client_id}:${client_secret}`
).toString('base64');

/** Use a refresh_token to acquire a new access_token */
export async function get_access_token(active_refresh_token: string) {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic_authorization}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: active_refresh_token,
    }),
  });

  // Spotify does not always supply a new refresh token, get new access_token details and default
  // to old refresh_token if a new one was not provided
  const { access_token, expires_in, refresh_token } = await res.json();
  return {
    access_token: access_token,
    expires_at: Math.floor(Date.now() / 1000) + expires_in,
    refresh_token: refresh_token ?? active_refresh_token,
  };
}

/** Get a users details using an access_token */
export async function get_user_details(access_token: string) {
  const res = await fetch(`${SPOTIFY_API_ROOT}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 401) {
    return null;
  }

  return res.json();
}

/** Get details for a list of artists
 *
 * @param access_token Spotify access token
 * @param artist_list List of artist ids
 */
export async function get_artists(
  access_token: string,
  artist_list: string[]
): Promise<Artist[] | null> {
  if (!artist_list.length) {
    return null;
  }

  // TODO: make sure we are not sending too many ids at once; limit to 50 and send multiple requests
  // (https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists)
  const res = await fetch(
    `${SPOTIFY_API_ROOT}/artists?${new URLSearchParams({
      ids: artist_list.join(','),
    })}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    return null;
  }

  const { artists } = await res.json();

  return new Promise<Artist[]>((resolve) => {
    resolve(artists);
  });
}

export async function search_for_playlist(
  access_token: string,
  playlist_name: string
) {
  const res = await fetch(
    `${SPOTIFY_API_ROOT}/search?${new URLSearchParams({
      type: 'playlist',
      q: playlist_name,
    })}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  //  TODO: update this stuff so it's more in line with normal code
  if (res.status !== 200) {
    return null;
  }

  return res.json();
}

export async function get_playlist_tracks(
  access_token: string,
  playlist_id: string
) {
  let next: string | null = '';
  let url = `${SPOTIFY_API_ROOT}/playlists/${playlist_id}/tracks?${new URLSearchParams(
    {
      limit: '50',
    }
  )}`;

  let all_tracks: PlaylistTrack[] = [];

  do {
    if (next !== '') {
      url = next;
    }

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.status !== 200) {
      return null;
    }

    // Process response from Spotify
    const spotify_res = await res.json();
    all_tracks = [...all_tracks, ...(spotify_res.items as PlaylistTrack[])];

    // Get url to next group of results, or null if all tracks have been collected
    next = spotify_res.next as string | null;
  } while (next !== null);

  return new Promise<PlaylistTrack[]>((resolve) => {
    resolve(all_tracks);
  });
}
