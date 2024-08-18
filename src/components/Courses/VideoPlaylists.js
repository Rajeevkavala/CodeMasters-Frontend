import React from 'react';
import VideoPlaylist from './VideoPlaylist';

const playlists = [
  { id: "PL0Zuz27SZ-6OlAwitnFUubtE93DO-l0vu", title: "HTML" },
  { id: "PL0Zuz27SZ-6Mx9fd9elt80G1bPcySmWit", title: "CSS" },
  { id: "PLZPZq0r_RZOMRMjHB_IEBjOW_ufr00yG1", title: "JS" },
  { id: "PL0Zuz27SZ-6PrE9srvEn8nbhOOyxnWXfp", title: "React" },
  { id: "PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5", title: "Java" },
  { id: "PL0Zuz27SZ-6MQri81d012LwP5jvFZ_scc", title: "Python" },
  { id: "PLBlnK6fEyqRh6isJ01MBnbNpV3ZsktSyS", title: "C++" },
  { id: "PLTP0UYcvxKohmIsnYDbYJwicsAhySf5xD", title: "SQL" },
  { id: "PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ", title: "DSA"}
];

export function HTMLPlaylist() {
  return <VideoPlaylist playlistId={playlists[0].id} title={playlists[0].title} />;
}

export function CSSPlaylist() {
  return <VideoPlaylist playlistId={playlists[1].id} title={playlists[1].title} />;
}

export function JSPlaylist() {
  return <VideoPlaylist playlistId={playlists[2].id} title={playlists[2].title} />;
}

export function ReactPlaylist() {
  return <VideoPlaylist playlistId={playlists[3].id} title={playlists[3].title} />;
}

export function JavaPlaylist() {
  return <VideoPlaylist playlistId={playlists[4].id} title={playlists[4].title} />;
}

export function PythonPlaylist() {
  return <VideoPlaylist playlistId={playlists[5].id} title={playlists[5].title} />;
}

export function CPlusPlusPlaylist() {
  return <VideoPlaylist playlistId={playlists[6].id} title={playlists[6].title} />;
}

export function SQLPlaylist() {
  return <VideoPlaylist playlistId={playlists[7].id} title={playlists[7].title} />;
}

export function DSAPlaylist() {
  return <VideoPlaylist playlistId={playlists[8].id} title={playlists[8].title} />;
}