import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-accueil',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent {
  http = inject(HttpClient);
  produits: Produit[] = [];

  ngOnInit() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.http
        .get<Produit[]>('http://localhost:5000/produits', {
          headers: { Authorization: jwt },
        })
        .subscribe((produits) => (this.produits = produits));
    }
  }
}
