import { NgClass, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './sign-up.component.html',
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  styleUrl: './sign-up.component.css',
})
export class SignupComponent {
  @HostListener("window:beforeunload" , ['$event']) notify($event:any){
   if(this.form?.dirty){
     $event.returnValue = true;
   }
 }
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10),
          ],
        }),
        confirmPassword: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10),
          ],
        }),
      },
      {
        validators: [this.matchPassword()]
      }
    ),
    firstName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(7),
      ],
    }),
    lastName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(7),
      ],
    }),
    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required],
      }),
      number: new FormControl('', {
        validators: [Validators.required],
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required],
      }),
      city: new FormControl('', {
        validators: [Validators.required],
      }),
    }),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', {
      validators: [Validators.required],
    }),
    findUs: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, {
      validators: [Validators.requiredTrue],
    }),
  });

  matchPassword(): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      if (password === confirmPassword) return null;
      return { isMatching: true };
    };
  }

  Submit() {
    console.log(this.form);
    console.log('is valid form?', this.form.valid);
    this.form.markAllAsTouched();
  }
}
