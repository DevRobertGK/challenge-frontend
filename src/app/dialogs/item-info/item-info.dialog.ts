import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.dialog.html',
  styleUrls: ['./item-info.dialog.scss']
})
export class ItemInfoDialog {

  constructor(
    public dialogRef: MatDialogRef<ItemInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
  ) { }
}
