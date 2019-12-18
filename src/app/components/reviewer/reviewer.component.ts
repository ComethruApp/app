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
        let body: string = this.review ? this.review.body : '';
        this.api.createReview(this.eventId, positive, negative, body).subscribe(response => {
            this.review = new Review({
                positive: positive,
                negative: negative,
                body: body,
            });
            console.log(this.review);
        });
    }

    deleteReview() {
        this.api.deleteReview(this.eventId).subscribe(response => {
            this.review = null;
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
