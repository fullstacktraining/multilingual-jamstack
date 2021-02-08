import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterComponent } from './character/character.component';

import { CharactersComponent } from './characters.component';

const routes: Routes = [
  { path: '', component: CharactersComponent },
  { path: ':id', component: CharacterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersRoutingModule {}
