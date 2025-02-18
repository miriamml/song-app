import {Component, effect, forwardRef, inject, model, ModelSignal, OnInit} from '@angular/core';
import {CompanyStore} from '../../state/company.store';
import {ChipSelectorsComponent} from '../../../common/component/chip-selectors/chip-selectors.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'company-select',
    imports: [
        ChipSelectorsComponent,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CompanySelect),
            multi: true,
        },
    ],
    templateUrl: './company-select.component.html',
    standalone: true,
    styleUrl: './company-select.component.css'
})
export class CompanySelect implements OnInit, ControlValueAccessor{

    value = model<Array<string|number>>([]);
    onChange: any = () => {};
    onTouched: any = () => {};

    readonly companyStore = inject(CompanyStore)

    constructor() {
        effect(() => {
            this.onChange(this.value())
        });
    }

    ngOnInit(): void {
        this.companyStore.loadCompanies()
    }

    writeValue(value: any): void {
        this.value.update(v => value)
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
