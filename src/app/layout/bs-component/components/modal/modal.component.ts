import { Component } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    constructor(public activeModal: NgbActiveModal) { }
}
