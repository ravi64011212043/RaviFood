import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Convert as cartCvt, Cart } from 'src/app/model/cart.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Convert as foodCvt, Food } from 'src/app/model/food.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  carts = Array<Cart>();
  foods = Array<Food>();
  CID = localStorage.getItem('CID');
  OID = localStorage.getItem('OID');
  count = 1;
  constructor(private apiService : ApiService, private http : HttpClient, private router : Router){
  }

  ngOnInit(): void {
      setInterval(() => {
        this.http.get(this.apiService.apiEndpoint + "/cart/" + this.CID).subscribe((data : any) => {
          this.carts = cartCvt.toCart(JSON.stringify(data));
        });
      }, 500);
  }

  removeFoodInCart(cartID : number){
    this.http.delete(this.apiService.apiEndpoint + "/cart/" + cartID).subscribe(
      res => {
        console.log(res);
        console.log("ลบสำเร็จ");
      },
      error => {
        console.log(error);
        console.log("เกิดข้อผิดพลาดในการลบสินค้า");
      }
    );
  }

  inc(cartID : number, index : number) {
    let jsonObj = {
      amount : this.carts[index].amount + 1
    }
    let jsonString = JSON.stringify(jsonObj);
    this.http.put(this.apiService.apiEndpoint + "/cart/" + cartID, jsonString, {observe: 'response'}).subscribe((response) => {
      console.log(JSON.stringify(response.status));
    });
  }

  dec(cartID: number, index: number) {
    //จำนวนสินค้าในตะกร้ามากกว่า 1 ?
    if (this.carts[index].amount > 1) {
      let jsonObj = {
        amount : this.carts[index].amount - 1
      }
      let jsonString = JSON.stringify(jsonObj);
      this.http.put(this.apiService.apiEndpoint + "/cart/" + cartID, jsonString, {observe: 'response'}).subscribe((response) => {
        console.log(JSON.stringify(response.status));
      });
    }
  }

  deleteAllCart(){
    Swal.fire({
      title: 'คุณต้องการลบสินค้าทั้งหมดออกจากตะกร้า?',
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(this.apiService.apiEndpoint + "/cart/cid/" + this.CID).subscribe((response) => {
          console.log("ลบทั้งหมดแล้ว");
        });
        Swal.fire(
          'ลบสินค้าทั้งหมดแล้ว',
          '',
          'success'
        )
      }
    })
  }

  // getTotalPrice() {
  //   let totalPrice = 0;
  //   for (let cart of this.carts) {
  //     totalPrice += cart.price * cart.amount;
  //   }
  //   return totalPrice.toFixed(2);
  // }

  getTotalPriceFormattedID(price : number, amount : number) {
    let totalPrice = 0;
    totalPrice = price * amount;
    return '฿' + totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
 }

 getTotalPriceFormatted() {
   let totalPrice = 0;
   for (let cart of this.carts) {
     totalPrice += cart.price * cart.amount;
   }
   return '฿' + totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
 }

 getTotalPrice() {
  let totalPrice = 0;
  for (let cart of this.carts) {
    totalPrice += cart.price * cart.amount;
  }
  return totalPrice.toFixed(2);
 }

 submitOrder() {
   let orderData = {
    status : 1,
    CID : this.CID,
    total_price : this.getTotalPrice(),
    cart : this.carts
   }
  let jsonString = JSON.stringify(orderData);
  console.log(orderData);
  Swal.fire({
    title: 'ยืนยันชำระเงินจำนวน ' + this.getTotalPriceFormatted() + " หรือไม่",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'ตกลง',
    cancelButtonText: 'ยกเลิก',
  }).then((result) => {
    if (result.isConfirmed) {
      this.http.post(this.apiService.apiEndpoint + "/order", jsonString, {observe: 'response'}).subscribe((response) => {
        if(response.status === 200){
            this.http.delete(this.apiService.apiEndpoint + "/cart/cid/" + this.CID).subscribe((response) => {
                console.log("ลบทั้งหมดแล้ว");
            });
          }
        });
          Swal.fire({
            title: 'ชำระเงินสำเร็จ !!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            timer : 1000
          }).then(() => {
            this.router.navigate(['/purchase']);
          });
      }
    });
  }
}
