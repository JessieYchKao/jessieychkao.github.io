import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  menuOpen: boolean = true;
  currentPage: string = 'home';

  constructor(private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((x: any) => {
      this.currentPage = x.url === '/' ? 'home' : x.url.split('/')[1];
    })
  }

  menuOnClick() {
    this.menuOpen = !this.menuOpen;
  }

  navigate(page: string) {
    if (this.currentPage === page) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([page]));
    } else {
      this.router.navigate([page]);
    }
    this.currentPage = page;
  }
}
