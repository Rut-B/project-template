import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import * as isLogin from '../auth.service';

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.scss']
})

export class NavComponentComponent implements OnInit {
  public login=isLogin.isLogin;
  @Input() text:string;
  @Input() url:string;
  @Input() image:string;
  constructor() { 
   
  }

  ngOnInit() {
    console.log(this.image)
  }
  /*btnClick() {
    this.router.navigate(['/user']);
  } */
}



