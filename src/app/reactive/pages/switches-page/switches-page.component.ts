import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styles: [],
})
export class SwitchesPageComponent implements OnInit {
  public myFormSwitches: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  public person = {
    gender: 'F',
    wantNotifications: false,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myFormSwitches.reset(this.person);
  }

  isValidField(field: string): boolean | null {
    return (
      this.myFormSwitches.controls[field].errors &&
      this.myFormSwitches.controls[field].touched
    );
  }
  onSave(): void {
    if (this.myFormSwitches.invalid) {
      this.myFormSwitches.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myFormSwitches.value

    this.person = newPerson;
    console.log(this.myFormSwitches.value);
    console.log(this.person);
    /*  this.myFormSwitches.reset(); */
  }
}
