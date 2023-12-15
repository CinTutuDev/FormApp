import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';

import { ValidatorsService } from 'src/app/shared/services/validators.service';
/* import { ValidatorsService } from 'src/app/shared/services/validators-service.service'; */
/* import * as customValidatros from 'src/app/shared/validators/validators/validators'; */

@Component({
  selector: 'auth-register-page',
  templateUrl: './register-page.component.html',
  styles: [],
})
export class RegisterPageComponent implements OnInit {
  public myFormRegister: FormGroup = this.fb.group(
    {
      /* Requerido y un minimo de tres letras */
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.firstNameAndLastnamePattern),
        ],
      ],
      /* email: [
      '',
      [Validators.required, Validators.pattern(this.validatorS.emailPattern)],[new EmailValidatorService()] ], */
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [this.emailValidator],
      ],
      username: [
        '',
        [Validators.required, this.validatorService.cantBeStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordTwo: ['', [Validators.required]],
      /*  confirm:['', [Validators.required]], */
    },
    {
      validators: [this.validatorService.isPassOneEqualPassTwo('password', 'passwordTwo')],
    }
  );

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private emailValidator: EmailValidatorService
  ) {}

  ngOnInit(): void {}

  isValidField(field: string) {
    return this.validatorService.isValidField(this.myFormRegister, field);
  }

  onSubmit() {
    this.myFormRegister.markAllAsTouched();
  }
}
