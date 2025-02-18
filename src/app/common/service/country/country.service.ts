import { Injectable } from '@angular/core';
import countries from './countries'
import {Country} from '@wlucha/ng-country-select';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
    /**
     * Finds country by iso2 code
     *
     * @param countryCode
     */
    findByCode(countryCode: string): Country|null {
      return countries.find(c => c.alpha2 === countryCode) ?? null as Country|null
    }
}
