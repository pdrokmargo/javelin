import { Directive, ElementRef, Input, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import echarts from 'echarts';
import 'echarts/theme/macarons';
import { LayoutService } from '../layout/layout.service';

@Directive({ selector: '[myECharts]' })

export class EChartsDirective implements AfterViewInit, OnDestroy {
  el: ElementRef;
  subscription: Subscription;
  constructor(el: ElementRef, private layoutService: LayoutService) {
    this.el = el;
    this.subscription = layoutService.echartsState$.subscribe((state) => {
      this.resizeChart(state);
    });
  }

  @Input() EChartsOptions: any;
  private myChart;
  private timer;

  ngAfterViewInit() {
    this.myChart = echarts.init(this.el.nativeElement, 'macarons');
    if (!this.EChartsOptions) { return; }

    this.myChart.setOption(this.EChartsOptions);
  }

  ngOnDestroy() {
    if (this.myChart) {
      this.myChart.dispose();
      this.myChart = null; // https://bitbucket.org/iarouse/angular-material/commits/5eec2667b5496edfa1cc0896333b83e188a35676
    }
  }

  resizeChart = (state) => {
    // console.log('state: ' + state)
    setTimeout(() => { // Important
      if (this.myChart) {
        this.myChart.resize();
      }
    }, 300)
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeChart(true);
  }
}
