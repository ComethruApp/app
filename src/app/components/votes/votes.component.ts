import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../services/api/api.service';
import { Vote } from '../../services/api/models';

@Component({
    selector: 'app-votes',
    templateUrl: './votes.component.html',
    styleUrls: ['./votes.component.scss'],
})
export class VotesComponent implements OnInit {
    @Input() vote: Vote = null;
    @Input() eventId: number = null;

    constructor(
        private api: APIService,
    ) { }

    ngOnInit() {
    }

    sendVote(positive: boolean, negative: boolean) {
        let review: string = this.vote ? this.vote.review : '';
        this.api.vote(this.eventId, positive, negative, review).subscribe(response => {
            this.vote = new Vote({
                positive: positive,
                negative: negative,
                review: review,
            });
            console.log(this.vote);
        });
    }

    sendUnvote() {
        this.api.unvote(this.eventId).subscribe(response => {
            this.vote = null;
        });
    }

    updateVote(positive: boolean, negative: boolean) {
        if (this.vote != null && this.vote.positive == positive && this.vote.negative == negative) {
            this.sendUnvote();
        } else {
            this.sendVote(positive, negative);
        }
    }

    submitReview(review) {
        this.api.vote(this.eventId, this.vote.positive, this.vote.negative, review).subscribe(response => {
            this.vote.review = review;
        });
    }
}
