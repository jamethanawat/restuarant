import { Injectable, Output, EventEmitter, Optional } from '@angular/core';
import { Noti } from './noti';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject, Observable } from 'rxjs';
import { NumNoti } from './num-noti';
import { HttpClient } from '@angular/common/http';

import { idLocale } from 'ngx-bootstrap';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';
import { CookieService } from 'ngx-cookie-service';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Numnotimenu } from './numnotimenu';




@Injectable({
  providedIn: 'root'
})

export class CallnotiService {
 

  // options: 
  // { noti: number
  // };
  vpost:Optional;
  listnoti: Noti[]=[];
  numnoti:NumNoti;
  numnotimenu:Numnotimenu;
  
  constructor(
    private http: HttpClient,
    private cookieService: CookieService ,
      
  ) {
    this.listnoti .push(new Noti("Wellcom to ABC-Restaurant"));
 
    this.numnoti=new NumNoti(1);

  }
 
  private updateLists = new Subject<NumNoti>();
  updateListsObs = <Observable<NumNoti>>this.updateLists;
  
  updateListFn(_dateRange: NumNoti) {
    this.updateLists.next(_dateRange);
  }
  
  private updateListsmenu = new Subject<Numnotimenu>();
  updateListsObsmenu = <Observable<Numnotimenu>>this.updateListsmenu;
  
  updateListFnmenu(_dateRange0: Numnotimenu) {
    this.updateListsmenu.next(_dateRange0);
  }


  private updateListsuser = new Subject<number>();
  updateListsObsuser = <Observable<number>>this.updateListsuser;
  updateuser(_dateRange: number) {
    this.updateListsuser.next(_dateRange);
  }
 
  getbill(){
   
    // console.log(this.cookieService.get('user'));
    this.cookieService.delete('bill');
    if(this.cookieService.get('user')=="user"){
      console.log("dont member getbill");
      const r=Math.floor(Math.random() * 99999999);
       this.cookieService.set('bill', r.toString() );
    }
    else{
   console.log("else getbill");
  //     this.http.get('http://localhost/project/viewid.php?user='+this.cookieService.get('user')).subscribe((res)=>{
  //   //console.log("a",res);   
  //   console.log("click");
  //   //this.cookieService.delete('bill');
  //   if(res==null){
  //     console.log("/////null");
  //     const r=Math.floor(Math.random() * 9999999);
  //     this.cookieService.set('bill', r.toString() );
  //   }else{
  //     console.log("/////have");
  //     this.cookieService.set('bill', res.toString() );
  //   }
    
  //   });
  //  console.log("ddd",this.cookieService.get('bill'));
    var check=0;
    const obj = this.http.get('http://localhost/project/viewid.php?user='+this.cookieService.get('user'))
  
    obj.subscribe({
      next: (response: any[]) => {
        this.vpost = response.map((res) => {
        
          
          console.log("have bill");
            this.cookieService.set('bill', res.Bill.toString() );
            check++;
          
        //  console.log("check=",check);
          return new Option(res.Bill)

        })
   
      
      }

    })
    setTimeout(function() {
      if(check==0){
        console.log("dont have bill");
        const r=Math.floor(Math.random() * 99999999);
        this.cookieService.set('bill', r.toString() );
      }
        }.bind(this), 200);
   
    
  }
  // this.http.get('http://localhost/project/viewid.php?user='+this.cookieService.get('user')).subscribe((res)=>{
  //   //console.log("a",res);   
  //   console.log("click");
  //   //this.cookieService.delete('bill');
  //   if(res==null){
  //    // console.log("null");
  //     const r=Math.floor(Math.random() * 9999999);
  //     this.cookieService.set('bill', r.toString() );
  //   }else{
  //     this.cookieService.set('bill', res.toString() );
  //   }
    
  //   });
   // console.log("ddd",this.cookieService.get('bill'));
    
  }
  checkuser(user:string,password:string){
  


            const obj = this.http.get('http://localhost/project/checkuser.php?name='+user+'&pass='+password)

            obj.subscribe({
              next: (response: any[]) => {
                this.vpost = response.slice(0, 100).map((res) => {
                  //console.log("res>>>>>>",res.Name);
                  this.cookieService.set('user', res.Name.toString() );
                  this.cookieService.set('username', res.username.toString() );
                 // console.log("user=",this.cookieService.get('c'));
                  return new Option(res.Name)
        
                })
        
     
                
              }
            })
  }
}

