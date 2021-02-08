import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.css'],
})
export class LangSelectorComponent implements OnInit {
  language: string | undefined = 'English';
  locale: string = '';

  languages = [
    {
      code: 'en',
      label: 'English',
    },
    {
      code: 'es',
      label: 'Spanish',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.locale = window.location.pathname.split('/')[1];
    this.language = this.languages.find(
      (lang) => lang.code === this.locale
    )?.label;
  }

  updateLocation(value: string) {
    // window.location.href = `${value}`;
    window.location.replace(`${window.location.origin}/${value}`);
  }
}
