import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageService} from '../page.service';
import {Cities} from '../cities';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef, MatMenuTrigger} from "@angular/material";
import {LoginModalComponent} from '../login-modal/login-modal.component';
import {UsersService} from '../users.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {trigger} from '@angular/animations';
import {NONE_TYPE} from '@angular/compiler/src/output/output_ast';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [PageService,],
  entryComponents: [LoginModalComponent]
})
export class HeaderComponent implements OnInit {

  // countryForm: FormGroup;
  selectedcity;
  selected = 'none_city';
  public cities: Cities[] = [];
  public categories: any[] = [];
  is_more: string;
  countries = ['USA', 'Canada', 'Uk', 'kashan']
  searchTerm: FormControl = new FormControl();
  searched = <any>[];
  tagsSearched = <any>[];
  public all_chatrbazi;
  textValue;
  show_company_threshold = 5;
  @Output() cityevent = new EventEmitter<string>();
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private data: PageService, private dialog: MatDialog, private user: UsersService, private router: Router
    , private toastr: ToastrService) {
  }

  ngOnInit() {
    this.data.getcities().subscribe((data: any) => {
      this.cities = data.data;
    });
    this.data.getCategories().subscribe((data: any) => {
      this.categories = data.data;
      this.all_chatrbazi = data.all_chatrbazi
    });
    if (localStorage.getItem("userToken")) {
      this.user.logged().subscribe(
        data => {
          localStorage.setItem('userToken', data['token'])
        },
        err => {
          console.log(err)
          localStorage.removeItem('userToken')
          this.router.navigate(['/']);
          // console.log("error")
        }
      );
    }

    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term.length > 2) {
          this.data.serachIncompany(term).subscribe(
            data => {
              // console.log(data['data'])
              if (data['data'].length) {
                this.searched = data['data'];
              }
              else {
                this.searched = []
              }
              // this.searched.name = "cadsc"
            });

          this.data.serachIntags(term).subscribe(
            data => {
              // console.log(data['data'])
              if (data['data'].length) {
                this.tagsSearched = data['data'];
              }
              else {
                this.tagsSearched = []
              }
              // this.searched.name = "cadsc"
            });

        } else {
          this.searched = [];
          this.tagsSearched = [];
        }
      });
    console.log(this.categories);

  }

  CityChange(city) {
    if (city == 'none_city') {
      this.cityevent.emit('')
    }
    else {
      this.cityevent.emit(city)
    }
  }

  clear_input() {
    this.searchTerm.setValue('')
  }

  loggedin() {
    return localStorage.getItem("userToken");
  }

  logout() {
    this.user.logout().subscribe(data => {
      localStorage.removeItem("userToken");
    })
    this.router.navigate(['/']);
  }

  @Output() navToggle = new EventEmitter<boolean>();

  navOpen() {
    this.navToggle.emit(true);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = "rtl";
    this.dialog.open(LoginModalComponent, dialogConfig);
  }

  formsubmit(search, type) {
    console.log(type);
    if (type == 1) {
      this.router.navigate(['/search'], {queryParams: {search: this.searchTerm.value}})
    }
    if (type == 2) {
      this.router.navigate(['/company', search])
    }
    if (this.searchTerm.value, type == 3) {
      console.log(search)
      // this.router.navigate(['/search'],{ queryParams: { label: this.searchTerm.value }})
      this.router.navigate(['/search'], {queryParams: {label: search}})
    }
  }

  link_click(slug) {
    console.log(slug)
    this.router.navigate(['/category', slug])
  }

  plaeseLogin() {
    this.toastr.info('ابتدا وارد سایت شوید !!')
  }

  show_more(slug: string) {
    console.log(slug);
    this.is_more = slug;

  }
}
