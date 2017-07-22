import { Component, OnInit, OnDestroy, HostBinding, ViewChild, Renderer2, ElementRef, AfterViewInit  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { fadeInUpAnimation } from '../shared/_animation';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [fadeInUpAnimation],
  providers:[DatePipe]
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  @HostBinding('@routerAnimation') routerAnimation = true;
  @HostBinding('style.position') position = 'relative';
  @HostBinding('style.display') display = 'block';
  @ViewChild('menuRoot') menu : ElementRef;
  @ViewChild('favorite') favorite : ElementRef;

  homepage: boolean = false;
  darkingTheme: boolean;
  viewBlogs: boolean;
  routes = [
    { label: 'Câu Chuyện Cuộc Sống', link: '/cau-chuyen-cuoc-song' },
    { label: 'Thư Viện Hình Ảnh', link: '/thu-vien-hinh-anh' },
  ];
  subscription: Subscription;
  listStories : any = [];
  src : any = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private renderer: Renderer2,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    // NOTE: Setup meta keyword, author in page
    this.metaService.addTags([
      { name: 'author', content: 'Remy Nguyen' },
      { name: 'keywords', content: 'Meditation, stories about life' },
      { name: 'description', content: 'This is my blogs share with you about meditation and inspirational short stories about life' }
    ]);
    // NOTE: Setup router and title page
    this.subscription = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map((path) => {
        if(path instanceof NavigationEnd){
          if(path.url === '/') {
            this.homepage = true;
          } else {
            this.homepage = false;
          }
        }
        return this.activatedRoute
      })
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
        this.titleService.setTitle(event['title'])
      });
      // NOTE: Light Theme and Dark Theme
      let theme: string = localStorage.getItem('themeBlogs');
      if (theme) {
        if (theme === 'lightTheme') {
          this.darkingTheme = false;
        } else {
          this.darkingTheme = true;
        }
      } else {
        localStorage.setItem('themeBlogs', 'lightTheme');
        this.darkingTheme = false;
      }
  
  }

  ngAfterViewInit() {
    // NOTE: Scroll Menu
    // console.log(this.menu.nativeElement);
    // window.addEventListener('scroll', () => {
    //   let menu = this.menu.nativeElement;
    //   const menuScroll = menu.getBoundingClientRect().top;
    //   // console.log(menuScroll)
    //   if(menuScroll != 0) {
    //     this.renderer.addClass(menu,'activeScroll');
    //   } else {
    //     this.renderer.removeClass(menu,'activeScroll');
    //   }
    // });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  transformDate (date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  contactMe() {
    this.router.navigate(['/lien-he']);
  }

  toggleMenu(menu) {
    menu.toggle();
    let bodyClass = document.getElementsByTagName('body')[0].classList;
    if (bodyClass.contains('good')) {
      bodyClass.remove('good');
    } else {
      bodyClass.add('good');
    }
  }

  darkTheme() {
    if (this.darkingTheme === false) {
      localStorage.setItem('themeBlogs', 'darkTheme');
    } else {
      localStorage.setItem('themeBlogs', 'lightTheme');
    }
  }

  arrowDown() {

  }

  searchBlogs() {

  }

  favoriteBlogs(id,key) {
    // let favorite = this.favorite.nativeElement;
    // console.log(favorite);
    console.log(key);
    console.log(id);

  }




}
