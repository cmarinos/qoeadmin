import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

export const SlideInOutAnimation = [
    trigger('slideInOut', [
        state('in', style({transform: 'translateX(105%)'})),
        state('out', style({transform: 'translateX(0%)', width: '100%', height: '100%'})),
        transition('* => *', animate(300))
    ])
]

@Component({
    selector: 'app-slide-panel',
    templateUrl: './slide-panel.component.html',
    styleUrls: ['./slide-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [SlideInOutAnimation],
    providers: [RouterModule]
})
export class SlidePanelComponent implements OnInit {

    @Input()
    public outlet: string;

    public animationState = 'in';

    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(params => console.log(params));
    }

    ngOnInit(): void {
    }

    toggleShow() {
        this.animationState = this.animationState === 'out' ? 'in' : 'out';
    }

}
