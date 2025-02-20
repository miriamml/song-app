import {
    AfterViewInit, APP_INITIALIZER,
    Component, effect,
    inject,
    input,
    OnInit, ViewChild, ViewRef,
} from '@angular/core';
import {SongStore} from '../../state/song.store';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ArtistListComponent} from '../../../artists/component/artist-list/artist-list.component';
import {MatInput, MatInputModule} from '@angular/material/input'
import {ChipSelectorsComponent} from '../../../common/component/chip-selectors/chip-selectors.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CompanySelect} from '../../../company/component/company-select/company-select.component';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';

import * as _moment from 'moment'
import {default as _rollupMoment, Moment} from 'moment';
import {CountrySelectComponent} from '@wlucha/ng-country-select';
import {CountryService} from '../../../common/service/country/country.service';
import {TranslatePipe} from '../../../pipes/translations/translate.pipe';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'YYYY',
    },
    display: {
        dateInput: 'YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};

/**
 * Show the screen for create or edit a song
 */
@Component({
    selector: 'app-edit-song',
    imports: [
        MatCardModule,
        MatGridListModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatIconModule,
        ArtistListComponent,
        MatInput,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        ChipSelectorsComponent,
        CompanySelect,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDatepicker,
        CountrySelectComponent,
        TranslatePipe,
    ],
    templateUrl: './edit-song.component.html',
    standalone: true,
    providers: [
        SongStore,
        provideMomentDateAdapter(MY_FORMATS)
    ],
    styleUrl: './edit-song.component.css'
})
export class SongEditComponent implements OnInit {
    private readonly snackBar = inject(MatSnackBar)
    private readonly formBuilder = inject(FormBuilder)
    private readonly countryService = inject(CountryService)
    readonly songStore = inject(SongStore)
    readonly id = input<string>('new')
    readonly currentSong = this.songStore.currentSong
    readonly moment = moment;

    /**
     * Form that holds the Song local state and validation
     */
    public editSong: FormGroup = this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(2)]],
        artist: ['', [Validators.required]],
        genre: ['', [Validators.required, Validators.minLength(0)]],
        companies: ['', [Validators.required, Validators.minLength(0)]],
        country: ['', [Validators.required, Validators.minLength(0)]],
        year: ['', [Validators.required, Validators.minLength(0)]],
        rating: [0, [Validators.required, Validators.minLength(0)]]
    })

    public get countryControl(): FormControl<any> {
        return this.editSong.controls['country'] as FormControl
    }

    public get yearControl() {
        return this.editSong.controls['year']
    }

    /**
     * Set up an effect for sync the song in state with form state
     */
    constructor() {
        this.editSong.valueChanges
            .subscribe((data: {[key: string]: any}) => {
                console.log(data)
                Object.keys(data).forEach(key => {
                    if (key === 'country' && data[key] != null) {
                        data[key] = data[key].alpha2
                    }
                    if (key === 'year') {
                      data[key] = data[key].format("YYYY")
                    }
                    this.songStore.updateSong(key, data[key])
                })
            })
    }

    async ngOnInit(): Promise<void> {
        await this.songStore.loadSong(this.id())

        const song = this.currentSong()
        this.editSong.patchValue({
            title: song.title,
            artist: song.artist,
            genre: song.genre,
            companies: song.companies ?? [],
            country: this.countryService.findByCode(song.country),
            year: moment({year: song.year}),
            rating: song.rating
        }, {emitEvent: false})
    }

    /**
     * Run save action in Store and display confirmation when process ends
     */
    public async save(): Promise<void> {
        await this.songStore.saveSong()
        this.snackBar.open('Song saved!', "Close", {duration: 2000})
    }

    setYear(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.yearControl.value ?? moment()
        ctrlValue.year(normalizedYear.year())
        this.yearControl.setValue(ctrlValue)
        datepicker.close()
    }

}
