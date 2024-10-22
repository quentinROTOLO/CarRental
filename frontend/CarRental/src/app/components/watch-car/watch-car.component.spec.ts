import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchCarComponent } from './watch-car.component';

describe('WatchCarComponent', () => {
  let component: WatchCarComponent;
  let fixture: ComponentFixture<WatchCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
