import Artist from '../entity/artist.entity';
import {lastValueFrom} from 'rxjs';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';


/**
 * Defines the state of the module
 */
type ArtistState = {
    artists: Artist[],
    currentArtist: Artist | null,
    loadingArtists: boolean,
    loadingArtist: boolean,
}

export const ArtistStore = signalStore(
    {providedIn: 'root'},
    withState<ArtistState>({
        artists: [],
        currentArtist: null,
        loadingArtists: false,
        loadingArtist: false,
    }),
    withMethods((storeArtist, http = inject(HttpClient)) => {
        return ({
            /**
             * Request the artists list to api
             */
            async loadArtists(): Promise<void> {
                patchState(storeArtist, {loadingArtists: true});
                const artists = await lastValueFrom(http.get<Artist[]>('/artists'))
                patchState(storeArtist, {artists, loadingArtists: false})
            },

            /**
             * Instance a new song if in the id come back new or edit new one
             * if in the id come back a id song like string
             *
             * @param id song id
             */
            async loadArtist(id: string): Promise<void> {
                patchState(storeArtist, {loadingArtist: true});
                const currentArtist = id === 'new'
                    ? new Artist()
                    : await lastValueFrom(http.get<Artist>(`/artists/${id}`))
                patchState(storeArtist, {currentArtist, loadingArtist: false})
            },
        });
    })
)
