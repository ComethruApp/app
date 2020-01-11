import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api/api.service';
import { Review } from '../../services/api/models';

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.page.html',
    styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
    id: number;
    reviews: Review[] = null;
    positiveCount: number;
    neutralCount: number;
    negativeCount: number;

    constructor(
        private route: ActivatedRoute,
        private api: APIService,
    ) { }

    async ngOnInit() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getData();
    }

    async getData() {
        this.api.getEventReviews(this.id).subscribe(reviews => {
            let positiveReviews: Review[] = [];
            let  neutralReviews: Review[] = [];
            let negativeReviews: Review[] = [];
            this.positiveCount = 0;
            this.neutralCount = 0;
            this.negativeCount = 0;
            for (let review of reviews) {
                if (review.positive && !review.negative) {
                    this.positiveCount++;
                    if (review.body) positiveReviews.push(review);
                } else if (!review.positive && !review.negative) {
                    this.neutralCount++;
                    if (review.body) neutralReviews.push(review);
                } else if (!review.positive && review.negative) {
                    this.negativeCount++;
                    if (review.body) negativeReviews.push(review);
                }
            }
            this.reviews = positiveReviews.concat(neutralReviews).concat(negativeReviews);
        });
    }

    doRefresh(event) {
        this.getData().then(() => event.target.complete());
    }
}
