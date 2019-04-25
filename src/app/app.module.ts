import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AlertModule,CarouselModule,ModalModule,ProgressbarModule  } from 'ngx-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';// get post pust delete
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { CookieService } from 'ngx-cookie-service';
//import 'sweetalert2/src/sweetalert2.scss'
// CommonJS

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,AlertModule.forRoot(),CarouselModule.forRoot(),
    ModalModule.forRoot(),NgbModule,NgbPaginationModule, NgbAlertModule,HttpClientModule,ProgressbarModule.forRoot(),
    AgmCoreModule.forRoot({
      //  apiKey: 'AIzaSyCLdw_omxqPuzYbfA_QVFJtqq_BIJgyGgA'
    }),
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

  ],
  providers: [CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
