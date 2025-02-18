import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {Component, computed, effect, forwardRef, inject, Input, input, model} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {
    MatAutocomplete,
    MatAutocompleteModule,
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger, MatOption
} from '@angular/material/autocomplete';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRow, MatChipsModule } from '@angular/material/chips';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
    selector: 'chip-selectors',
    imports: [
        MatFormField,
        MatChipGrid,
        MatChipRow,
        MatIcon,
        FormsModule,
        MatChipInput,
        MatAutocompleteTrigger,
        MatAutocomplete,
        MatOption,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatProgressBar
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ChipSelectorsComponent),
            multi: true,
        },
    ],
    templateUrl: './chip-selectors.component.html',
    standalone: true,
    styleUrl: './chip-selectors.component.css'
})
export class ChipSelectorsComponent implements ControlValueAccessor {

    value: any;
    onChange: any = () => {};
    onTouched: any = () => {};

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    readonly searchText = model('');
    readonly selects = model<Array<string|number>>([]);

    public nameProp = input('title')
    public data = input<any[]>([])
    public label = input('')
    public placeholder = input('')
    public loading = input<boolean>(false)
    public multiple = input<boolean>(true)

    /**
     * Computed signal only to show items matching text input
     */
    readonly filteredItems = computed(() => {
        const currentItem = this.searchText().toLowerCase();
        const selected = this.selects()

        return this.data().filter(item =>
            !selected.includes(item['id'] ?? '') &&
            (item[this.nameProp()] ?? '').toLowerCase().includes(currentItem)
        )
    });

    readonly selectedItems = computed(() => {
        const currentSelection = this.selects()
        return this.data().filter(item => currentSelection.includes(item['id']))
    })

    constructor() {
        effect(() => {
            this.onChange(this.selects())
        });
    }

    /**
     * Add a new element to the selection list
     *
     * @param event
     */
    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (value) {
            this.selects.update(
                items => this.multiple() ? [...items, event.value] : [event.value]
            )
        }

        this.searchText.set('');
    }

    remove(item: string): void {
        this.selects.update(items => {
            const index = items.indexOf(item);
            let newItems = [...items]
            // If index exists, creates a copy of new array without deleted values
            if (index >= 0) {
                newItems.splice(index, 1);
            }

            return newItems
        });
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.selects.update(
            items => this.multiple() ? [...items, event.option.value] : [event.option.value]
        )

        this.searchText.set('');
        event.option.deselect();
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
