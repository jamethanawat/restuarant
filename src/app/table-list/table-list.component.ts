import { Component, OnInit, TemplateRef, EventEmitter} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Product } from 'app/product';
import { Http } from '@angular/http';
import Swal from 'sweetalert2'
import { CallnotiService } from 'app/callnoti.service';

import { ResourceLoader } from '@angular/compiler';
import { NumNoti } from 'app/num-noti';
import { Noti } from 'app/noti';
import { CookieService } from 'ngx-cookie-service';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';
import { CallidService } from 'app/callid.service';
import { Notibill } from 'app/notibill';
import { Numnotimenu } from 'app/numnotimenu';



declare var $: any;
interface Country {
  id?: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}
const allproduct: Product[] = []
const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  }
];


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  
check=0;
  user:string;
  checkadmin = 1;
  modalRef: BsModalRef;
  id:number;
  N: number;
 N0:number;
  playerName: string;
  page = 1;
  pageSize = 10;
  search = "";
  vpost: Product[] = [];
  imashow: string;
  productidshow: number;
  nameshow: string;
  priceshow: number;
  typeshow: string;
  type_spshow: string;
  spreedshow: number;
  collectionSize =18;
  CVname = 0;
  CVsp = 0
  CVtys = 0;
  CVprice = 0;
  CVty = 0;
  CVim = 0;

  //collectionSize = COUNTRIES.length;


  //get countries(): Country[] {
  //  if (this.search == "") {
  //  return COUNTRIES
  //  .map((country, i) => ({ id: i + 1, ...country }))
  //  .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  // } else {
  //   return COUNTRIES
  //    .filter((item) => item.name.toLowerCase().includes(this.search.toLowerCase()));
  // }

  // }


  checkname() {

    if (this.CVname == 0) {
      return false;
    }
    else {
      return true;
    }
  }
  checkspreed() {

    if (this.CVsp == 0) {
      return false;
    }
    else {
      return true;
    }
  }
  checktys() {

    if (this.CVtys == 0) {
      return false;
    }
    else {
      return true;
    }
  }
  checkprice() {
    if (this.CVprice == 0) {
      return false;
    }
    else {
      return true;
    }
  }
  checkty() {
    if (this.CVty == 0) {
      return false;
    }
    else {
      return true;
    }
  }
  checkim() {
    if (this.CVim == 0) {
      return false;
    }
    else {
      return true;
    }
  }
  onSubmitinsert(event: any) {


    const name = event.target.name.value;
    const spreed = event.target.spreed.value;
    const tys = event.target.tys.value;
    const price = event.target.price.value;
    const ty = event.target.ty.value;
    const im = event.target.im.value;
    var checkall = 0;
    this.CVname = 0;
    this.CVsp = 0
    this.CVtys = 0;
    this.CVprice = 0;
    this.CVty = 0;
    this.CVim = 0;
    if (name == "") {
      this.CVname = 1;
      checkall++;
    }
    if (spreed == "") {
      this.CVsp = 1;
      checkall++;
    }
    if (tys == "") {

      this.CVtys = 1;
      checkall++;
    }
    if (price == "") {
      this.CVprice = 1;
      checkall++;
    }
    if (ty == "") {
      this.CVty = 1;
      checkall++;
    }
    if (im == "") {
      this.CVim = 1;
      checkall++;
    }
    if (checkall == 0) {
      const obj = this.http2.get('http://localhost/project/insert.php?name=' + name + '&sp=' + spreed + '&tys=' + tys + '&price=' + price + '&ty=' + ty + '&im=' + im)
      obj.subscribe({
        next: (response: any) => {
          console.log(response);
        }
      })
      setTimeout(function () {
        this.ngOnInit();
        //location.reload();
        this.showtable();

      }.bind(this), 200);
      // this.ngOnInit();
     //this.showtable();
      event.target.name.value = "";
      event.target.spreed.value = "";
      event.target.tys.value = "";
      event.target.price.value = "";
      event.target.ty.value = "";
      event.target.im.value = "";
      Swal.fire(
        'Insert Success',
        'You Insert menu to Website',
        'success'
      )
      this.showNotificationnew("Insert menu " +name +" to Website Success.");
      //this.ngOnInit();

      const L = new Noti("Insert menu " +name +" to website")
      this.itemService.listnoti.unshift(L);

      this.N = 4;
      this.itemService.numnoti.numberlist++;
      let dateRange: NumNoti = { numberlist: this.N }
      this.itemService.updateListFn(dateRange);
    }
    else {
      console.log("elseeee");

    }
  }

  onSubmitedit(event: any) {
    //console.log("ID=>", this.productidshow);

    const name = event.target.name.value;
    const spreed = event.target.spreed.value;
    const tys = event.target.tys.value;
    const price = event.target.price.value;
    const ty = event.target.ty.value;
    const im = event.target.im.value;
    var checkall = 0;
    this.CVname = 0;
    this.CVsp = 0
    this.CVtys = 0;
    this.CVprice = 0;
    this.CVty = 0;
    this.CVim = 0;
    if (name == "") {
      this.CVname = 1;
      checkall++;
    }
    if (spreed == "") {
      this.CVsp = 1;
      checkall++;
    }
    if (tys == "") {

      this.CVtys = 1;
      checkall++;
    }
    if (price == "") {
      this.CVprice = 1;
      checkall++;
    }
    if (ty == "") {
      this.CVty = 1;
      checkall++;
    }
    if (im == "") {
      this.CVim = 1;
      checkall++;
    }
    if (checkall == 0) {
      const obj = this.http2.get('http://localhost/project/update.php?id=' + this.productidshow + '&name=' + name + '&sp=' + spreed + '&tys=' + tys + '&price=' + price + '&ty=' + ty + '&im=' + im)
      obj.subscribe({
        next: (response: any) => {
          console.log(response);
        }
      })

      // event.target.name.value = "";
      // event.target.spreed.value="";
      // event.target.tys.value="";
      // event.target.price.value="";
      // event.target.ty.value="";
      // event.target.im.value="";
      Swal.fire(
        'Edit Success',
        'You Edit Menu In Website',
        'success'
      )
      this.nameshow = event.target.name.value;
      this.priceshow = event.target.price.value;
      this.modalRef.hide();
      setTimeout(function () {
        this.ngOnInit();
        //location.reload();
        this.showtable();

      }.bind(this), 200);
      // this.ngOnInit();
      // //location.reload();
      // this.showtable();
      this.showNotificationnew("Edit Menu "+name + " Success.");
      const L = new Noti("Edit Menu "+name );
      this.itemService.listnoti.unshift(L);
      this.N = 4;
      this.itemService.numnoti.numberlist++;
      let dateRange: NumNoti = { numberlist: this.N }
      this.itemService.updateListFn(dateRange);
    }
    else {
      console.log("edit");
      console.log("elseeee");

    }
  }
  ngAfterViewInit() {
    // console.log(this.myDiv.nativeElement.innerHTML);
    // setTimeout(() => {
    //   console.log(this.myDiv.nativeElement.innerText);
    // }, 3000);
}

 

  onKey(event: any) { // without type info
    //console.log(event.target.value);
    this.search = event.target.value;


  }

  onClick(index: Country) {
    // console.log(index);
    // const a = index.name;
    // console.log(a);

  }



  deleterow() {
    //console.log("indelete");
    //console.log("indelete",this.nameshow);
    //console.log("ID=>", this.productidshow);
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
        const obj = this.http2.get('http://localhost/project/delete.php?id=' + this.productidshow)
        obj.subscribe({
          next: (response: any) => {
            console.log(response);
          }
        })
        setTimeout(function () {
          this.ngOnInit();
          //location.reload();
          this.showtable();

        }.bind(this), 200);
        // this.ngOnInit();
        // //location.reload();
        // this.showtable();
        this.modalRef.hide();
        this.hidemodel();
        
        this.showNotificationnew("Delete Menu "+this.nameshow+" Success.");
      const L=new Noti("Delete Menu "+this.nameshow);
      this.itemService.listnoti.unshift(L);
       this.N = 4;
       this.itemService.numnoti.numberlist++;
       let dateRange: NumNoti ={numberlist:this.N}
       this.itemService.updateListFn(dateRange);
      }

    })

  }
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private http: HttpClient,
    private http2: Http,
    private itemService: CallnotiService,
    private cookieService: CookieService ,
    private billnoti: CallidService,
  ) { }
  ngOnInit() {
    //console.log(this.billnoti.notibill);
 
    //this.cookieService.delete('bill');
    //this.itemService.getid();
    //console.log("ddd",this.cookieService.get('bill')); 
     
    // const uid: number = new Date().getTime();
    // console.log(uid);
    // this.cookieService.set( 'Test', 'Hello World' );
    
    // this.itemService.listnoti.list=this.itemService.listnoti.list+",test";
    // var text=    this.itemService.listnoti.list;
    // var splitted=  text.split(",");
    // console.log(splitted);
    // console.log(this.itemService.listnoti);

    //console.log(this.itemService.noti.numberlist);
    //console.log(Product);


   this.showtable();

  }
  showtable() {
    //console.log("showtable");
    const obj = this.http.get('http://localhost/project/view.php')

    obj.subscribe({
      next: (response: any[]) => {
        this.vpost = response.slice(0, 100).map((res) => {
          //console.log("res>>>>>>",res);
          return new Product(res.Product_id, res.Name, res.Spreed, res.Type_s, res.Price, res.Type, res.Images)

        })

       // console.log(this.vpost)
      //  var f= new Product( null,"" , null, "",null , "", "");
      //  this.vpost.push(f);
        this.collectionSize = this.vpost.length;
        //console.log("showtable",this.collectionSize);
      }
    })
  }
  selectmenu(){
    
  
 
    console.log("nameshow",this.nameshow);
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to buy this "+this.nameshow,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Buy it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Buy!',
          'You have already purchased',
          'success'
        )
        const obj = this.http2.post('http://localhost/project/buyitem.php?bill='+this.cookieService.get('bill')+'&id=' + this.productidshow + '&name=' + this.nameshow +'&price=' + this.priceshow + '&user=' +this.cookieService.get('user'),1 )
        obj.subscribe({
          next: (response: any) => {
            console.log(response);
          }
        })
     
       
        this.ngOnInit();
        //location.reload();
        
        this.modalRef.hide();
        this.hidemodel();

         const d=new Notibill(this.nameshow,this.priceshow);
        this.billnoti.notibill.unshift(d);
        this.N0 = 4;

        let dateRange0: Numnotimenu ={numberlist:5};
        this.itemService.updateListFnmenu(dateRange0);
        //console.log("--------");

        this.showNotificationnew("Buy Menu " +this.nameshow + " Success .");
      const L=new Noti("Buy Menu " +this.nameshow );
      this.itemService.listnoti.unshift(L);
       this.N = 4;
       this.itemService.numnoti.numberlist++;

       let dateRange: NumNoti ={numberlist:this.N};
       this.itemService.updateListFn(dateRange);
      }

    })
  }

  hidemodel() {
    //console.log("hide");
    this.modalRef.hide();
    this.modalService.hide(1);
  }


  openModalWithClass(template: TemplateRef<any>, index: Product) {
    console.log("INDEX=>", index);
    console.log("Bill",this.cookieService.get('bill')); 
    // console.log("user",this.cookieService.get('user'));
   // console.log("test=",this.cookieService.get('test'));
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.imashow = index.Images;
    this.nameshow = index.Name;
    this.priceshow = index.Price;
    this.productidshow = index.Product_id;
    this.type_spshow = index.Type_s;
    this.typeshow = index.Type;
    this.spreedshow = index.Spreed;
   // console.log("ID=>", this.productidshow);
  }
  openModalWithClassinsert(template: TemplateRef<any>) {
    this.CVname = 0;
    this.CVsp = 0
    this.CVtys = 0;
    this.CVprice = 0;
    this.CVty = 0;
    this.CVim = 0;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    console.log("modelinsert");

  }
  openModalWithClassedit(template: TemplateRef<any>) {
    this.CVname = 0;
    this.CVsp = 0
    this.CVtys = 0;
    this.CVprice = 0;
    this.CVty = 0;
    this.CVim = 0;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    console.log("modeledit");

  }
  showNotification(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "notifications",
      message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

    }, {
        type: type[color],
        timer: 3000,
        placement: {
          from: from,
          align: align
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
  showNotificationnew(text) {
    $.notify({
      icon: "notifications",
      message: text

    }, {
        type: 'success',
        timer: 1500,
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
  get countries(): Product[] {
    if (this.search == "") {
  // console.log("yyyy",this.check++);
      return this.vpost
        .map((country, i) => ({ id: i + 1, ...country }))
      
           .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      
       
    } else {
      return this.vpost
        .filter((item) => item.Name.toLowerCase().includes(this.search.toLowerCase())
        );

    }

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
}
