import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Convert as orderCvt, Order } from 'src/app/model/order.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderComponent } from '../order/order.component';
import { Convert as total_priceCvt, TotalPrice } from 'src/app/model/total_price.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent{
  orders = Array<Order>();
  totals = Array<TotalPrice>();

 status1 : any;
 status2 : any;
 status3 : any;
 total : number = 0;

  OPID = localStorage.getItem('OPID');

  constructor(private apiService : ApiService, private http : HttpClient, private router : Router, private dialog : MatDialog){

    if(!this.OPID){
      this.router.navigate(['/home']);
    }

    this.http.get(this.apiService.apiEndpoint + "/order/total/total_price").subscribe((data : any) => {
      this.totals = total_priceCvt.toTotalPrice(JSON.stringify(data));
      console.log(this.totals);
      this.total = this.totals.reduce((sum, total) => sum + total.total_price, 0);

    });


    this.http.get(this.apiService.apiEndpoint + "/order").subscribe((data : any) => {
      this.orders = orderCvt.toOrder(JSON.stringify(data));
    });

    this.http.get(this.apiService.apiEndpoint + "/order/1" ).subscribe((data : any) => {
      this.orders = orderCvt.toOrder(JSON.stringify(data));
      this.status1 = this.orders.length;
    });

    this.http.get(this.apiService.apiEndpoint + "/order/2" ).subscribe((data : any) => {
      this.orders = orderCvt.toOrder(JSON.stringify(data));
      this.status2 = this.orders.length;
    });

    this.http.get(this.apiService.apiEndpoint + "/order/3" ).subscribe((data : any) => {
      this.orders = orderCvt.toOrder(JSON.stringify(data));
      this.status3 = this.orders.length;
    });
  }

  modal(order : Order){
    // console.log(order);
    let new_status
    if(order.name === 'ยังไม่จัดส่ง'){
       new_status = 1;
    }
    else if(order.name === 'กำลังจัดส่ง'){
       new_status = 2;
    }
    else{
      new_status = 3;
    }

    this.dialog.open(OrderComponent, {
      minWidth: '1000px',
      minHeight: '700px',
      data : {order : order,
              status_order : new_status}
    });
  }

  logout(){
    localStorage.removeItem('OPID');
    this.router.navigate(['/login']);
  }

  status(status : number = 0){
    if(status === 0){
      this.http.get(this.apiService.apiEndpoint + "/order").subscribe((data : any) => {
        this.orders = orderCvt.toOrder(JSON.stringify(data));
      });
    }
    else{
      this.http.get(this.apiService.apiEndpoint + "/order/" + status).subscribe((data : any) => {
        this.orders = orderCvt.toOrder(JSON.stringify(data));
      });
    }
  }

  getTotalPriceFormatted() {
    return '฿' + this.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
}
