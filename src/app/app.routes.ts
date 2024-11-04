import { Routes } from '@angular/router';
import { SignupComponent } from './Auth/sign-up/sign-up.component';
import { preventUnsavedChangesGuardGuard } from './_gaurds/prevent-unsaved-changes-guard.guard';

export const routes: Routes = [
    {path:"register" , component:SignupComponent, canDeactivate:[preventUnsavedChangesGuardGuard]}
];
