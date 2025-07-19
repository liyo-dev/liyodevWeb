import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true
})
export class MenuComponent implements AfterViewInit {
  @ViewChild('menu', { static: true }) menu!: ElementRef;

  isMobile = false;
  menuOpen = false;

  ngAfterViewInit(): void {
    this.isMobile = window.innerWidth < 768;
    this.animateMenuItems();
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
    this.menuOpen = false;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;

    if (this.menuOpen) {
      this.animateMenuItems();
    }
  }

  closeMenu() {
    this.menuOpen = false;
  }

  private animateMenuItems() {
    gsap.fromTo(
      this.menu.nativeElement.querySelectorAll('a'),
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, stagger: .2, duration: 1, ease: 'power3.out' }
    );
  }

}
