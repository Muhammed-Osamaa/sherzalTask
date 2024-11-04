import { CanDeactivateFn } from '@angular/router';
import { SignupComponent } from '../Auth/sign-up/sign-up.component';

export const preventUnsavedChangesGuardGuard: CanDeactivateFn<SignupComponent> = (component, currentRoute, currentState, nextState) => {
  if(component.form?.dirty){
    return confirm("you've unsaved changes, Do you want to leave?!")
  }
  return true;
};
