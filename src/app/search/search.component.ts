import { Component, OnInit ,AfterViewInit, DoCheck} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PageService } from '../page.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  Categoryid;
  pro;
  companies :any[] =[];
  categories :any[] =[];
  mode = new FormControl('over');
  constructor(private router: Router ,private route: ActivatedRoute,private data: PageService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }

   this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         this.router.navigated = false;
         this.detectUrl()
      }
  });
   }

  ngOnInit() {
    // this.detectUrl()
  }


  detectUrl(){
    let url =this.router.url
    if(url.slice(1,9)=='category'){
      this.route.params.subscribe(params => { this.Categoryid = params['id'];})
      this.data.searchbyCategory(this.Categoryid).subscribe(param => { 
        if(param['data']){
          this.pro = param['data']
        }else{
        this.router.navigate(['/']);
      }
      });
    }
    else if(url.slice(1,7)=='search'){
      let sea = this.route.snapshot.queryParams['search']
      this.data.search(sea).subscribe(param => { 
        // console.log(param)
        if(param){
          this.pro = param
          // this.companies =[]
          // this.companies.push(this.pro.results[0].city)
        }else{
        this.router.navigate(['/']);
      }
      });
    }
    else if(url.slice(1,8)=='company'){
      this.route.params.subscribe(params => { this.Categoryid = params['id'];})
      this.data.searchbyCompany(this.Categoryid).subscribe(param => { 
        if(param['data']){
          this.pro = param['data']
          // this.companies =[]
          // this.companies.push(this.pro.results[0].city)
        }else{
        this.router.navigate(['/']);
      }
      });
    }

  }

}
