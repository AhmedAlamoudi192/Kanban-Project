import firebase from 'firebase/app';
import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {

  constructor(private firebaseauth:AngularFireAuth) {}
  @HostListener('click')
  onclick(){  
    this.firebaseauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

}
