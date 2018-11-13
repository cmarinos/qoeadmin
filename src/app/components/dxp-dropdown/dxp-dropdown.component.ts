import {
    Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {NoRootTagComponent} from "../../commons/common.model";

@Component({
    selector: 'app-dxp-dropdown',
    template: `
        <div class="dropdown">
            <button class="btn {{buttonClassType}} dropdown-toggle"
                    type="button"
                    id="{{id}}"
                    attr.data-toggle="dropdown"
                    attr.data-aria-haspopup="true"
                    [attr.data-aria-expanded]="expanded"
                    (click)="onButtonToggleClick($event)"
            >
                {{name}}
            </button>
            <div [ngClass]="{show: !hideDropDownItems}" #dropDownItemsContainer class="dropdown-menu" [attr.aria-labelledby]="id">
                <a *ngFor="let item of dropDownItems" (click)="onButtonItemClick($event)" class="dropdown-item" [routerLink]="item.link">{{item.title}}</a>
            </div>
        </div>
        
    `,
    styleUrls: ['./dxp-dropdown.component.scss']
})
export class DxpDropDownComponent  {

    @ViewChild('dropDownItemsContainer', {read: ElementRef})
    public dropDownItemsContainer?: ElementRef;

    public hideDropDownItems: boolean;

    @Input() public buttonClassType: string;
    @Input() public name: string;
    @Input() public id: string;
    @Input() public expanded: boolean;
    @Input() public preventDefault: boolean;
    @Input() public dropDownItems: DxpDropDownItem[];

    @Output() onToggleClick: EventEmitter<any> = new EventEmitter();
    @Output() onItemClick: EventEmitter<any> = new EventEmitter();

    constructor(vcRef: ViewContainerRef) {

        this.buttonClassType = 'btn-secondary';
        this.expanded = false;
        this.preventDefault = true;
        this.hideDropDownItems = true;
    }

    onInit() {
        console.log('dropDownItems', this.dropDownItems);
    }

    onButtonToggleClick($event) {
        if (this.preventDefault) {
            $event.preventDefault();
        }
        this.hideDropDownItems = !this.hideDropDownItems;
        this.onToggleClick.emit($event);
    }

    onButtonItemClick($event) {
        if (this.preventDefault) {
            $event.preventDefault();
        }
        this.onItemClick.emit($event);
    }

}

export class DxpDropDownItem {
    public title: string;
    public link: string;
}
