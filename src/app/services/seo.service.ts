import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router
  ) {}

  generateTags({ title = '', description = '', image = '' }) {
    this.title.setTitle(title);
    this.meta.addTags([
      //open graph
      { name: 'og:url', content: `https://ahmedalamoudi.io${this.router.url}` },
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:image', content: image },
      //twitter Card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@???' },
    ]);
  }
}
