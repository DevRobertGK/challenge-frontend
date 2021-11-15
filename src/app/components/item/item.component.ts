import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { ApiService } from 'src/app/services/api.service';
import { Item } from '../../types/item';
import { SnackbarService } from 'src/app/services/snackBar.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  id: string;
  data: Item;
  dataForm: FormGroup = this.formBuilder.group({
    id: [''],
    created: [''],
    updated: [''],
    name: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(255)]],
    unit: ['', Validators.required],
    stock: [0, [Validators.required, Validators.min(0)]]
  });
  units: string[] = ['Dose', 'Karton', 'Kiste', 'Paket', 'Palette', 'Stück'];

  constructor(private apiService: ApiService,
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
      this.apiService.getItem(this.id).subscribe({
        next: (value) => {
          this.data = value;
          this.dataForm.patchValue(value);
        },
        error: (error) => {
          this.snackbar.addMessage('Artikel-ID ungültig');
          console.error(error);
          this.router.navigateByUrl('/items');
        }
      });
  }

  onSubmit(): void {
    if (this.dataForm.valid) {
      if (this.id)
        this.apiService.updateItem(this.id, this.dataForm.value).subscribe({
          next: (value) => {
            this.data = value;
            this.dataForm.patchValue(value);
            this.snackbar.addMessage('Artikel gespeichert');
          },
          error: (error) => {
            this.snackbar.addMessage('Speichern fehlgeschlagen');
            console.error(error);
            this.goBack();
          }
        });
      else
        this.apiService.createItem(this.dataForm.value).subscribe({
          next: (value) => {
            this.id = value.id;
            this.data = value;
            this.dataForm.patchValue(value);
            this.snackbar.addMessage('Artikel gespeichert');
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
      this.apiService.deleteItem(this.id).subscribe({
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

  goBack(): void {
    this.location.back();
  }

  hasError(key: string, error: string): boolean {
    return this.dataForm.get(key)?.hasError(error);
  }
}
