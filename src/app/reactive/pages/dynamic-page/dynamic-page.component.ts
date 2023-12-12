import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: [],
})
export class DynamicPageComponent {
  public myFormDinamic: FormGroup = this.fb.group({
    /* Requerido y un minimo de tres letras */
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteBooks: this.fb.array([
      ['Robert Louis Stevenson', Validators.required],
      ['Patrick James Rothfuss', Validators.required],
      ['John Ronald Reuel Tolkien ', Validators.required],
      ['Brandon Sanderson', Validators.required],
    ]),
  });

  public newFavortite: FormControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder) {}

  get favoriteBooks() {
    return this.myFormDinamic.controls['favoriteBooks'] as FormArray;
  }

  isValidField(field: string): boolean | null {
    return (
      this.myFormDinamic.controls[field].errors &&
      this.myFormDinamic.controls[field].touched
    );
  }

  isValidFieldInArray(formArray: FormArray, i: number) {
    return formArray.controls[i].errors && formArray.controls[i].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.myFormDinamic.controls[field]) return null;

    const errors = this.myFormDinamic.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }
    return null;
  }

  onAddFavorite(): void {
    if (this.newFavortite.invalid) return;

    const newBook = this.newFavortite.value;
    this.favoriteBooks.push(this.fb.control(newBook, Validators.required));
    this.newFavortite.reset();
  }

  onDeletFavorite(i: number): void {
    this.favoriteBooks.removeAt(i);
  }

  onSubmit(): void {
    /*   this.submitted = true; */

    if (this.myFormDinamic.invalid) {
      this.myFormDinamic.markAllAsTouched();
      return;
    }

    console.log(this.myFormDinamic.value);
    (this.myFormDinamic.controls['favoriteBooks'] as FormArray) = this.fb.array(
      []
    );
    this.myFormDinamic.reset();
  }
}
