import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInfoDialog } from './item-info.dialog';

describe('ItemInfoDialog', () => {
  let component: ItemInfoDialog;
  let fixture: ComponentFixture<ItemInfoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemInfoDialog]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInfoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
