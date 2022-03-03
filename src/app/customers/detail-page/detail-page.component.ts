import { CustomerDataService } from './../customer-data.service';
import { tap } from 'rxjs/internal/operators/tap';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  customerId: string;
  customer: Observable<any>;

  constructor(
    private seo: SeoService,
    private db: AngularFirestore,
    private route: ActivatedRoute,
    public data: CustomerDataService
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.customer = this.data.getCustomer(this.customerId).pipe(
      tap((cust) =>
        this.seo.generateTags({
          title: cust.name,
          description: cust.bio,
          image: cust.image,
        })
      )
    );
  }
}
