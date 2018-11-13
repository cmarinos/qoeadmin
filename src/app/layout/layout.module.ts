import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgbAccordionModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {SlidePanelComponent} from './components/slide-panel/slide-panel.component';
import {MenuService} from './components/sidebar/menu.service';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbAccordionModule.forRoot(),
        NgbDropdownModule.forRoot()
    ],
    providers: [MenuService],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, SlidePanelComponent]
})
export class LayoutModule {
}
