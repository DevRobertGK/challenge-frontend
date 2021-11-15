import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'stock', 'created', 'updated'];
  dataSource: MatTableDataSource<Item> = new MatTableDataSource<Item>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'stock': return item.unit + item.stock;
        default: return item[property];
      }
    };
    this.loadData();
  }

  loadData(): void {
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
}
