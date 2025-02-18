import {
    Component, effect, forwardRef,
    inject, model,
    OnInit,
} from '@angular/core';
import {ArtistStore} from '../../state/artist.store';
import {ChipSelectorsComponent} from '../../../common/component/chip-selectors/chip-selectors.component';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'artist-list',
    imports: [
        ChipSelectorsComponent,
        FormsModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ArtistListComponent),
            multi: true,
        },
    ],
    templateUrl: './artist-list.component.html',
    standalone: true,
    styleUrl: './artist-list.component.css'
})
export class ArtistListComponent implements OnInit, ControlValueAccessor {

    value = model<Array<string|number>>([]);
    onChange: any = () => {};
    onTouched: any = () => {};

    readonly artistStore = inject(ArtistStore)

    constructor() {
        effect(() => {
            this.onChange(this.value()[0])
        });
    }

    ngOnInit(): void {
        this.artistStore.loadArtists()
    }

    writeValue(value: any): void {
        this.value.update(v => [value])
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
