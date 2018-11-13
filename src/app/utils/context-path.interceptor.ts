import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {UtilsConfiguration} from './utils.model';


@Injectable()
export class ContextPathInterceptor implements HttpInterceptor {

    constructor(@Inject(UtilsConfiguration) private config) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let exclusion;
        if (this.config && this.config.contextPathUrlExclusion) {
            const urlExclusion = this.config.contextPathUrlExclusion;
            if (urlExclusion) {
                const currentPaths = req.url.split(/[\s/]+/);
                exclusion = urlExclusion.find(value => currentPaths.includes(value));
            }
        }
        if (!exclusion) {
            req = req.clone({url: environment.apiContextPath + req.url});
        }
        return next.handle(req);
    }
}

