import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as Slider from 'bootstrap-slider';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-dxp-slider',
    template: `        
        <div class="dxp-slider-container">
            <div class="slider-values min-value">{{minimum}}</div>
            <input #sliderElement id="amountslider"
                   type="text"
                   data-slider-id='amountslider'
            >
            <div class="slider-values max-value">{{maximum}}</div>
        </div>

    `,
    styleUrls: ['./dxp-slider.component.scss']
})
export class DxpSliderComponent implements OnInit {

    @ViewChild('sliderElement', {read: ElementRef})
    public sliderElement?: ElementRef;

    private formControl: FormControl;

    @Input() public minimum: number;
    @Input() public maximum: number;
    @Input() public step: number;
    @Input() public value: number;
    @Input() public sliderMin: number;
    @Input() public formElementName;
    @Input() public formGroup: FormGroup;

    @Output() onchange: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit() {

        this.initSliderDefaultValues();

        let slider = new Slider(this.sliderElement.nativeElement, {
            step: this.step,
            min: this.minimum,
            max: this.maximum,
            ticks_tooltip: false,
            ticks_snap_bounds: 200,
            tooltip_position: 'right',
            tooltip: 'always'
        });

        this.initFormGroup();

        slider.on('slide', (event) => {
            if (this.formControl) {
                this.formControl.setValue(event);
            }
            this.onchange.emit(event);
        });
        slider.setValue(this.value);
    }

    private initFormGroup() {
        if (this.formGroup) {
            this.formControl = new FormControl(this.value);
            this.formGroup.addControl(this.formElementName, this.formControl);
        }
    }

    private initSliderDefaultValues() {
        this.minimum = !this.minimum ? 0 : this.minimum;
        this.maximum = !this.maximum ? 100 : this.maximum;
        this.step = !this.step ? 1 : this.step;
        this.value = !this.value ? ((this.maximum - this.minimum) / 2) + this.minimum : this.value;
    }
}
