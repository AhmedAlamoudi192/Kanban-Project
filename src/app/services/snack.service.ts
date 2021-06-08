import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private snackBar:MatSnackBar,private router:Router) { }

  authError(){
    this.snackBar.open('you must be logged in','Login',{
      duration:5000
    });
    return this.snackBar._openedSnackBarRef?.onAction().pipe(
      tap(_=>{
        this.router.navigate(['/login']);
      })
    ).subscribe()
  }
}
