import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Convert as orderCvt, Order } from 'src/app/model/order.model';
import { ApiService } from 'src/app/service/api.service';
import { Convert as order_customerCvt, OrderCustomer} from 'src/app/model/order_customer.model';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Convert as statusCvt, Status } from 'src/app/model/status.model';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent {
  orders_customer = Array<OrderCustomer>();
  orders = Array<Order>();
  statuss = Array<Status>();
  CID = localStorage.getItem('CID');
  constructor(private apiService : ApiService, private http : HttpClient, private dialog : MatDialog){

    this.http.get(this.apiService.apiEndpoint + "/status").subscribe((data : any) => {
      this.statuss = statusCvt.toStatus(JSON.stringify(data));
    });

    this.http.get(this.apiService.apiEndpoint + "/order/CID/" + this.CID).subscribe((data : any) => {
      this.orders_customer = order_customerCvt.toOrderCustomer(JSON.stringify(data));
    });
  }

  modal(order_customer : OrderCustomer){
    console.log(order_customer.OID);

    this.dialog.open(ModalComponent, {
      minWidth: '1000px',
      minHeight: '700px',
      data : {order_customer : order_customer}
    });
  }

  getTotalPriceFormatted(totalPrice : number) {
    return '฿' + totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  loadStatus(status : number = 0){
    if(status === 0){
      this.http.get(this.apiService.apiEndpoint + "/order/CID/" + this.CID).subscribe((data : any) => {
        this.orders_customer = order_customerCvt.toOrderCustomer(JSON.stringify(data));
      });
    }
    else{
      this.http.get(this.apiService.apiEndpoint + "/order/CID/" + this.CID + "/" + status).subscribe((data : any) => {
        this.orders_customer = order_customerCvt.toOrderCustomer(JSON.stringify(data));
      });
    }
  }
}
