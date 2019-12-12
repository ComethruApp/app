import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api/api.service';
import { User, Event_ } from '../../services/api/models';

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.page.html',
    styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
    id: number;
    searchedUsers: User[] = null;
    reviews: User[] = null;
    event: Event_ = null;

    constructor(
        private route: ActivatedRoute,
        private api: APIService,
    ) { }

    ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getData();
    }

    async getData() {
        this.api.getEventReviews(this.id).subscribe(reviews => {
            this.reviews = reviews;
        });
    }
}
