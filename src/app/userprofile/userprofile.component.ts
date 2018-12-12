import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '../users.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';

declare var $: any;
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class UserprofileComponent implements OnInit {
  mode = new FormControl('over');
  cart;
  codedata;
  constructor(private user : UsersService) { }

  ngOnInit() {
    this.user.getDatacart().subscribe((data :any) => { console.log(data);this.cart = data; });
    this.codedata={
      code:'',
      explaintion:'',
      ex_date:'',
      chatr:'',
    }
  }

  sendcode(){
    console.log(this.codedata)
    this.user.sendcode(this.codedata).subscribe(data => console.log(data));
  }


}
