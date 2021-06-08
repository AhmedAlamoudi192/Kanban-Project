import { Inject } from '@angular/core';
import { Component, OnInit, Input, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board-dialog',
  template: `
    <h1 mat-dialog-title>Board</h1>
    <div mat-dialog-content>
      <p>name of the board</p>
      <mat-form-field>
        <input matInput placeholder="title" [(ngModel)]="data.title" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button cdkFocusInitial [mat-dialog-close]="data.title">Create</button>
    </div>
  `,
  styles: [
  ]
})
export class BoardDialogComponent {

  constructor(
    public dialogRef:MatDialogRef<BoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

