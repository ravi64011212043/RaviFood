import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    constructor(private apiService : ApiService, private router : Router, private http : HttpClient){

    }

    onSubmit(firstname: string = '', lastname: string = '', address: string = '', phone: string = '', username: string = '', password: string = '') {
      let jsonObj = {
        firstname : firstname,
        lastname : lastname,
        phone : phone,
        address : address,
        username : username,
        password : password
      };
      let jsonString = JSON.stringify(jsonObj);

      this.http.post(this.apiService.apiEndpoint + "/register", jsonString, {observe: 'response'}).subscribe((response: any) => {
        if(response.status === 201){

            Swal.fire({
              title: 'Register Success',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              this.router.navigate(['/login']);
            });
          }
          else{
            Swal.fire({
              title: 'Register Failed !!',
              icon: 'error',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            });
          }
        });
    }
}
