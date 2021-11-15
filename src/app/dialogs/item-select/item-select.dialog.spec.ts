import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSelectDialog } from './item-select.dialog';

describe('ItemSelectDialog', () => {
  let component: ItemSelectDialog;
  let fixture: ComponentFixture<ItemSelectDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSelectDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSelectDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
