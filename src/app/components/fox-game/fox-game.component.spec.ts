import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxGameComponent } from './fox-game.component';

describe('FoxGameComponent', () => {
  let component: FoxGameComponent;
  let fixture: ComponentFixture<FoxGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoxGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoxGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
