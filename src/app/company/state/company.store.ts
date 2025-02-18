import Company from '../entity/company.entity';
import {lastValueFrom} from 'rxjs';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

/**
 * Defines the state of the module
 */
type CompanyState = {
    company: Company[],
    currentCompany: Company | null,
    loadingCompanies: boolean,
    loadingCompany: boolean,
}

export const CompanyStore = signalStore(
    {providedIn: 'root'},
    withState<CompanyState>({
        company: [],
        currentCompany: null,
        loadingCompanies: false,
        loadingCompany: false,
    }),
    withMethods((storeCompany, http = inject(HttpClient)) => {
        return ({
            /**
             * Request the companies list to api
             */
            async loadCompanies(): Promise<void> {
                patchState(storeCompany, {loadingCompanies: true});
                const company = await lastValueFrom(http.get<Company[]>('/companies'))
                patchState(storeCompany, {company, loadingCompanies: false})
            },

            /**
             * Instance a new song if in the id come back new or edit new one
             * if in the id come back a id song like string
             *
             * @param id company-select id
             */
            async loadCompany(id: string): Promise<void> {
                patchState(storeCompany, {loadingCompany: true});
                const currentCompany = id === 'new'
                    ? new Company()
                    : await lastValueFrom(http.get<Company>(`/companies/${id}`))
                patchState(storeCompany, {currentCompany, loadingCompany: false})
            },
        });
    })
)
