import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private apiService : ApiService, private router: Router, private http : HttpClient) { }

  onClick(username: string = '', password: string = '') {
    let jsonObj = {
      username: username,
      password: password
    };
    let jsonString = JSON.stringify(jsonObj);

    this.http.post(this.apiService.apiEndpoint + "/login", jsonString, {observe: 'response'}).subscribe((response: any) => {
      if(response.status === 200){
        let userType = response.body.user_type;
        if(userType === 'customer'){
          localStorage.setItem('CID', response.body.CID);
          Swal.fire({
            title: 'Login Success',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.router.navigate(['/home']);
            localStorage.setItem('CID', response.body.CID);
          });
        }
        else if(userType === 'operator'){
          localStorage.setItem('OPID', response.body.OPID);
          Swal.fire({
            title: 'Login Success',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.router.navigate(['/admin']);
          });
        }
        else{
          Swal.fire({
            title: 'Login Failed !!',
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        }
      }
      else{
        // Show error message if login failed due to other reasons
        console.log(response);
        Swal.fire({
          title: 'Login Failed !!',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
