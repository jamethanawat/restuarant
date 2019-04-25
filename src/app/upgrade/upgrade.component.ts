import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { HttpClient } from '@angular/common/http';
import { Reportmenu } from 'app/reportmenu';
import { Bestday } from 'app/bestday';
import { Bestuser } from 'app/bestuser';
@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  databestday = {
    labels: ['1'],
    series: [
      [1]
    ]
  };
  databestmenu: any = {
    labels: ['12p'],
    series: [
      [1]
    ]
  };
  databestuser: any = {
    labels: ['M'],
    series: [
      [1]
    ]
  };
  Vbestmenu: Reportmenu[] = [];
  Vbestdate: Bestday[] = [];
  Vbestuser: Bestuser[] = [];
   i=0;
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;
    seq2 = 0;
    delays2 = 60;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForLineChart2(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 100;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {



    this.databestday.labels.pop();
    this.databestday.series[0].pop();
    this.databestmenu.labels.pop();
    this.databestmenu.series[0].pop();
    this.databestuser.labels.pop();
    this.databestuser.series[0].pop();
    //console.log("showtable");
    setTimeout(function () {

    const obj1 = this.http.get('http://localhost/project/bestmenu.php')

    obj1.subscribe({
      next: (response: any[]) => {
        this.Vbestmenu = response.map((res) => {
          //console.log(res);
          this.databestmenu.labels.push(res.ID);
          this.databestmenu.series[0].push(res.count);
          return new Reportmenu(res.ID, res.Name_product,res.count)

        })
      }
    })
  }.bind(this), 100);
  setTimeout(function () {
    const obj2 = this.http.get('http://localhost/project/bestday.php')
    obj2.subscribe({
      next: (response2: any[]) => {
        this.Vbestdate = response2.map((res2) => {
          //console.log(res);
          this.databestday.labels.push(res2.date);
          this.databestday.series[0].push(res2.sum);
          return new Bestday(res2.date, res2.sum)

        })
      }
    })
  }.bind(this), 100);
  setTimeout(function () {
   
    const obj3 = this.http.get('http://localhost/project/bestuser.php')
    obj3.subscribe({
      next: (response3: any[]) => {
        this.Vbestuser = response3.map((res3) => {
          console.log(res3);
          this.i++;
          this.databestuser.series[0].push(res3.sum);
          this.databestuser.labels.push(this.i);
          //console.log("show",this.i);
          return new Bestuser(this.i,res3.sum,res3.user)

        })
      }
    })
   
  }.bind(this), 100);
  
    setTimeout(function () {
  
      this.bestuser();
      this.bestmenu();
      this.bestday();
     
    }.bind(this),450);

  }


  bestday() {
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 10000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 840px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', this.databestday, optionswebsiteViewsChart, responsiveOptions);
    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }
  bestmenu() {
    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 25, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', this.databestmenu, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);
  }
  bestuser() {
    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 8000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', this.databestuser, optionsDailySalesChart);

    this.startAnimationForLineChart2(dailySalesChart);
  }
}
