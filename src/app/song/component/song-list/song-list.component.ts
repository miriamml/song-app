import {Component, inject, OnInit, signal} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {SongStore} from '../../state/song.store';
import {RouterLink} from '@angular/router';


/**
 * Displays the list of registered songs
 *
 * @author Miriam Martin Luna <miriam_ml_10@hotmail.es>
 */
@Component({
    selector: 'app-song-list',
    imports: [MatCardModule, MatGridListModule, MatChipsModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule, RouterLink],
    templateUrl: './song-list.component.html',
    styleUrl: './song-list.component.css',
    standalone: true,
    providers: [SongStore]
})
export class SongListComponent implements OnInit {
    readonly store = inject(SongStore)

    ngOnInit(): void {
        this.store.loadSongs();
    }
}
