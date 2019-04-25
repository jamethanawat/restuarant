import { Component, OnInit, ElementRef, Input, HostListener, TemplateRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { Noti } from 'app/noti';
import { CallnotiService } from 'app/callnoti.service';
import { CookieService } from 'ngx-cookie-service';
import { CallidService } from 'app/callid.service';
import { Notibill } from 'app/notibill';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import Swal from 'sweetalert2'
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { NgControl } from '@angular/forms';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
    N=0;
    CVname = 0;
    CVlastname = 0
    CVemail = 0;
    CVtelephone = 0;
    CVuser = 0;
    CVpass1 = 0;
    CVpass2 = 0;
    CVmatch = 0;
    mode: string;
    icon:string;
    statuslogin: string;
    colorbutton: string;
    textheader: string;
    button: string;
    modalRef: BsModalRef;
    user: string;
    textuser: string;
    textpass: string;
    billnoti = 0;
    numbernoti: number;
    private listTitles: any[];
    splitted: string[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(location: Location, private element: ElementRef, private router: Router, private itemService: CallnotiService,
        private testservice: CallnotiService, private cookieService: CookieService,
        private notibill: CallidService, private modalService: BsModalService,
        private http2: Http, private http: HttpClient,


    ) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        setTimeout(function () {
            console.log("Bill1", this.cookieService.get('bill'));
            console.log("user1", this.cookieService.get('user'));
        }.bind(this), 200);

        // console.log("ppppp->" + this.itemService.numnoti.numberlist);

        //this.itemService.noti.numberlist--;
        //this.cookieService.set( 'user', 'Hello World' );
        this.numbernoti = this.itemService.numnoti.numberlist;

        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
        this.itemService.updateListsObs.subscribe(
            (response) => {
                this.numbernoti = this.itemService.numnoti.numberlist;
                // this.billnoti =this.itemService.numnoti.numberlist;
                // var text=    this.itemService.listnoti.list;
                // this.splitted=  text.split(",");
                // console.log("list=>");
                // console.log(this.itemService.listnoti);
                //  console.log("You will get date range in response which can be used to filter Car list in Component A ") 

            }
        )
        this.itemService.updateListsObsmenu.subscribe(
            (response) => {
                //console.log("Noti");
                //this.numbernoti = this.itemService.numnoti.numberlist;
                // this.billnoti =this.itemService.numnotimenu.numberlist;
                this.billnoti = this.billnoti + 1;
                // var text=    this.itemService.listnoti.list;
                // this.splitted=  text.split(",");
                // console.log("list=>",this.splitted);
                // console.log("Noti",this.billnoti);
                //  console.log("You will get date range in response which can be used to filter Car list in Component A ") 

            }
            
        )
      
    }
    get listNoti(): Noti[] {

        return this.itemService.listnoti;

    }

    submitform(event: any) {
        //console.log("00");

        if (this.statuslogin == "logout") {
            console.log("logout");
            location.reload();
        } else if (this.statuslogin == "login") {


            const user = event.target.Username.value;
            const password = event.target.password.value;
            this.itemService.checkuser(user, password);

            setTimeout(function () {
                // console.log('hide');
                // console.log("user=",this.cookieService.get('user'));

                if (this.cookieService.get('user') != "user") {
                    console.log("loging success");
                    Swal.fire(
                        'Login Success',
                        'Wellcome to Website : ' + this.cookieService.get('user'),
                        'success'
                    )
                    let dateRange =4;
                    this.itemService.updateuser(dateRange);

                    this.itemService.getbill();
                    this.modalRef.hide();
               
                } else if (this.cookieService.get('user') == "user") {
                    console.log("loging error");
                    Swal.fire(
                        'Error!',
                        'You entered do not match. Please try again',
                        'warning'
                    )
                    event.target.Username.value = "";
                    event.target.password.value = "";
                }

            }.bind(this), 200);

            setTimeout(function () {
                console.log("Bill", this.cookieService.get('bill'));
                console.log("user", this.cookieService.get('user'));
            }.bind(this), 600);
            //console.log(user,password);

            // this.http.get('http://localhost/project/checkuser.php?getuser='+user+'&getpass='+password).subscribe((res)=>{

            //     console.log(res);
            // const check=res.toString;
            // console.log("--",check.length);
            //     if(check.length==0){
            //       console.log("null");
            //      Swal.fire(
            //         'Error!',
            //         'You entered do not match. Please try again',
            //         'warning'
            //       )
            //       event.target.Username.value="";
            //       event.target.password.value="";
            //     }else{
            //      console.log(res);
            //      Swal.fire(
            //         'Good job!',
            //         'Wellcome to Website :'+res,
            //         'success'
            //       )
            //     }

            //     });
        }
    }
    get listNotibill(): Notibill[] {

        return this.notibill.notibill;

    }
    removenoti() {
        this.itemService.numnoti.numberlist = 0;
        //this.numbernoti = 0; 
        console.log("removenoti");
        this.ngOnInit();

    }
    removenotibill() {
        this.billnoti = 0;
        //this.numbernoti = 0; 
        console.log("removenoti");
        this.ngOnInit();

    }
    checknoti() {


        if (this.numbernoti == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    checknotibill() {


        if (this.billnoti == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    // get noti(): Noti[] {
    //     const search = this.form.get('search').value;
    //     if (!search) {
    //       return this.itemService.items;
    //     }
    //     return this.itemService
    //     .noti
    //     .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    //   }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        // var titlee = this.location.prepareExternalUrl(this.location.path());
        // if (titlee.charAt(0) === '#') {
        //     titlee = titlee.slice(2);
        // }
        // titlee = titlee.split('/').pop();

        // for (var item = 0; item < this.listTitles.length; item++) {
        //     if (this.listTitles[item].path === titlee) {
        //         return this.listTitles[item].title;
        //     }
        // }
        // return 'Dashboard';
        return 'User : ' + this.cookieService.get('user');
    }
    checkname() {

        if (this.CVname == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    checklastname() {

        if (this.CVlastname == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    checkemail() {

        if (this.CVemail == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    checktelephone() {

        if (this.CVtelephone == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    checkuser() {

        if (this.CVuser == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    checkpass1() {

        if (this.CVpass1 == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    checkpass2() {

        if (this.CVpass2 == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    checkpassmatch() {
        if (this.CVmatch == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    onSubmitinsert(event: any) {
        const name = event.target.name.value;
        const lastname = event.target.lastname.value;
        const email = event.target.email.value;
        const telephone = event.target.telephone.value;
        const username = event.target.username.value;
        const password1 = event.target.password.value;
        const password2 = event.target.cpassword.value;
        var checkall = 0;
        this.CVname = 0;
        this.CVlastname = 0
        this.CVemail = 0;
        this.CVtelephone = 0;
        this.CVuser = 0;
        this.CVpass1 = 0;
        this.CVpass2 = 0;
        this.CVmatch = 0;
        if (name == "") {
            this.CVname++;
            checkall++;
        }
        if (lastname == "") {
            this.CVlastname++;
            checkall++;
        }
        if (email == "") {
            this.CVemail++;
            checkall++;
        }
        if (telephone == "") {
            this.CVtelephone++;
            checkall++;
        }
        if (username == "") {
            this.CVuser++;
            checkall++;
        }
        if (password1 == "" || password1.length < 8) {
            this.CVpass1++;
            checkall++;
        }
        if (password2 == "" || password2.length < 8) {
            this.CVpass2++;
            checkall++;
        }
        if (password1 != password2) {
            this.CVmatch++;
            checkall++;
        }
        if (checkall == 0) {
            console.log("insert");
            const obj = this.http2.post('http://localhost/project/signup.php?name=' + name + '&lastname=' + lastname + '&email=' + email + '&phone=' + telephone + '&user=' + username + '&pass=' + password1, 1)
            obj.subscribe({
                next: (response: any) => {
                    // console.log(response);
                }
            })
            Swal.fire(
                'Sign Up Success',
                'Please Login Again',
                'success'
            )
            event.target.name.value = "";
            event.target.lastname.value = "";
            event.target.email.value = "";
            event.target.telephone.value = "";
            event.target.username.value = "";
            event.target.password.value = "";
            event.target.cpassword.value = "";
            this.modalRef.hide();
        }

    }
    checklogin() {
        if (this.cookieService.get('user') == "user") {
            this.button = "submit";
            this.textpass = "";
            this.textuser = "";
            this.textheader = "Sing in";
            this.colorbutton = "btn btn-primary";
            this.statuslogin = "login";
            this.mode = "true";
            this.icon="fa fa-sign-in";
        }
        else {
            this.textpass = "ffffffffff";
            this.textuser = this.cookieService.get('username');
            this.button = "logout";
            this.textheader = "logout";
            this.colorbutton = "btn btn-warning";
            this.statuslogin = "logout";
            this.mode = "true";
            this.icon="fa fa-sign-out";
        }

    }

    openModalsingup(template: TemplateRef<any>) {

        this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg' })
        );

    }
    openModal(template: TemplateRef<any>) {

        this.checklogin();
        this.modalRef = this.modalService.show(template);
    }

    hidemodel() {
        //console.log("hide");
        this.modalRef.hide();
        this.modalService.hide(1);
    }
}
