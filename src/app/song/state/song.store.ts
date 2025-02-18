import Song from '../entity/song.entity';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom, Observable} from 'rxjs';
import {Country} from '@wlucha/ng-country-select';

/**
 * Defines the state of the module
 */
type SongState = {
    songs: Song[],
    genres: {id: string}[],
    currentSong: Song,
    country: Country,
    loadingList: boolean,
    loadingSong: boolean,
    savingSong: boolean,
}

export const SongStore = signalStore(
    {providedIn: 'root'},
    withState<SongState>({
        songs: [],
        genres: [
            { id: 'Pop' },
            { id: 'Rock', },
            { id: 'Classic' },
            { id: 'Alternative'},
            { id: 'Heavy'},
            { id: 'Chill' },
            { id: 'Psychedelic rock' },
            { id: 'Blues' },
            { id: 'Jazz' },
            { id: 'Romance' }
        ],
        currentSong: new Song(),
        country: {
            alpha2: "",
            alpha3: "",
            translations: {
                de: "",
                en: "",
                es: "",
                fr: "",
                it: "",
            }
        },
        loadingList: false,
        loadingSong: false,
        savingSong: false,
    }),
    withMethods((store, http = inject(HttpClient)) => ({
        /**
         * Request the song list to api
         */
        async loadSongs(): Promise<void> {
            patchState(store, { loadingList: true });

            const songs = await lastValueFrom(http.get<Song[]>('/songs'))
            patchState(store, { songs, loadingList: false})
        },

        /**
         * Instance a new song if in the id come back new or edit new one
         * if in the id come back a id song like string
         *
         * @param id song id
         */
        async loadSong(id: string): Promise<void> {
            patchState(store, { loadingSong: true });

            const currentSong = id === 'new'
                ? new Song()
                : await lastValueFrom(http.get<Song>(`/songs/${id}`))

            patchState(store, { currentSong, loadingSong: false})
        },
        /**
         * Updates a single property of song entity
         * @param path
         * @param value
         */
        updateSong(path: string, value: any) {
            patchState(store, { currentSong: {...store.currentSong() as Song, [path]: value} });
        },
        /**
         * Updates or creates a song in api
         */
        async saveSong() {
            patchState(store, { savingSong: true })
            const song = store.currentSong()

            await lastValueFrom(
                song.id === 'new'
                    ? http.post<Song>('/songs', song)
                    : http.put<Song>(`/songs/${song.id}`, song)
            )

            patchState(store, { savingSong: false })
        }
    }))
)
