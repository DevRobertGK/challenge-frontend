import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './components/item/item.component';
import { ItemsComponent } from './components/items/items.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './materials.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getGermanPaginatorIntl } from './german-paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemSelectDialog } from './dialogs/item-select/item-select.dialog';
import { ItemInfoDialog } from './dialogs/item-info/item-info.dialog';
import { SnackBarDialog } from './dialogs/snackbar/snackbar.dialog';
import { SnackbarService } from './services/snackBar.service';


@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    OrdersComponent,
    ItemComponent,
    ItemsComponent,
    ItemSelectDialog,
    ItemInfoDialog,
    SnackBarDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getGermanPaginatorIntl() },
    SnackbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
