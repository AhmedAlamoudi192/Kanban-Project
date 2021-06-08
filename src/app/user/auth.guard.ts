import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackService } from '../services/snack.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private firebaseAuth:AngularFireAuth,private snack: SnackService){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Promise<boolean> {
    const User = await this.firebaseAuth.currentUser ;
    const isLogged = !!User;
    if(!isLogged){
      this.snack.authError();
    }
    return isLogged;
  }
  
}
