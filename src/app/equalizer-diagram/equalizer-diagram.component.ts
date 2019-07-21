import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Equalizer} from '../interfaces/Equalizer';

import * as Highcharts from 'highcharts';

@Component({
    selector: 'app-equalizer-diagram',
    templateUrl: './equalizer-diagram.component.html',
    styleUrls: ['./equalizer-diagram.component.scss']
})
export class EqualizerDiagramComponent implements OnInit, OnChanges {

    @Input('equalizer') equalizers: Equalizer[] = [];

    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options = {};
    chart: Highcharts.Chart;


    public update: boolean = true;
    private initialized = false;

    constructor() {
    }

    ngOnInit() {
        this.setupChart();
        this.updateChart();
        this.initialized = true;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.equalizers = changes.equalizers.currentValue;
        this.updateChart();
    }

    private updateChart(): void {
        if (!this.initialized) {
            return;
        }
        this.chartOptions.series = [];
        const series = this.equalizers.map((value, idx) => {
            return [value.channel.position, value.levels.master.pct];
        });


        this.chartOptions.series.push({type: 'line', data: series});
        this.chart.update(this.chartOptions, true, true,{duration: 200, easing: 'out'} );
    }

    public setChartInstance(chart: Highcharts.Chart) {
        this.chart = chart;
        this.initialized = true;
    }

    private setupChart(): void {
        this.chartOptions = {
            chart: {
                backgroundColor: null,
            },
            title: {
                text: null,
                style: {
                    display: 'none',
                }
            },
            subtitle: {
                text: null,
                style: {
                    display: 'none'
                }
            },
            xAxis: {
                title: {
                    text: null
                },
                labels: {
                    enabled: false
                },
                min: 0,
                max: 9,
                tickAmount: 10,
            },
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    enabled: false
                },
                min: 0,
                max: 100,
                tickAmount: 3
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            accessibility: {},
            tooltip: {
                enabled: false
            },
            plotOptions: {
                series: {
                    enableMouseTracking: false
                },
            },

            series: [
                {
                    data: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]],
                    type: 'line'
                }
            ]
        };
    }

}
