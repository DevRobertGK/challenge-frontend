import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './components/item/item.component';
import { ItemsComponent } from './components/items/items.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  {
    path: 'orders', component: OrdersComponent
  },
  {
    path: 'order/:id', component: OrderComponent
  },
  {
    path: 'order', component: OrderComponent
  },
  {
    path: 'items', component: ItemsComponent
  },
  {
    path: 'item/:id', component: ItemComponent
  },
  {
    path: 'item', component: ItemComponent
  },
  {
    path: '', redirectTo: 'orders', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'orders'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
