import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalistenComponent } from './journalisten.component';

describe('JournalistenComponent', () => {
  let component: JournalistenComponent;
  let fixture: ComponentFixture<JournalistenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalistenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalistenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
