import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Board, Task } from './board-module';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  /*creates a new board for the user*/
  async createboard(data: Board) {
    const User = await this.firebaseAuth.currentUser;

    return this.db.collection('boards').add({
      ...data,
      uid: User.uid,
      tasks: [{ description: 'your first task :)', label: 'yellow' }],
    });
  }

    /* Updates the tasks on board */
     updateTasks(boardID: string, tasks: Task[]) {
      return this.db
        .collection('boards')
        .doc(boardID)
        .update({ tasks });
    }

  /*deletes the board for the user*/
  deleteboard(boardID: string) {
    return this.db.collection('boards').doc(boardID).delete();
  }

  /*updates the board tasks for the user */
  updateboard(boardID: string, updates: Task[]) {
    return this.db.collection('boards').doc(boardID).update({ updates });
  }

  /*removes one specifc task from a board */
  removeTask(boardID: string, task: Task) {
    return this.db
      .collection('boards')
      .doc(boardID)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      });
  }

  /*retrieves all the boards for the user*/
  getUserBoards() {
    return this.firebaseAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Board>('boards', (ref) =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  /*sorts the boards at once (so no problems or funny stuff happens) */
  sortboards(boards:Board[]){
  const database = firebase.firestore();
  const batch = database.batch();
  const refs = boards.map(b => database.collection('boards').doc(b.id));
  refs.forEach((ref,idx)=> batch.update(ref,{priority:idx}));
  batch.commit;
}
}
