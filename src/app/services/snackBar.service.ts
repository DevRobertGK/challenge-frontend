import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarDialog } from '../dialogs/snackbar/snackbar.dialog';

@Injectable()
export class SnackbarService {
  snackBarMessages: string[] = [];
  snackBarReady: boolean = true;

  constructor(private snackBar: MatSnackBar) { }

  addMessage(message: string, duration: number = 5000): void {
    this.snackBarMessages.push(message);
    if (this.snackBarReady) {
      this.snackBarReady = false;
      this.snackBar.openFromComponent(SnackBarDialog, {
        duration: duration
      });
    }
  }
}