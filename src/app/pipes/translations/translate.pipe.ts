import { Pipe, PipeTransform } from '@angular/core';
import {translations} from './translations';

@Pipe({
    name: 'translate',
    standalone: true
})
export class TranslatePipe implements PipeTransform {
    transform(key: string, lang: string = 'es', params?: { [key: string]: string }): string {
        // @ts-ignore
        const langTranslations = translations[lang];

        if (langTranslations && langTranslations[key]) {
            let translation = langTranslations[key];

            if (params) {
                Object.keys(params).forEach(paramKey => {
                    translation = translation.replace(`{{${paramKey}}}`, params[paramKey]);
                });
            }

            return translation;
        }

        return key;
    }
}
