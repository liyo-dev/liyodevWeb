import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class MenuComponent implements AfterViewInit {
  @ViewChild('menu', { static: true }) menu!: ElementRef;

  isMobile = false;

  ngAfterViewInit(): void {
    this.isMobile = window.innerWidth < 768;
    this.animateMenuItems();
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  private animateMenuItems() {
    gsap.fromTo(
      this.menu.nativeElement.querySelectorAll('a'),
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, stagger: .2, duration: 1, ease: 'power3.out' }
    );
  }

}
