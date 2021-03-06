import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PageService } from '../page.service';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';
import { ToastrService } from 'ngx-toastr';
import { MatBottomSheetRef, MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { BottomSheetOverviewExampleSheet } from '../bottom-sheet/bottom-sheet.component';
import { UsersService } from '../users.service';
declare var $: any;
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['../sharesCss/shared_style.css','./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private data: PageService,private user: UsersService, private dialog: MatDialog,private toastr: ToastrService,
    private bottomSheet: MatBottomSheet) { 
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }
  
      this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
          this.router.navigated = false;
        }
      });
    }
  pro : any[] = [];
  selectedcategory;
  selectedtab: string;
  cityHeader;
  companyinfo;


  next_url = '';
  size = 4;
  page = 1;
  stop_scroll = false;

  categories: any[] = [];
  Companyid: any[] = [];
  mode = new FormControl('over');
  ngOnInit() {
    this.companyinfo = {
      name: '',
      description: '',
      link: '',
      image: '',
      }
    this.route.params.subscribe(params => { this.Companyid = params['slug']; })
    this.data.search(null, this.Companyid,null,null,null,this.size,this.page,null,true).subscribe(param => {
      if (param['count']) {

        this.pro = param.results;
        this.companyinfo = param['dataCompany']
        this.next_url = param.next
        this.categories = []
        for (let i of param.results) {
          for (let c of i.category) {
            if (!this.categories.some(temp => temp.name == c.name)) {
              this.categories.push(c);
            }
          }
        }
        this.addeventlister();
        if(this.next_url != null){
          this.stop_scroll = false;
        }else{
          this.stop_scroll = true;
        }
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  addeventlister(){
    $(document).ready(function(){
      $(".card").click(function(){
        $(".card").removeClass("voted");
        $(this).addClass("voted");
        $(".card").find(".offer_image").css("display","block")
        $(this).find(".offer_image").css("display","none")

      });

      $(".back_voted").click(function(e){
        $(".offer_image").css("display","block")
        e.stopPropagation();
        $(".card").removeClass("voted");
      });

      $(".Copy_btn").click(function(){
        $(this).text("کپی شد");
      setTimeout( function(){ 
        $(".Copy_btn").text("کپی")
      }  , 500 );
      })

    });
  }

  citychangedinheader(a) {
    this.cityHeader = a;
    this.page = 1;
    this.filter();
  }

  changeTab($event) {
    let tab = ['favorites', 'topchatrbazi', 'created_at']
    this.selectedtab = tab[$event.index];
    this.page = 1;
    this.filter();
  }
  addtocart(id){
    if(localStorage.getItem("userToken")){
      this.user.addtocart(id).subscribe(
        (data : any) => {
          // console.log(data)
          if(data.count && data.count >= 0){
            this.toastr.success('به سبد خرید اضافه شد.')
          }else{
            // #TODO Handle Error Add To Cart
          }
        }
      )
      }else{
        this.toastr.info('ابتدا وارد سایت شوید !!')
      }
  }
  filterbtn(){
    this.page = 1;
    this.filter();
  }
  filterDeletebtn(){
    this.page = 1;
    this.selectedcategory = null;
    this.filter();
  }
  filter() {
    this.data.search(null, this.Companyid, this.selectedcategory, this.selectedtab, this.cityHeader,this.size, this.page,null,true).subscribe(param => {
      if (param['count']) {
        this.pro = param.results
        this.categories = []
        this.next_url = param.next
        for (let i of param.results) {
          for (let c of i.category) {
            if (!this.categories.some(temp => temp.name == c.name)) {
              this.categories.push(c);
            }
          }
        }
        this.addeventlister();
        if(this.next_url != null){
          this.stop_scroll = false;
        }else{
          this.stop_scroll = true;
        }
      } else {
        this.pro = null;
      }
    });
  }

  openDialog(slug) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = "rtl";
    this.dialog.open(DetailModalComponent, {
      direction: 'rtl',
      data: { 'slug': slug }
    });
  }

  infinte_list() {
    this.data.search(null, this.Companyid, this.selectedcategory, this.selectedtab, this.cityHeader, this.size, this.page,null,true).subscribe(param => {
      if (param['count']) {
        console.log(param.results)
        this.pro = this.pro.concat(param['results'])
        this.next_url = param.next
        for (let i of param.results) {
          for (let c of i.category) {
            if (!this.categories.some(temp => temp.name == c.name)) {
              this.categories.push(c);
            }
          }
        }
        this.addeventlister();
        if(this.next_url != null){
          this.stop_scroll = false;
        }else{
          this.stop_scroll = true;
        }
      } else {
        this.pro = null;
      }
    });
  }


  onScroll() {
    if(!this.stop_scroll){
      this.page += 1; 
      this.infinte_list();
      this.stop_scroll =true;
      }
  }

  sendfail(slug){
    this.toastr.error('چترتون مستدام ')
    this.data.sendfailure(slug).subscribe(
      // data => console.log(data)
    )
  }

  openBottomSheet(slug): void {
    // console.log(slug+"12")
    this.bottomSheet.open(BottomSheetOverviewExampleSheet
      ,{data:{ 'slug': slug}});
  }

  showCopied(product_id) {
    this.data.sendclick_like(product_id).subscribe(
      data => console.log(data)
    )
  }

  sendclick(product_id){
    this.toastr.info('آماده پرتاب')
    this.data.sendclick_like(product_id).subscribe(
      data => console.log(data)
    )
  }
  finished(a){
    // $(".timer_"+a).text("منقضی شد")
    $(".timer_"+a).html('<p style="color:red;">منقضی شد</p>')
  }

}
