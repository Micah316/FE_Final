import {
    SET_ALBUMS,
    ADD_ALBUMS,
    SET_ARTISTS,
    ADD_ARTISTS,
    SET_PLAYLIST,
    ADD_PLAYLIST
  } from '../utils/constants';
  import { get } from '../utils/api';
  //once the action is dispatched the albumsReducer file gets called, which has the 
  //switch case to return the passed albums from the reducer so the redux store gets
  //updated with the album data
  export const setAlbums = (albums) => ({
    type: SET_ALBUMS,
    albums
  });
  
  export const addAlbums = (albums) => ({
    type: ADD_ALBUMS,
    albums
  });
  
  export const setArtists = (artists) => ({
    type: SET_ARTISTS,
    artists
  });
  
  export const addArtists = (artists) => ({
    type: ADD_ARTISTS,
    artists
  });
  
  export const setPlayList = (playlists) => ({
    type: SET_PLAYLIST,
    playlists
  });
  
  export const addPlaylist = (playlists) => ({
    type: ADD_PLAYLIST,
    playlists
  });
  //making the API call to the spotify URL by passing the search text as a query parameter
  export const initiateGetResult = (searchTerm) => {
    return async (dispatch) => {
      try {
        const API_URL = `https://api.spotify.com/v1/search?query=${encodeURIComponent(
          searchTerm
        )}&type=album,playlist,artist`;
        const result = await get(API_URL);
        console.log(result);
        const { albums, artists, playlists } = result;
        //With the result we call this action generator function by taking albums from the result
        dispatch(setAlbums(albums));
        dispatch(setArtists(artists));
        return dispatch(setPlayList(playlists));
      } catch (error) {
        console.log('error', error);
      }
    };
  };
  
  export const initiateLoadMoreAlbums = (url) => {
    return async (dispatch) => {
      try {
        const result = await get(url);
        return dispatch(addAlbums(result.albums));
      } catch (error) {
        console.log('error', error);
      }
    };
  };
  
  export const initiateLoadMoreArtists = (url) => {
    return async (dispatch) => {
      try {
        const result = await get(url);
        return dispatch(addArtists(result.artists));
      } catch (error) {
        console.log('error', error);
      }
    };
  };
  
  export const initiateLoadMorePlaylist = (url) => {
    return async (dispatch) => {
      try {
        const result = await get(url);
        return dispatch(addPlaylist(result.playlists));
      } catch (error) {
        console.log('error', error);
      }
    };
  };


