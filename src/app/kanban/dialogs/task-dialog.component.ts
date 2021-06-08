import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from './../database.service';


@Component({
  selector: 'app-task-dialog',
  template: `
    <h1 mat-dialog-title>Task</h1>
    <div mat-dialog-content class="content">
      <mat-form-field>
        <textarea
        placeholder="Task Description"
        matInput
        [(ngModel)]="data.task.description"
        >
        </textarea>
      </mat-form-field>
      <br/>
      <mat-button-toggle-group
      #group="matButtonToggleGroup"
      [(ngModel)]="data.task.label"
    >
      <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt">
        <mat-icon [ngClass]="opt">{{
          opt === 'gray' ? 'check_circle' : 'lens'
        }}</mat-icon>
      </mat-button-toggle>
    </mat-button-toggle-group>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]='data' cdkFocusInitial>
        {{data.isNew ? 'Add Task':'Update Task'}}
      </button>
      <app-delete-button (delete)="deleteTask()" *ngIf="!data.isNew" ></app-delete-button>
    </div>
  `,
  styleUrls: ['./dialog.scss']
})
export class TaskDialogComponent {

  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  constructor(private dialogRef:MatDialogRef<TaskDialogComponent>,
    private taskService:DatabaseService,
    @Inject(MAT_DIALOG_DATA)public data:any){}

  onNoClick(){
    this.dialogRef.close();
  }
  deleteTask(){
    this.taskService.removeTask(this.data.boardID,this.data.task);
    this.dialogRef.close();
  }

}
