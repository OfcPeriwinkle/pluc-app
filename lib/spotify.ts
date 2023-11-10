import { chunk } from 'lodash';
import { PlaylistTrack } from 'spotify-types';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_ROOT = 'https://api.spotify.com/v1';

const clientID = process.env.SPOTIFY_ID;
const clientSecret = process.env.SPOTIFY_SECRET;
const basicAuthorization = Buffer.from(`${clientID}:${clientSecret}`).toString(
  'base64'
);

/** Use a refresh_token to acquire a new access_token */
export async function getAccessToken(activeRefreshToken: string) {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuthorization}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: activeRefreshToken,
    }),
  });

  // Spotify does not always supply a new refresh token, get new access_token details and default
  // to old refresh_token if a new one was not provided
  const { access_token, expires_in, refresh_token } = await res.json();
  return {
    access_token: access_token,
    expires_at: Math.floor(Date.now() / 1000) + expires_in,
    refresh_token: refresh_token ?? activeRefreshToken,
  };
}

/** Get a users details using an access_token */
export async function getUserDetails(accessToken: string) {
  const res = await fetch(`${SPOTIFY_API_ROOT}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 401) {
    return null;
  }

  return res.json();
}

export async function getArtists(accessToken: string, artistIDs: string[]) {
  // Send request for every 50 artists
  const IDBatches = chunk(artistIDs, 50);

  const res = await Promise.all(
    IDBatches.map(async (batch) => {
      const res = await fetch(
        `${SPOTIFY_API_ROOT}/artists?${new URLSearchParams({
          ids: batch.join(','),
        })}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const { artists } = await res.json();
      return artists;
    })
  );

  // Flatten array of arrays
  return [].concat.apply([], res);
}

export async function searchForPlaylist(
  accessToken: string,
  playlistName: string
) {
  const res = await fetch(
    `${SPOTIFY_API_ROOT}/search?${new URLSearchParams({
      type: 'playlist',
      q: playlistName,
    })}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

export async function getPlaylistTracks(
  accessToken: string,
  playlistID: string
) {
  let next: string | null = '';
  let url = `${SPOTIFY_API_ROOT}/playlists/${playlistID}/tracks?${new URLSearchParams(
    {
      limit: '50',
    }
  )}`;

  let allTracks: PlaylistTrack[] = [];

  do {
    if (next !== '') {
      url = next;
    }

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.status !== 200) {
      return null;
    }

    // Process response from Spotify
    const spotifyRes = await res.json();
    allTracks = [...allTracks, ...(spotifyRes.items as PlaylistTrack[])];

    // Get url to next group of results, or null if all tracks have been collected
    next = spotifyRes.next as string | null;
  } while (next !== null);

  return new Promise<PlaylistTrack[]>((resolve) => {
    resolve(allTracks);
  });
}

export async function removeTracks(
  accessToken: string,
  playlistID: string,
  trackIDs: string[]
) {
  if (trackIDs.length >= 100) {
    throw new Error('Cannot remove more than 100 tracks at a time');
  }

  const res = await fetch(
    `${SPOTIFY_API_ROOT}/playlists/${playlistID}/tracks`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tracks: trackIDs.map((id) => ({ uri: `spotify:track:${id}` })),
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const { snapshot_id } = await res.json();

  return snapshot_id;
}
