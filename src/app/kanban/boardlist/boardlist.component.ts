import { BoardDialogComponent } from './../dialogs/board-dialog.component';
import { DatabaseService } from './../database.service';
import { Board } from './../board-module';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver,Breakpoints} from '@angular/cdk/layout'
import {map, shareReplay} from 'rxjs/operators';


@Component({
  selector: 'app-boardlist',
  templateUrl: './boardlist.component.html',
  styleUrls: ['./boardlist.component.scss'],
})
export class BoardlistComponent implements OnInit, OnDestroy {
  boards: Board[];
  sub: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
  .pipe(
    map(result => result.matches),
    shareReplay(),
  );

  constructor(public boardSerives: DatabaseService,public dialog:MatDialog,private breakpointObserver:BreakpointObserver) {}

  ngOnInit(): void {
    this.sub = this.boardSerives
      .getUserBoards()
      .subscribe((boardsArray) => (this.boards = boardsArray));
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardSerives.sortboards(this.boards);
  }

  createBoard(data:Board){
    this.boardSerives.createboard(data);
  }

  openBoardDialog():void{
    const dialogRef = this.dialog.open(BoardDialogComponent,{
      width:'400px',
      data:{}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.boardSerives.createboard({
          title:result,
          priority:this.boards.length,
        })
      }
    });
  }
}
