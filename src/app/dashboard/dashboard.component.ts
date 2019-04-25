import { Component, OnInit, TemplateRef } from '@angular/core';
import * as Chartist from 'chartist';
// MDB Angular Free
import { CheckboxModule, WavesModule, ButtonsModule, InputsModule, IconsModule } from 'angular-bootstrap-md'
import { ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MdbTableService } from 'angular-bootstrap-md';
import { CookieService } from 'ngx-cookie-service';
import { CallnotiService } from 'app/callnoti.service';
import { Home } from 'app/home';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import Swal from 'sweetalert2';
import { Noti } from 'app/noti';
import { NumNoti } from 'app/num-noti';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  size:number;
  Idshow:number;
  Indexshow:number;
  Textshow:string;
  headershow:string;
  imashow:string;
  N=0;
  CVim=0;
  CVorder=0;
  CVimEdit=0;
  CVorderEdit=0;
  page = 1;
  pageSize = 10;
  collectionSize = 1;
  checkadmin=1;
  modalRef: BsModalRef;
  vpost:Home[]=[];
  constructor(
    private cookieService: CookieService,
    private itemService: CallnotiService,
    private modalService: BsModalService,
    private http: HttpClient,
    private http2: Http,

    
  ) { 
   
  }
  
  ngOnInit() {
    // this.cookieService.deleteAll();
     this.showhome();
    //this.cookieService.set('user', "user");
    //this.itemService.getbill();

    // const r=Math.floor(Math.random() * 9999);
    // this.cookieService.set( 'test', r.toString() );
    //console.log("test=",this.cookieService.get('test'));
  }
  showhome(){
    const obj = this.http.get('http://localhost/project/viewhome.php')
    obj.subscribe({
      next: (response: any[]) => {
        this.vpost = response.slice(0, 100).map((res) => {
          //console.log("res->",res);
          return new Home(res.Id,res.Numorder,res.Images,res.Header,res.Text)

        })
        this.size=this.vpost.length;
        this.collectionSize = this.vpost.length;
      }
    })
  }
  openModalWithClassinsert(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.CVim=0;
    this.CVorder=0;
  }
  openModalWithClass(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'gray modal-lg' })
      
      
    );
   
  }
  openModaledit(template: TemplateRef<any>, index: Home) {

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.CVimEdit=0;
    this.CVorderEdit=0;
    this.Idshow=index.Id;
    this.Indexshow=index.Numorder;
    this.Textshow=index.Text;
    this.headershow=index.Header;
    this.imashow=index.Images;
    console.log("index",index);
  
  }
  admin() {
    //console.log("test");
    if (this.cookieService.get('user')!='admin' ) {
      return false;
    }
    else {
      return true;
    }
  }
  get home(): Home[] {
  
  // console.log("yyyy",this.check++);
      return this.vpost
  }
  get hometable(): Home[] {
  
    // console.log("yyyy",this.check++);
        return this.vpost
          .map((country, i) => ({ id: i + 1, ...country }))
        
             .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
    onSubmitedit(event: any){
      const ima = event.target.ima.value;
      const header = event.target.Header.value;
      const text = event.target.Text.value;
      const index = event.target.Index.value;
      var checkall=0;
      this.CVimEdit=0;
      this.CVorderEdit=0;
      if(ima==""){
        this.CVimEdit++;
        checkall++;
      }
      if(index==""){
        this.CVorderEdit++;
        checkall++;
      }
      if(checkall==0){
      const obj = this.http2.get('http://localhost/project/updatehome.php?id=' + this.Idshow + '&ima=' + ima + '&header=' + header + '&text=' + text + '&index=' + index)
      obj.subscribe({
        next: (response: any) => {
          //console.log(response);
        }
      })
      Swal.fire(
        'Edit Success',
        'You Edit Slide In Website',
        'success'
      ) 
      this.showNotificationnew("Edit Slide"+header + " Success.");
      const L = new Noti("Edit Slide "+header);
      this.itemService.listnoti.unshift(L);
      this.N = 4;
      this.itemService.numnoti.numberlist++;
      let dateRange: NumNoti = { numberlist: this.N }
      this.itemService.updateListFn(dateRange);
      this.imashow = event.target.ima.value;
      this.headershow = event.target.Header.value;
      this.Textshow = event.target.Text.value;
      this.Indexshow = event.target.Index.value;
      this.ngOnInit();
      this.showhome();
      this.modalRef.hide();
     
      }
    }
    checkimEdit(){
      if(this.CVimEdit==0){
        return false;
      }
      else{
        return true;
      }
    }
    checkorderEdit(){
      if(this.CVorderEdit==0){
        return false;
      }
      else{
        return true;
      }
    }
    checkim(){
      if(this.CVim==0){
        return false;
      }
      else{
        return true;
      }
    }
    checkorder(){
      if(this.CVorder==0){
        return false;
      }
      else{
        return true;
      }
    }
    onSubmitinsert(event: any){
      const ima = event.target.ima.value;
      const header = event.target.Header.value;
      const text = event.target.Text.value;
      const index = event.target.Index.value;
      var checkall=0;
      this.CVim=0;
      this.CVorder=0;
      if(ima==""){
        this.CVim++;
        checkall++;
      }
      if(index==""){
        this.CVorder++;
        checkall++;
      }
      if(checkall==0){
        const obj = this.http2.get('http://localhost/project/inserthome.php?ima=' + ima + '&header=' + header + '&text=' + text + '&index=' + index)
      obj.subscribe({
        next: (response: any) => {
          //console.log(response);
        }
      })
      Swal.fire(
        'Insert Success',
        'You Insert Slide In Website',
        'success'
      )
      // this.imashow = event.target.ima.value;
      // this.headershow = event.target.Header.value;
      // this.Textshow = event.target.Text.value;
      // this.Indexshow = event.target.Index.value;
      this.showNotificationnew("Insert Slide "+header + " Success.");
      const L = new Noti("Insert Slide "+header);
      this.itemService.listnoti.unshift(L);
      this.N = 4;
      this.itemService.numnoti.numberlist++;
      let dateRange: NumNoti = { numberlist: this.N }
      this.itemService.updateListFn(dateRange);
      this.ngOnInit();
      this.showhome();
      this.modalRef.hide();
      }
      
      
    }
    hidemodel() {
      //console.log("hide");
      this.modalRef.hide();
      this.modalService.hide(1);
    }

    deleterow(iddex){
      console.log("delete");

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't delete it",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your item has been deleted.',
            'success'
          )
          const obj = this.http2.get('http://localhost/project/deletehome.php?id=' + this.Idshow)
          obj.subscribe({
            next: (response: any) => {
            //  console.log(response);
            }
          })
          this.showNotificationnew("Delete  Slide ID"+this.Idshow + " Success.");
      const L = new Noti("Delete Slide ID :"+this.Idshow);
      this.itemService.listnoti.unshift(L);
      this.N = 4;
      this.itemService.numnoti.numberlist++;
      let dateRange: NumNoti = { numberlist: this.N }
      this.itemService.updateListFn(dateRange);
          this.ngOnInit();
          this.showhome();
          //location.reload();
          this.modalRef.hide();
          
          //this.hidemodel();
        
        }
  
      })
    }

    showNotificationnew(text) {
      $.notify({
        icon: "notifications",
        message: text
  
      }, {
          type: 'success',
          timer: 500,
          placement: {
            from: 'top',
            align: 'right'
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }

  





}




