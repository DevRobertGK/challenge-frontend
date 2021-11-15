import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-item-select',
  templateUrl: './item-select.dialog.html',
  styleUrls: ['./item-select.dialog.scss']
})
export class ItemSelectDialog implements OnInit {
  displayedColumns: string[] = ['name', 'created', 'updated'];
  dataSource: MatTableDataSource<Item> = new MatTableDataSource<Item>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<ItemSelectDialog, Item>,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getItems().subscribe({
      next: (value) => {
        this.dataSource.data = value;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      return data.name.toLowerCase().includes(filter);
    };
    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  }

  onClose(item: Item): void {
    this.dialogRef.close(item);
  }
}