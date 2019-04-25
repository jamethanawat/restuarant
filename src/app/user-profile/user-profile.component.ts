import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CallnotiService } from 'app/callnoti.service';
import { Http } from '@angular/http';
import Swal from 'sweetalert2';
import { NumNoti } from 'app/num-noti';
import { Noti } from 'app/noti';
declare var $: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  nameshow:string;
  lastnameshow:string;
  emailshow:string;
  phoneshow:string;
  usernameshow:string;
  pass1show:string;
  pass2show:string;
  CVname = 0;
  CVlastname = 0
  CVemail = 0;
  CVtelephone = 0;
  CVuser = 0;
  CVpass1 = 0;
  CVpass2 = 0;
  CVmatch = 0;
  
  constructor(
    private http: HttpClient,
    private http2: Http,
    private cookieService: CookieService,
    private itemService: CallnotiService,
  ) { }

  ngOnInit() {
    this.itemService.updateListsObsuser.subscribe(
      (response) => {

           this.ngOnInit();
             
      }
      
  )

if(this.cookieService.get('user')!='user' ){
    const obj = this.http.get('http://localhost/project/user.php?user='+this.cookieService.get('username'))

    obj.subscribe({
      next: (response: any[]) => {
         response.map((res) => {
          console.log(res);
          this.nameshow=res.Name;
          this.lastnameshow=res.lastname;
          this.emailshow=res.email;
          this.phoneshow=res.Telephone;
          this.usernameshow=res.username;
          this.pass1show=res.password;
          this.pass2show=res.password;
       

        })
        
       // console.log("showtable",this.collectionSize);
      }
    })
     }
     else{
       this.nameshow="";
       this.lastnameshow="";
       this.emailshow="";
       this.phoneshow="";
       this.usernameshow="";
       this.pass1show="";
       this.pass2show="";
     }
  }
  onSubmitupdate(event: any){
    if(this.cookieService.get('user')!='user'){
      const name = event.target.name.value;
        const lastname = event.target.lastname.value;
        const email = event.target.email.value;
        const telephone = event.target.phone.value;
        const username = event.target.username.value;
        const password1 = event.target.pass1.value;
        const password2 = event.target.pass2.value;
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
          //console.log("insert");
          const obj = this.http2.post('http://localhost/project/updateuser.php?id=' + this.cookieService.get('username')+'&name='+name + '&lastname=' + lastname + '&email=' + email + '&phone=' + telephone + '&user=' + username + '&pass=' + password1, 1)
          obj.subscribe({
              next: (response: any) => {
               // console.log("1");
                  console.log(response);
              }
          })
          const obj2 = this.http2.post('http://localhost/project/updateuserinbill.php?id='+this.cookieService.get('user')+'&name=' + name, 1)
          obj2.subscribe({
              next: (response: any) => {
              //  console.log("2");
                   console.log(response);
              }
          })
          Swal.fire(
              'Update',
              'Update Profile Success',
              'success'
          )
          this.cookieService.set('user', name.toString() );
          this.cookieService.set('username', username.toString());
          console.log("username",this.cookieService.get('username'));
          console.log("user",this.cookieService.get('user'));

          this.showNotificationnew("Update Profile Success");
          const L=new Noti("Update Profile Success");
          this.itemService.listnoti.unshift(L);
           var N=4 
           this.itemService.numnoti.numberlist++;
           let dateRange: NumNoti ={numberlist:N}
           this.itemService.updateListFn(dateRange);
          // event.target.name.value = "";
          // event.target.lastname.value = "";
          // event.target.email.value = "";
          // event.target.phone.value = "";
          // event.target.username.value = "";
          // event.target.pass1.value = "";
          // event.target.pass2.value = "";
       
      }
    }

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
showNotificationnew(text) {
  $.notify({
    icon: "notifications",
    message: text

  }, {
      type: 'success',
      timer: 4000,
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
