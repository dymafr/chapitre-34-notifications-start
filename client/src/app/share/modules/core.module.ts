import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from './layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// components
import { SignupComponent } from '../../components/signup/signup.component';
import { SigninComponent } from '../../components/signin/signin.component';
import { TopbarComponent } from '../../share/components/topbar/topbar.component';

// services
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

// interceptors
import { AuthInterceptor } from '../interceptors/auth.interceptor';

// guards
import { AuthGuard } from '../guards/auth.guard';

const COMPONENTS = [
  SignupComponent,
  SigninComponent,
  TopbarComponent,
];

@NgModule({
  imports: [
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    UserService,
    AuthGuard,
  ]
})
export class CoreModule { }
