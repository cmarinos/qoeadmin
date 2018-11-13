import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../../environments/environment';
import {getBaseUrl} from '../../../commons/common.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    pushRightClass = 'push-right';
    shouldEnableLogout: boolean;
    logoutUrl: string;

    constructor(
        private translate: TranslateService,
        public router: Router
    ) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS', 'el']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.shouldEnableLogout = environment.envName !== 'dev';
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
