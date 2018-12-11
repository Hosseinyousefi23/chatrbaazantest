import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PageService } from '../page.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  pro;
  selectedcompany;
  selectedtab: string;
  companies : any[] =[];
  Categoryid :any[] =[];
  mode = new FormControl('over');
  constructor(private route: ActivatedRoute , private router : Router,private data :PageService) {

    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }

   this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
         this.router.navigated = false;
    }
  });
}

  ngOnInit() {
    
    this.route.params.subscribe(params => {this.Categoryid = params['slug'];})
    this.data.search(this.Categoryid).subscribe(param => { 
      if(param['count']){
        this.pro = param
        this.companies =[]
        for(let i of param.results){
        this.companies = this.companies.concat(i.company); 
        }
      }else{
      this.router.navigate(['/']);
    }
    });
  }

  changeTab($event){
    let tab = ['favorites','topchatrbazi','created_at']
    this.selectedtab =tab[$event.index];
    this.filter();
}

  filter(){
    this.data.search(null,this.selectedcompany,this.Categoryid,this.selectedtab).subscribe(param => { 
      if(param['count']){
        this.pro = param
        this.companies =[]
        for(let i of param.results){
        this.companies = this.companies.concat(i.company); 
        }
      }else{
        this.pro =null;
    }
    });
  }

}