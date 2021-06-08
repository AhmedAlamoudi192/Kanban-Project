import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-email-loginpage',
  templateUrl: './email-loginpage.component.html',
  styleUrls: ['./email-loginpage.component.scss'],
})
export class EmailLoginpageComponent implements OnInit {
  form!: FormGroup;
  type: 'login' | 'signup' | 'reset' = 'signup';
  loading: boolean = false;

  servermessage!: string;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private fBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', []],
    });

    const formCon = new FormControl();
  }
  changeType(val: any) {
    this.type = val;
  }

  get isLogin(): boolean {
    return this.type === 'login';
  }

  get isSignup(): Boolean {
    return this.type === 'signup';
  }

  get isReset(): boolean {
    return this.type === 'reset';
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get confirmpassword() {
    return this.form.get('confirmpassword');
  }
  get passwordDoesMatch() {
    if (this.type != 'signup') {
      return true;
    } else {
      return this.password?.value == this.confirmpassword?.value;
    }
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email?.value;
    const password = this.password?.value;

    try{
    switch(this.type){
    case 'login':
    this.firebaseAuth.signInWithEmailAndPassword(email, password);
    break;
    case 'signup':
    this.firebaseAuth.createUserWithEmailAndPassword(email, password);
    break;
    case 'reset':
    this.firebaseAuth.sendPasswordResetEmail(email);
    this.servermessage='Check Your Email';
    break;
    }
    } catch (error) {
      this.servermessage = error;
    }

    this.loading = false;
  }
}
