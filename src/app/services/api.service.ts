import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../types/item';
import { Order } from '../types/order';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Orders

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('api/orders');
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>('api/orders/' + id);
  }

  createOrder(data: Order): Observable<Order> {
    return this.http.post<Order>('api/orders', data);
  }

  updateOrder(id: string, data: Order): Observable<Order> {
    return this.http.put<Order>('api/orders/' + id, data);
  }

  requestOrder(id: string, data: Order): Observable<Order> {
    return this.http.put<Order>('api/orders/' + id + '/request', data);
  }

  deleteOrder(id: string): Observable<Order> {
    return this.http.delete<Order>('api/orders/' + id);
  }

  // Items

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('api/items');
  }

  getItem(id: string): Observable<Item> {
    return this.http.get<Item>('api/items/' + id);
  }

  createItem(data: Item): Observable<Item> {
    return this.http.post<Item>('api/items', data);
  }

  updateItem(id: string, data: Item): Observable<Item> {
    return this.http.put<Item>('api/items/' + id, data);
  }

  deleteItem(id: string): Observable<Item> {
    return this.http.delete<Item>('api/items/' + id);
  }
}
