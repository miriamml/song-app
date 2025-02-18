import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipSelectorsComponent } from './chip-selectors.component';

describe('ChipSelectorsComponent', () => {
  let component: ChipSelectorsComponent;
  let fixture: ComponentFixture<ChipSelectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipSelectorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipSelectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
