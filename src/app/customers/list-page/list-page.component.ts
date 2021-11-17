import { CustomerDataService } from './../customer-data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { SeoService } from './../../services/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  constructor(
    private seo: SeoService,
    private db: AngularFirestore,
    public data: CustomerDataService
  ) {}

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'Customers List',
      description: 'A List filled with customers',
    });

    this.data.subscribeToCustomers();
  }
}
