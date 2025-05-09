import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-connexion',
  imports: [MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',
})
export class ConnexionComponent {
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);

  formulaire = this.formBuilder.group({
    email: ['a@a', [Validators.email, Validators.required]],
    password: ['root', [Validators.required]],
  });

  onConnexion() {
    if (this.formulaire.valid) {
      this.http
        .post('http://localhost:5000/connexion', this.formulaire.value, {
          responseType: 'text',
        })
        .subscribe((jwt) => localStorage.setItem('jwt', jwt));
    }
  }
}
