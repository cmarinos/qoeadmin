import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ContextPathInterceptor} from './context-path.interceptor';
import {UtilsConfiguration} from './utils.model';

export const UtilsConfigurationService = new InjectionToken<UtilsConfiguration>('UtilsConfiguration');

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: []
})
export class UtilsModule {
    static forChild(config?: UtilsConfiguration): ModuleWithProviders {
        return {
            ngModule: UtilsModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ContextPathInterceptor,
                    multi: true
                },
                {
                    provide: UtilsConfiguration,
                    useValue: config
                }
            ]
        };
    }
}
