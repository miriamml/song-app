import Song from '../entity/song.entity';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';

/**
 * Defines the state of the module
 */
type SongState = {
    songs: Song[],
    currentSong: Song | null,
    loadingList: boolean,
}

export const SongStore = signalStore(
    {providedIn: 'root'},
    withState<SongState>({
        songs: [],
        currentSong: null,
        loadingList: false,
    }),
    withMethods((store, http = inject(HttpClient)) => ({
        /**
         * Request the song list to api
         */
        async loadSongs(): Promise<void> {
            patchState(store, { loadingList: true });

            const songs = await lastValueFrom(http.get<Song[]>('/songs'))
            patchState(store, { songs, loadingList: false})
        }
    }))
)
