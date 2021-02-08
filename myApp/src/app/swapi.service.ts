import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ICharacter from './icharacter';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  constructor(private http: HttpClient) {}

  getCharacters() {
    return this.http.get<ICharacter[]>('http://localhost:4000/characters');
  }

  getCharacter(id: string | null) {
    return this.http.get<ICharacter>(`http://localhost:4000/characters/${id}`);
  }
}
