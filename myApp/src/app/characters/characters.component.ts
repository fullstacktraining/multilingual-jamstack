import { Component, OnInit } from '@angular/core';
import ICharacter from '../icharacter';
import { SwapiService } from '../swapi.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  constructor(private swapi: SwapiService) {}
  characters: ICharacter[] = [];

  ngOnInit(): void {
    this.swapi
      .getCharacters()
      .subscribe((data: ICharacter[]) => (this.characters = data));
  }
}
