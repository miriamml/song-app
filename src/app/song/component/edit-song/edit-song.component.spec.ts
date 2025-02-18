import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongEditComponent } from './edit-song.component';

describe('EditSongComponent', () => {
  let component: SongEditComponent;
  let fixture: ComponentFixture<SongEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
