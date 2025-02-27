import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerGameComponent } from './banner-game.component';

describe('BannerGameComponent', () => {
  let component: BannerGameComponent;
  let fixture: ComponentFixture<BannerGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
