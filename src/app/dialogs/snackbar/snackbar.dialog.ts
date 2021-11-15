import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackBar.service';

@Component({
	selector: 'app-snackbar',
	templateUrl: './snackbar.dialog.html',
	styleUrls: ['./snackbar.dialog.scss']
})
export class SnackBarDialog implements OnInit, OnDestroy {
	message: string;

	constructor(private snackbar: MatSnackBar,
		private snackbarService: SnackbarService) { }

	ngOnInit(): void {
		this.message = this.snackbarService.snackBarMessages[0];
	}

	ngOnDestroy(): void {
		// only unique messages
		this.snackbarService.snackBarMessages = this.snackbarService.snackBarMessages
			.filter((value, index, self) =>
				self.indexOf(value) === index && this.message !== value
			);

		if (this.snackbarService.snackBarMessages.length == 0)
			this.snackbarService.snackBarReady = true;
		else {
			this.snackbar.openFromComponent(SnackBarDialog, {
				duration: 5000 / this.snackbarService.snackBarMessages.length < 1000 ? 1000 : 5000 / this.snackbarService.snackBarMessages.length
			});
		}
	}
}