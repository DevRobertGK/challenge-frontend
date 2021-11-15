import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarDialog } from './snackbar.dialog';

describe('SnackBarDialog', () => {
  let component: SnackBarDialog;
  let fixture: ComponentFixture<SnackBarDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackBarDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
