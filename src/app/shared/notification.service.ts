import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  success(msg){
    this.config['panelClass'] = ['notification','success'];
    this.snackBar.open(msg,'',this.config);
  }

  formCleared(msg){
    this.config['panelClass'] = ['notification','success'];
    this.snackBar.open(msg,'Yupp',this.config);
  }
}
