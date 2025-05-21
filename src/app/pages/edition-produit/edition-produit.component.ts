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
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-edition-produit',
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './edition-produit.component.html',
  styleUrl: './edition-produit.component.scss',
})
export class EditionProduitComponent {
  http = inject(HttpClient);
  notification = inject(NotificationService);
  router = inject(Router);

  formBuilder = inject(FormBuilder);
  formulaire = this.formBuilder.group({
    nom: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    description: ['', [Validators.maxLength(50)]],
    prix: [0, [Validators.min(0.01)]],
  });

  onClicValider() {
    if (this.formulaire.valid) {
      this.http
        .post('http://localhost:5000/produit', this.formulaire.value)
        .subscribe((reponse) => {
          this.notification.show('Le produit a bien été ajouté', 'valid');
          this.router.navigateByUrl('/accueil');
        });
    }
  }
}
