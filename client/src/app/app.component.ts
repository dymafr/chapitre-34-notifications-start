import { Component } from '@angular/core';
import { AuthService } from './share/services/auth.service';
import { Store } from '@ngrx/store';
import { State } from './share/store';
import { TryRefreshToken } from './share/store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private store: Store<State>) {
    this.store.dispatch(new TryRefreshToken());
  }
}
