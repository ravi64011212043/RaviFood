import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Convert as order_detailCvt, OrderDetail } from 'src/app/model/order_detail.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  order_details = Array<OrderDetail>();
  constructor(private http : HttpClient,private apiService : ApiService ,public dialogRef : MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data : any) {

    this.http.get(this.apiService.apiEndpoint + "/order_detail/" + data.order_customer.OID).subscribe((data : any) => {
      this.order_details = order_detailCvt.toOrderDetail(JSON.stringify(data));
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
}
