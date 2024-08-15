import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Convert as typeCvt, Type } from 'src/app/model/type.model';
import { Convert as cartCvt, Cart } from 'src/app/model/cart.model';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  CID = localStorage.getItem('CID');
  types = Array<Type>();
  carts = Array<Cart>();

  name : any;
  navbarToggler : any;
  mainNavigation : any;
  dropdownMenu : any;
  menuLink : any;
  isMenuDropdownOpen : any;
  isAccountDropdownOpen : any;
  isLoggedIn: boolean = false; // เพิ่มตัวแปร isLoggedIn และกำหนดค่าเริ่มต้นเป็น false
  isActiveHome = false; // เอาไว้ใส่คลาส text-active กรณี ถ้าอยู่หน้า home
  isActiveAbout = false; // เอาไว้ใส่คลาส text-active กรณี ถ้าอยู่หน้า about
  isActiveMenu = false; // เอาไว้ใส่คลาส text-active กรณี ถ้าอยู่หน้า menu

  constructor(private apiService : ApiService, private http : HttpClient, private router : Router){

    http.get(apiService.apiEndpoint + "/type").subscribe((data : any) => {
      this.types = typeCvt.toType(JSON.stringify(data));
      // console.log(this.types);
    });

    setInterval(() => {
      http.get(apiService.apiEndpoint + "/cart/" + this.CID).subscribe((data : any) => {
        this.carts =cartCvt.toCart(JSON.stringify(data));
      });
    }, 500);

    // http.get(apiService.apiEndpoint + "/cart/" + this.CID).subscribe((data : any) => {
    //   this.carts =cartCvt.toCart(JSON.stringify(data));
    //   this.cartLength = this.carts.length;
    //   // console.log(this.types);
    // });

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
    // ตรวจสอบค่าของ localStorage เพื่อตั้งค่าตัวแปร isLoggedIn
    if (localStorage.getItem('CID')) {
      this.isLoggedIn = true;
    }

    this.name = [
      'menu',
      'menu/snack',
      'menu/dessert',
      'menu/drink'
    ];
  }

  ngOnInit(): void {
    this.navbarToggler = document.querySelector('.navbar-toggler');
    this.mainNavigation = document.querySelector('#main-navigation');
    this.dropdownMenu = document.querySelector('.dropdown-menu');
    this.menuLink = document.querySelector('.dropdown-toggle');
    this.isMenuDropdownOpen = false;
    this.isAccountDropdownOpen = false;

    this.navbarToggler.addEventListener('click',() => {
    //  this.navbarToggler.classList.toggle('text-active');
     this.mainNavigation.classList.toggle('show-nav');
    });
 }

  toggleMenuDropdown() {
    this.isMenuDropdownOpen = !this.isMenuDropdownOpen;
  }

  toggleAccountDropdown() {
    this.isAccountDropdownOpen = !this.isAccountDropdownOpen;
  }

  closeDropdown() {
    this.isMenuDropdownOpen = false;
    this.isAccountDropdownOpen = false;
  }

  logout(){
    localStorage.removeItem('CID');
    // localStorage.removeItem('OID');
    this.router.navigate(['/login']);
  }
}
