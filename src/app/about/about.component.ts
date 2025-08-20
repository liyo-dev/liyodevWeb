import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.animateAboutSection();
  }

  private animateAboutSection(): void {
    gsap.from('.about-section .section-title h2', {
      y: -50, opacity: 0, duration: 1, ease: 'power3.out'
    });

    gsap.from('.profile-summary', {
      y: 20, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power3.out'
    });

    gsap.from('.skill-category', {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.15, delay: 0.25, ease: 'back.out(1.3)'
    });

    gsap.from('.skill-tag', {
      y: 8, opacity: 0, duration: 0.4, stagger: 0.04, delay: 0.6, ease: 'power2.out'
    });
  }
}
