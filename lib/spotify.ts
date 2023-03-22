import { PlaylistTrack } from "spotify-types";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_ROOT = "https://api.spotify.com/v1";

const client_id = process.env.SPOTIFY_ID;
const client_secret = process.env.SPOTIFY_SECRET;
const basic_authorization = Buffer.from(
  `${client_id}:${client_secret}`
).toString("base64");

/** Use a refresh_token to acquire a new access_token */
export async function get_access_token(active_refresh_token: string) {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic_authorization}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      active_refresh_token,
    }),
  });

  // Spotify does not always supply a new refresh token, get new access_token details and default
  // to old refresh_token if a new one was not provided
  const { access_token, expires_at, refresh_token } = await res.json();
  return {
    access_token,
    expires_at,
    refresh_token: refresh_token ?? active_refresh_token,
  };
}

/** Get a users details using an access_token */
export async function get_user_details(access_token: string) {
  const res = await fetch(`${SPOTIFY_API_ROOT}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    return null;
  }

  return res.json();
}

export async function get_artists(access_token: string, artist_list: string) {
  const res = await fetch(
    `${SPOTIFY_API_ROOT}/artists?${new URLSearchParams({ ids: artist_list })}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function search_for_playlist(
  access_token: string,
  playlist_name: string
) {
  const res = await fetch(
    `${SPOTIFY_API_ROOT}/search?${new URLSearchParams({
      type: "playlist",
      q: playlist_name,
    })}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
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
  let next: string | null = "";
  let url = `${SPOTIFY_API_ROOT}/playlists/${playlist_id}/tracks?${new URLSearchParams(
    {
      limit: "50",
    }
  )}`;

  let all_tracks: PlaylistTrack[] = [];

  do {
    if (next !== "") {
      url = next;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
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
