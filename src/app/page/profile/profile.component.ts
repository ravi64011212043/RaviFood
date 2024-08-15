import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Convert as customerCvt , Customer} from 'src/app/model/customer.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  customers = Array<Customer>();
  firstname : any;
  lastname : any;
  address : any;
  phone : any;
  CID = localStorage.getItem('CID');
  constructor(private http : HttpClient, private apiService : ApiService){
      this.http.get(this.apiService.apiEndpoint + "/customer/" + this.CID).subscribe((data : any) => {
          this.customers = customerCvt.toCustomer(JSON.stringify(data));
          // console.log(this.customers);
          this.firstname = this.customers[0].firstname;
          this.lastname = this.customers[0].lastname;
          this.address = this.customers[0].address;
          this.phone =  "0" + this.customers[0].phone;
      });
  }

  onSubmit() {
    const addressElement = document.getElementById('address') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const address = addressElement.value;
    const phone = phoneElement.value;

    // console.log(address);
    // console.log(phone);
    let customerData = {
      address : address,
      phone : phone
    }
    let jsonString = JSON.stringify(customerData);

    Swal.fire({
      title: 'คุณต้องการแก้ไขข้อมูลส่วนตัว?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.put(this.apiService.apiEndpoint + "/customer/" + this.CID, jsonString, {observe: 'response'}).subscribe((response) => {
          if(response.status === 200){
            Swal.fire({
              title: 'แก้ไขข้อมูลสำเร็จ !!',
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            });
          }
          else{
            Swal.fire({
              title: 'แก้ไขข้อมูลไม่สำเร็จ !!',
              icon: 'error',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            });
          }

        });
        console.log('ตกลง');
      } else {

        console.log('ยกเลิก');
      }
    });
  }
}
