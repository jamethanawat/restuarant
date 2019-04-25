import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CallnotiService } from 'app/callnoti.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}


export const ROUTES: RouteInfo[] = [
    { path: '/Home', title: 'Home',  icon: 'dashboard', class: '' }, 
    { path: '/Maps', title: 'Maps',  icon:'location_on', class: '' },
     { path: '/Menu', title: 'Menu',  icon:'library_books', class: '' },
     { path: '/Bill', title: 'Bill',  icon:'content_paste', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: 'active-pro' },
    // { path: '/Report', title: 'Report',  icon:'assessment', class: ''},
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
 
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
 
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private cookieService: CookieService ,
    private itemService: CallnotiService,
  ) { }

  ngOnInit() { 
 



    this.itemService.updateListsObsuser.subscribe(
      (response) => {
      

            setTimeout(function () {
                
              if (this.cookieService.get('user')=="admin") {
                // console.log("in-if");
      
              ROUTES.push({path: '/Report', title: 'Report',  icon:'assessment', class: ''});
              this.ngOnInit();
              // this.menuItems = ROUTES.filter(menuItem => menuItem);
              // console.log("show",ROUTES);
              }
          }.bind(this), 100);
             
      }
      
  )

this.showlist();
  
   
    //console.log("show",ROUTES);
    
   
    
  }
  showlist(){
     this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    //console.log("mobile");
      if ($(window).width() > 991) {
        //console.log("mobile-if");
          return false;
      }{
        //console.log("mobile-else");
        return true;
      }
      
  }
}
