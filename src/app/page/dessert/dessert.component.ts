import { Component } from '@angular/core';
import { Convert as typeCvt, Type } from 'src/app/model/type.model';
import { Convert as foodCvt, Food } from 'src/app/model/food.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dessert',
  templateUrl: './dessert.component.html',
  styleUrls: ['./dessert.component.scss']
})
export class DessertComponent {
  types = Array<Type>();
  foods = Array<Food>();
  name : any;
  CID = localStorage.getItem('CID');
  quantities = Array<number>(this.foods.length).fill(1);

  constructor(private router : Router, private http : HttpClient, private apiService : ApiService){


    http.get(apiService.apiEndpoint + "/type").subscribe((data : any) => {
      this.types = typeCvt.toType(JSON.stringify(data));
      // console.log(this.types);
    });

    http.get(apiService.apiEndpoint + "/menu/ของหวาน").subscribe((data : any) => {
      this.foods = foodCvt.toFood(JSON.stringify(data));
      // console.log(this.foods);
      this.quantities = Array<number>(this.foods.length).fill(1);
    });

    this.name = [
      'menu',
      'menu/snack',
      'menu/dessert',
      'menu/drink'
    ];
  }

  addToCart(food : Food, index : number){
    if(!this.CID){
      this.router.navigate(['/login']);
    }
    else{
      //  console.log("อาหารที่ : ",index+1);
      //  console.log(" จำนวน : " , this.quantities[index]);
       let jsonObj = {
        FID : index+15,
        CID : this.CID,
        amount : this.quantities[index]
       };
       let jsonString = JSON.stringify(jsonObj);
       this.http.post(this.apiService.apiEndpoint + "/cart", jsonString, {observe: 'response'}).subscribe((response) => {
          console.log(JSON.stringify(response.status));
          console.log(response.body);
       });
    }
  }

  inc(index: number) {
    this.quantities[index]++;
  }

  dec(index: number) {
    if (this.quantities[index] > 1) {
      this.quantities[index]--;
    }
  }
}
