import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArtikelenComponent } from './add-artikelen.component';

describe('AddArtikelenComponent', () => {
  let component: AddArtikelenComponent;
  let fixture: ComponentFixture<AddArtikelenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArtikelenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArtikelenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
