import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../services/api/api.service';
import { Review } from '../../services/api/models';

@Component({
    selector: 'app-reviewer',
    templateUrl: './reviewer.component.html',
    styleUrls: ['./reviewer.component.scss'],
})
export class ReviewerComponent implements OnInit {
    @Input() review: Review = null;
    @Input() eventId: number = null;

    constructor(
        private api: APIService,
    ) { }

    ngOnInit() {
    }

    createReview(positive: boolean, negative: boolean) {
        let previous: Review = this.review;
        let body: string = this.review ? this.review.body : '';
        this.review = new Review({
            positive: positive,
            negative: negative,
            body: body,
        });
        this.api.createReview(this.eventId, positive, negative, body).subscribe(response => {}, error => {
            this.review = previous;
        });
    }

    deleteReview() {
        let previous: Review = this.review;
        this.review = null;
        this.api.deleteReview(this.eventId).subscribe(response => {}, error => {
            this.review = previous;
        });
    }

    updateReview(positive: boolean, negative: boolean) {
        if (this.review != null && this.review.positive == positive && this.review.negative == negative) {
            this.deleteReview();
        } else {
            this.createReview(positive, negative);
        }
    }

    submitReview(body) {
        this.api.createReview(this.eventId, this.review.positive, this.review.negative, body).subscribe(response => {
            this.review.body = body;
        });
    }
}
