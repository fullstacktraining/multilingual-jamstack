import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import ICharacter from 'src/app/icharacter';
import { SwapiService } from 'src/app/swapi.service';
import { switchMap } from 'rxjs/operators';
import { buildUrl } from 'cloudinary-build-url';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterComponent implements OnInit {
  constructor(private swapi: SwapiService, private route: ActivatedRoute) {}

  character$: Observable<ICharacter> | undefined;

  ngOnInit(): void {
    this.character$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.swapi.getCharacter(params.get('id')))
    );
  }

  loadImage(character: ICharacter) {
    return buildUrl(`jam/${character.image}`, {
      cloud: {
        cloudName: 'tamas-demo',
      },
      transformations: {
        gravity: 'face',
        resize: {
          type: 'thumb',
          width: 150,
          height: 150,
        },
      },
    });
  }
}
