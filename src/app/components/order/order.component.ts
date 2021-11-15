import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { ApiService } from 'src/app/services/api.service';
import { Order } from 'src/app/types/order';
import { MatDialog } from '@angular/material/dialog';
import { ItemSelectDialog } from 'src/app/dialogs/item-select/item-select.dialog';
import { Item } from 'src/app/types/item';
import { Position } from 'src/app/types/position';
import { ItemInfoDialog } from 'src/app/dialogs/item-info/item-info.dialog';
import { SnackbarService } from 'src/app/services/snackBar.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  id: string;
  data: Order;
  dataForm: FormGroup = this.formBuilder.group({
    id: [''],
    created: [''],
    updated: [''],
    name: ['', [Validators.required, Validators.maxLength(255)]],
    positions: this.formBuilder.array([])
  });
  positions: Position[] = [];

  constructor(public dialog: MatDialog,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private snackbar: SnackbarService) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params?.['id'];

    this.loadData();
  }

  loadData(): void {
    if (this.id)
      this.apiService.getOrder(this.id).subscribe({
        next: (value) => {
          this.dataForm = this.formBuilder.group({
            id: [''],
            created: [''],
            updated: [''],
            name: ['', [Validators.required, Validators.maxLength(255)]],
            positions: this.formBuilder.array([])
          });
          this.data = value;
          this.dataForm.patchValue(value);
          value.positions.forEach(element => this.positionsArray.push(this.formBuilder.group(element)));
          this.positions = value.positions;
        },
        error: (error) => {
          this.snackbar.addMessage('Auftrags-ID ungültig');
          console.error(error);
          this.router.navigateByUrl('/orders');
        }
      });
  }

  onSubmit(): void {
    if (this.dataForm.valid) {
      if (this.id)
        this.apiService.updateOrder(this.id, this.dataForm.value).subscribe({
          next: (value) => {
            this.data = value;
            this.dataForm.patchValue(value);
            this.snackbar.addMessage('Auftrag gespeichert');
          },
          error: (error) => {
            this.snackbar.addMessage('Speichern fehlgeschlagen');
            console.error(error);
            this.goBack();
          }
        });
      else
        this.apiService.createOrder(this.dataForm.value).subscribe({
          next: (value) => {
            this.id = value.id;
            this.data = value;
            this.dataForm.patchValue(value);
            this.snackbar.addMessage('Auftrag gespeichert');
          },
          error: (error) => {
            this.snackbar.addMessage('Speichern fehlgeschlagen');
            console.error(error);
            this.goBack();
          }
        });
    }
  }

  onDelete(): void {
    if (this.id)
      this.apiService.deleteOrder(this.id).subscribe({
        next: (value) => {
          this.snackbar.addMessage('Auftrag gelöscht');
          this.goBack();
        },
        error: (error) => {
          this.snackbar.addMessage('Löschen fehlgeschlagen');
          console.error(error);
        }
      });
  }

  onRequest(): void {
    if (this.id)
      this.apiService.requestOrder(this.id, this.dataForm.value).subscribe({
        next: (value) => {
          this.snackbar.addMessage('Auftrag erfolgreich angefordert');
          this.loadData();
        },
        error: (error) => {
          this.snackbar.addMessage(error.error.message);
          console.error(error);
        }
      });
  }

  onItemSelect(): void {
    this.dialog.open(ItemSelectDialog,
      {
        width: '80vw',
        height: '80vw'
      })
      .afterClosed().subscribe((result: Item) => {
        if (result) {
          this.positionsArray.push(
            this.formBuilder.group({
              item: [result],
              amount: [1]
            }));
          this.positions.push({ item: result, amount: 1 });
          this.snackbar.addMessage('Artikel hinzugefügt');
        }
      });
  }

  itemInfo(item: Item): void {
    this.dialog.open(ItemInfoDialog,
      {
        data: item,
        width: '80vw'
      });
  }

  onDeletePosition(i: number): void {
    this.positions.splice(i, 1);
    this.positionsArray.removeAt(i);
    this.snackbar.addMessage('Artikel entfernt');
  }

  get positionsArrayControls(): FormGroup[] {
    return ((this.dataForm.get('positions') as FormArray).controls as FormGroup[]);
  }

  get positionsArray(): FormArray {
    return this.dataForm.get('positions') as FormArray;
  }

  goBack(): void {
    this.location.back();
  }

  hasError(key: string, error: string): boolean {
    return this.dataForm?.get(key)?.hasError(error);
  }
}
