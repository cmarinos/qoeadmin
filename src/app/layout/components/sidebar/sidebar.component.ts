import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {MenuService} from './menu.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive = false;
    showMenu = '';
    pushRightClass = 'push-right';
    menus: Menu[];

    constructor(
        private translate: TranslateService,
        public router: Router,
        private menuService: MenuService
    ) {
        this.menus = new Array();
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

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

    ngOnInit(): void {
        this.initMenu();

        if (!this.showMenu) {
            this.showMenu = 'general';
        }
    }

    private initMenu() {

        const authorities;
        const menuItems = new Array();

        menuItems.push(new MenuItem('fa fa-fw fa-dashboard', 'Dashboard', '/layout/dashboard'));
        if (this.hasRole(authorities, 'QOE_PRODUCT_LIST')) {
            menuItems.push(new MenuItem('fa fa-cube', 'Product Factory', '/layout/catalog'));
        }
        if (this.hasRole(authorities, 'QOE_FORM_LIST')) {
            menuItems.push(new MenuItem('fa fa-fw fa-wpforms', 'Forms', '/layout/form'));
        }

        const menu = new Menu('General', menuItems);
        this.menus.push(menu);

    }

    hasRole(authorities: Authority[], name: string) {
        return authorities.find(value => value.authority === name) !== undefined;
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
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

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}

export class Menu {
    constructor(public name: string, public menuItems: MenuItem[]) {}
}

export class MenuItem {
    constructor(public icon: string, public name: string, public link: string) {}
}