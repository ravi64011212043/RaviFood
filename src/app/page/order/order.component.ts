import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Convert as order_detailCvt, OrderDetail } from 'src/app/model/order_detail.model';
import { Convert as statusCvt, Status } from 'src/app/model/status.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  order_details = Array<OrderDetail>();
  statuss = Array<Status>();
  constructor(private http : HttpClient,private apiService : ApiService ,public dialogRef : MatDialogRef<OrderComponent>, @Inject(MAT_DIALOG_DATA) public data : any) {

    this.http.get(this.apiService.apiEndpoint + "/order_detail/" + data.order.OID).subscribe((data : any) => {
      this.order_details = order_detailCvt.toOrderDetail(JSON.stringify(data));
    });

    this.http.get(this.apiService.apiEndpoint + "/status").subscribe((data : any) => {
      this.statuss = statusCvt.toStatus(JSON.stringify(data));
    });

  }

  getTotalPriceFormatted(amount : number, total : number) {
    let totalPrice = total * amount;
    return '฿' + totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  totalPrice(){
      let totalPrice = 0;
      for(let order_detail of this.order_details){
          totalPrice += order_detail.price * order_detail.amount;
      }
      return '฿' + totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  statusPut(STID : number){
    // console.log(STID);
    // console.log(this.data.order.OID);

    let jsonObj = {
      status : STID
    }
    let jsonString = JSON.stringify(jsonObj);

    this.http.put(this.apiService.apiEndpoint + "/order_detail/" + this.data.order.OID, jsonString, {observe: 'response'}).subscribe((response) => {
        if(response.status === 200){
          console.log("อัปเดตสถานะสำเร็จ");
          location.reload();
        }
    });

  }

}

