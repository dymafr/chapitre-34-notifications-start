import { Component, OnInit } from '@angular/core';
import { User } from '../share/models/user.model';
import { Observable } from 'rxjs';
import { State } from '../share/store';
import { Store, select } from '@ngrx/store';
import { TryFetchCurrentUser } from '../share/store/actions/auth.actions';
import { currentUserSelector } from '../share/store/selectors/auth.selectors';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public currentUser$: Observable<User>;

  constructor( private store: Store<State> ) { }

  ngOnInit() {
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.store.dispatch(new TryFetchCurrentUser());
  }

}
