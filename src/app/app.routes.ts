import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { securityInnerGuard } from './core/security-inner.guard';
import { CounterComponent } from './front/counter/counter.component';

export const routes: Routes = [
    { path: '', redirectTo: 'counter', pathMatch: 'full' },
    { path: 'counter', component: CounterComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent, canActivate: [securityInnerGuard] }
];
