import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isActiveHome = false; // เอาไว้ใส่คลาส text-active กรณี ถ้าอยู่หน้า home
  isActiveAbout = false; // เอาไว้ใส่คลาส text-active กรณี ถ้าอยู่หน้า about
  isActiveMenu = false; // เอาไว้ใส่คลาส text-active กรณี ถ้าอยู่หน้า menu
  constructor(private router : Router){
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
          if(event.url === '/home'){
            this.isActiveHome = true;
            this.isActiveAbout = false;
            this.isActiveMenu = false;
          }
          else if(event.url === '/about'){
            this.isActiveHome = false;
            this.isActiveAbout = true;
            this.isActiveMenu = false;
          }
          else if(event.url === '/menu' || event.url === '/menu/snack' || event.url === '/menu/dessert' || event.url === '/menu/drink'){
            this.isActiveHome = false;
            this.isActiveAbout = false;
            this.isActiveMenu = true;
          }
          else{
            this.isActiveHome = false;
            this.isActiveAbout = false;
            this.isActiveMenu = false;
          }
      }
    });
  }
}
