import { TaskDialogComponent } from './../dialogs/task-dialog.component';
import { BoardDialogComponent } from './../dialogs/board-dialog.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DatabaseService } from './../database.service';
import { Board, Task } from './../board-module';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() board: Board;
  constructor(private boardService: DatabaseService,private dialog: MatDialog) {}

  taskDrop(event: CdkDragDrop<String[]>) {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.board.id, this.board.tasks);
  }

  deleteBoard(){
    this.boardService.deleteboard(this.board.id);
  }

  openDialog(task?:Task,index?:number):void{
    const newtask = {label : 'purple'};
    const dialogRef = this.dialog.open(TaskDialogComponent,{
      width:'400px',
      data:task 
      ? {task:{...task} , isNew:false,boardID:this.board.id,index }
      : {task: newtask , isNew:true}
    });
    
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        if(result.isNew){
          this.boardService.updateTasks(this.board.id,[
            ...this.board.tasks,
            result.task,
          ]);
        }else{
          const update = this.board.tasks;
          update.splice(result.index,1,result.task);
          this.boardService.updateTasks(this.board.id,this.board.tasks)
        }
      }
    })
  };
}
