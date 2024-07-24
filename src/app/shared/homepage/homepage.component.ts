import { Component, ElementRef } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavContainer,MatSidenav,MatSidenavContent } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';
import {CookieService} from 'ngx-cookie-service';
import { userDetail,apiResponse } from '../../DTO/customObjects';
import { SharedServicesService } from '../shared-services.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatToolbar,MatSidenav,MatSidenavContainer,MatSidenavContent,MatNavList,MatIcon,RouterModule,MatMenuModule,MatMenuTrigger,MatButton],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  mobileQuery: MediaQueryList;
  jwtToken:string;
  user:userDetail;
  service:SharedServicesService;
  cookieService:CookieService;
  role:string|null;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private _cookieService:CookieService,
    private _service:SharedServicesService,private _authService:AuthService,private router:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.cookieService = _cookieService;
    this.jwtToken = _cookieService.get('Jwt'); 
    this.service = _service;
    this.service.getUser(this.jwtToken).subscribe((res : apiResponse<userDetail>) => {
      this.user = res.data;
    },(error:HttpErrorResponse)=>
    {
      console.log('user not found');
    }
    );

    this.role=this._authService.getRoleFromToken();
  }

  public LogOut()
  {
    this._service.logout();
    this.router.navigate(['/login']);
  }


}
