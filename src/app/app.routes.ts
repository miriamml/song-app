import { Routes } from '@angular/router';
import {SongListComponent} from './song/component/song-list/song-list.component';
import {SongEditComponent} from './song/component/edit-song/edit-song.component';

export const routes: Routes = [
    { path: 'songs', component: SongListComponent },
    { path: 'songs/:id', component: SongEditComponent },
];
