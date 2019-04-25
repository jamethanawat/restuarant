import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { CallnotiService } from 'app/callnoti.service';
import { CookieService } from 'ngx-cookie-service';
import { Bill } from 'app/bill';
import { Detailbill } from 'app/detailbill';
import Swal from 'sweetalert2';
import { Noti } from 'app/noti';
import { NumNoti } from 'app/num-noti';
declare var $: any;
@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  indexpage = 1;
  indexpageSize = 5;
  page = 1;
  pageSize = 10;
  N: number;
  collectionSize = 5;
  indexcollectionSize=5;
  vpost: Bill[] = [];
  indexpost: Detailbill[] = [];
  search = "";
  modalRef: BsModalRef;
  bill:String;
  constructor(private modalService: BsModalService,
   
    private http: HttpClient,
    private http2: Http,
    private itemService: CallnotiService,
    private cookieService: CookieService, ) { }

  ngOnInit() {
    this.itemService.updateListsObsuser.subscribe(
      (response) => {

        setTimeout(function () {
                
         this.ngOnInit();
      
             
      }.bind(this), 100);
           
      }
      
  )
   // console.log("Bill-",this.cookieService.get('bill'));
    this.showtable();
    //console.log("test=",this.cookieService.get('test'));
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
  showtable() {
    //console.log("showtable");
    const obj = this.http.get('http://localhost/project/viewbill.php?user='+this.cookieService.get('user')+'&bill='+this.cookieService.get('bill'))

    obj.subscribe({
      next: (response: any[]) => {
        this.vpost = response.slice(0, 100).map((res) => {
          //console.log(res);
          return new Bill(res.Bill, res.Total,res.Date,res.Status,res.User,res.Discount)

        })
        this.collectionSize = this.vpost.length;
       // console.log("showtable",this.collectionSize);
      }
    })
  }
  get indexinbill(): Detailbill[] {
   
  // console.log("yyyy",this.check++);
      return this.indexpost
        .map((country2, i) => ({ id: i + 1, ...country2 }))
           .slice((this.indexpage - 1) * this.indexpageSize, (this.indexpage - 1) * this.indexpageSize + this.indexpageSize);

  }
  get allbill(): Bill[] {
    if (this.search == "") {
  // console.log("yyyy",this.check++);
      return this.vpost
        .map((country, i) => ({ id: i + 1, ...country }))
      
           .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      
       
    } else {
      return this.vpost
        .filter((item) => item.Date.toLowerCase().includes(this.search.toLowerCase())||item.Bill.toLowerCase().includes(this.search.toLowerCase())
        ||item.Status.toLowerCase().includes(this.search.toLowerCase())||item.User.toLowerCase().includes(this.search.toLowerCase())
        );

    }

  }
  onKey(event: any) { // without type info
    ///console.log(",event.target.value);
    this.search = event.target.value;


  }
  clicklist( index: Bill){
    // console.log("click");

    // console.log(index);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't confirm Bill :"+index.Bill+"  Total : "+(index.Total-index.Discount)+" Baht",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Confirm!',
          'Your confirm Bill',
          'success'
        )
        
        const obj = this.http2.get('http://localhost/project/updatestatus.php?id=' + index.Bill)
      obj.subscribe({
        next: (response: any) => {
          console.log(response);
        }
      })
      if(index.User=="user" ){
        const obj2 = this.http2.get('http://localhost/project/sample_email.php?bill=' + index.Bill+'&user='+index.User)
        obj2.subscribe({
          next: (response: any) => {
            console.log(response);
          }
        })
      }
      else{
        const obj2 = this.http2.get('http://localhost/project/sample_email.php?bill=' + index.Bill+'&user='+index.User)
        obj2.subscribe({
          next: (response: any) => {
            console.log(response);
          }
        })
        const obj3 = this.http2.get('http://localhost/project/sample_email.php?bill=' + index.Bill+'&user=user')
        obj3.subscribe({
          next: (response: any) => {
            console.log(response);
          }
        })
      }
     
        
        this.showNotificationcheckbill("Check Bill " +index.Bill+ " Success.");
      const L=new Noti("Check Bill " +index.Bill+ " Success.")
      this.itemService.listnoti.unshift(L);
       this.N = 4;
       this.itemService.numnoti.numberlist++;
       let dateRange: NumNoti ={numberlist:this.N}
       this.itemService.updateListFn(dateRange);
      //  this.cookieService.delete('bill');
      //  this.itemService.getid();
       this.showtable();
         this.ngOnInit();
       
         
      }

    })



  }
  showNotificationcheckbill(text) {
    $.notify({
      icon: "notifications",
      message: text

    }, {
        type: 'success',
        timer: 3000,
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
  hidemodel() {
    //console.log("hide");
    this.modalRef.hide();
    //this.modalService.hide(1);
  }
  
  openModalWithClass(template: TemplateRef<any>, index: Bill) {
    //console.log("index--",index);
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.bill=index.Bill;
  
    const obj = this.http.get('http://localhost/project/billindex.php?bill='+this.bill)

    obj.subscribe({
      next: (response: any[]) => {
        this.indexpost = response.slice(0, 100).map((res) => {
          //console.log(res);
          return new Detailbill(res.Bill, res.Id_product,res.Name_product,res.Unit,res.Price,res.Date)
        })
        this.indexcollectionSize = this.indexpost.length;
       
      }
    })
   
  }
}
