import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PairsInfoComponent } from './pairs-info.component';

describe('PairsInfoComponent', () => {
  let component: PairsInfoComponent;
  let fixture: ComponentFixture<PairsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PairsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PairsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
