import {OnInit, TemplateRef, ViewChild, ViewContainerRef} from "@angular/core";
import {environment} from "../../environments/environment";

export abstract class NoRootTagComponent implements OnInit {

    protected abstract onInit(): void;

    @ViewChild('templateReference') template;

    constructor(private vcRef:ViewContainerRef) {}

    ngOnInit() {
        this.vcRef.createEmbeddedView(this.template);
        this.ngOnInit();
    }
}

export function getBaseUrl() {
    return window.location.protocol + '//' + window.location.host + environment.clientContextPath;
}

