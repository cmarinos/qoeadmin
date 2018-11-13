import {AfterViewInit, Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit, AfterViewInit {

    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    public newCustomer: number;
    public prospectsCustomer: number;
    public abandonedCustomer: number;

    public barChartTitle: string;
    public barChartDataLoaded: boolean = false;
    public barChartDataSet: any[];

    public totalCustomerChartDataLoaded: boolean = false;
    public totalCustomerChartLabels: string[];
    public totalCustomerChartDataSet: any[];

    public barChartDescription: string;

    public trendChartDataLoaded: boolean = false;
    public trendChartLabels: string[];
    public trendChartDataSet: any[];

    constructor(private processHistoryService: ProcessHistoryService) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {
        this.totalCustomerChartLabels = new Array();
        this.totalCustomerChartDataSet = new Array();
        this.trendChartLabels = new Array();
        this.trendChartDataSet = new Array();
    }

    ngAfterViewInit(): void {
        this.prepareTotalCustomerChart();
        this.prepareDurationChartData('avg');
        this.populateTrendsChartData();
    }

    private prepareTotalCustomerChart() {
        this.processHistoryService.countTasks().subscribe(taskCounter => {
            this.totalCustomerChartLabels.push('Completed');
            this.totalCustomerChartDataSet.push(taskCounter.completed);
            this.newCustomer = taskCounter.completed;

            this.totalCustomerChartLabels.push('Abandoned');
            this.totalCustomerChartDataSet.push(taskCounter.abandoned);
            this.abandonedCustomer = taskCounter.abandoned;

            this.totalCustomerChartLabels.push('Active');
            this.totalCustomerChartDataSet.push(taskCounter.active);
            this.prospectsCustomer = taskCounter.active;

            this.totalCustomerChartDataLoaded = true;
        });
    }

    private prepareDurationChartData(button: string): void {
        this.processHistoryService.findCompletedTaskDuration().subscribe(response => {
            const dataSet = new Array();
            this.barChartTitle = 'Onboarding Friction Indicator (minutes)';
            this.barChartDescription = 'Locate the steps that customers spend most time on.';
            response.forEach(value => {
                const val = this.getDurationChartValueByButtonId(value, button);
                let task = _.find(dataSet, (item) => item.label == value.name);
                const tempTime = moment.duration(val);
                const time = Math.floor(val / 1000 / 60);
                if (!task) {
                    task = {data: [time], label: value.name};
                    dataSet.push(task);
                } else {
                    task.data.push(time);
                }
            });

            this.barChartDataSet = dataSet;
            this.barChartDataLoaded = true;
        });
    }

    private populateTrendsChartData() {
            this.processHistoryService.findAbandonedTasks().subscribe(abandonedTasks => {
                this.trendChartDataSet.push(this.initDataSet(abandonedTasks, 'Abandoned'));
                this.processHistoryService.findCompletedTasks().subscribe(completedTasks => {
                    this.trendChartDataSet.push(this.initDataSet(completedTasks, 'Completed'));
                    this.trendChartDataLoaded = true;
                });
            });
    }

    private initDataSet(response, label: string) {
        const dataSet = {
            label: label,
            data: [],
            fill: false,
        };
        const data = _.groupBy(response, item => moment(item.startTime).format('DD-MM-YYYY'));
        let labels = Object.keys(data);
        labels = _.sortBy(labels, (label) => moment(label, 'DD-MM-YYYY'));
        this.trendChartLabels = labels;
        for (let i = 0; i < labels.length; i++) {
            const item = labels[i];
            const numberOfItems = data[item].length;
            if (numberOfItems > 0) {
                dataSet.data.push(numberOfItems);
            }
        }
        return dataSet;
    }

    private getDurationChartValueByButtonId(responseItem, buttonId?: string): number {
        let val;
        switch (buttonId) {
            case 'max':
                val = responseItem.maximum;
                break;
            case 'min':
                val = responseItem.minimum;
                break;
            case 'avg':
                val = responseItem.average;
                break;
            default:
                val = responseItem.average;
        }
        return val;
    }

    private onTotalTaskCounterChartClick(type: string) {
        switch (type.toLowerCase()) {
            case 'active':
                this.prepareAbandonedOrActiveChartData(type);
                this.barChartTitle = 'Onboarding Prospect Current Step';
                this.barChartDescription = 'Learn in which steps your customers are in their onboarding journey';
                break;
            case 'abandoned':
                this.prepareAbandonedOrActiveChartData(type);
                this.barChartTitle = 'Onboarding Exit Points';
                this.barChartDescription = 'Find out the steps where customers dropout.';
                break;
            case 'completed':
                this.barChartTitle = 'Onboarding Friction Indicator (minutes)';
                this.barChartDataLoaded = false;
                this.barChartDescription = 'Locate the steps that customers spend most time on.';
                this.prepareDurationChartData('avg');
        }
    }

    private prepareAbandonedOrActiveChartData(type: string) {
            this.barChartDataLoaded = false;
        this.processHistoryService.findTaskCounter(type.toLowerCase()).subscribe(response => {
            const dataSet = new Array();
            response.forEach(value => {
                dataSet.push({data: [value.counter], label: value.name});
            });

            this.barChartDataSet = dataSet;
            this.barChartDataLoaded = true;
        });
    }

    onTaskTypeSelected(type: string) {

    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
