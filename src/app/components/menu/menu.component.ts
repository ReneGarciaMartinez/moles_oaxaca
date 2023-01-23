import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { User } from 'src/app/shared/user.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  user: User = new User();
  constructor(public authSvc: FirebaseauthService, private router: Router) {}

  ngOnInit() {}
  logOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      
      console.log('Sesion cerrada');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }
}
