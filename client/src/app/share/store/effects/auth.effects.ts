import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TRY_SIGNUP, TrySignup, SignupError,
  TRY_SIGNIN, TrySignin, SigninError,
   SigninSuccess, SIGNIN_SUCCESS, TRY_REFRESH_TOKEN,
    LOGOUT, TRY_FETCH_CURRENT_USER, TryFetchCurrentUser, SetCurrentUser } from "../actions/auth.actions";
import { map, switchMap, catchError, tap, withLatestFrom } from "rxjs/operators";
import { User } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { empty } from "rxjs";
import { of } from "rxjs";
import { Subscription } from "rxjs";
import { UserService } from "../../services/user.service";
import { Store, select } from "@ngrx/store";
import { State } from "..";
import { tokenSelector } from "../selectors/auth.selectors";

@Injectable()
export class AuthEffects {
  private subscription: Subscription;


  @Effect()
  trySignUp$ = this.actions$.pipe(
    ofType(TRY_SIGNUP),
    map( (action: TrySignup) => action.payload ),
    switchMap( (user: User) => {
      return this.authService.signup(user);
    }),
    switchMap( () => {
      this.router.navigate(['/signin']);
      return empty();
    }),
    catchError( (err: any) => {
      return of(new SignupError(err));
    })
  );

  @Effect()
  trySignIn$ = this.actions$.pipe(
    ofType(TRY_SIGNIN),
    map( (action: TrySignin) => action.payload ),
    switchMap( (credentials: { email: string, password: string }) => {
      return this.authService.signin(credentials);
    }),
    map( (token: string) => {
      localStorage.setItem('token', token);
      return new SigninSuccess(token);
    }),
    catchError( (err: any) => {
      return of(new SigninError(err));
    })
  );

  @Effect({ dispatch: false })
  signinSuccess$ = this.actions$.pipe(
    ofType(SIGNIN_SUCCESS),
    tap( () => {
      if (!this.subscription) {
        this.subscription = this.authService.initTimer().subscribe();
        this.router.navigate(['/']);
      }
    })
  );

  @Effect()
  tryRefreshToken$ = this.actions$.pipe(
    ofType(TRY_REFRESH_TOKEN),
    withLatestFrom(this.store.pipe(select(tokenSelector))),
    switchMap( ([action, token]) => {
      if (token) {
        return this.authService.refreshToken().pipe(
          map( (newToken: string) => {
            localStorage.setItem('token', newToken);
            return new SigninSuccess(newToken);
          }),
          catchError( (err: any) => {
            localStorage.removeItem('token');
            if (this.subscription) {
              this.subscription.unsubscribe();
            }
            return empty();
          })
        );
      } else {
        return empty();
      }
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(LOGOUT),
    tap( () => {
      if (!this.subscription) {
        this.subscription.unsubscribe();
      }
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    })
  );

  @Effect()
  tryFetchCurrentUser$ = this.actions$.pipe(
    ofType(TRY_FETCH_CURRENT_USER),
    switchMap( () => {
      return this.userService.getCurrentUser();
    }),
    map( (user: User) => {
      return new SetCurrentUser(user);
    }),
    catchError( (err: any) => {
      return empty();
    })
  );




  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private store: Store<State>,
    private router: Router
  ) { }



}
