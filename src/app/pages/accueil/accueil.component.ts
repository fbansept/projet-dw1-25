import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent {
  http = inject(HttpClient);
  produits: Produit[] = [];

  ngOnInit() {
   this.refreshProduits()
  }

  refreshProduits() {
    this.http
      .get<Produit[]>('http://localhost:5000/produits')
      .subscribe((produits) => (this.produits = produits));
  }

  onClickSupprimer(produit: Produit) {

    if(confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      this.http
        .delete('http://localhost:5000/produit/' + produit.id)
        .subscribe((reponse) => this.refreshProduits());
    }

  }
}
