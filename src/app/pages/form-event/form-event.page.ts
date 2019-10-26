import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { APIService } from '../../services/api/api.service';

@Component({
    selector: 'app-form-event',
    templateUrl: './form-event.page.html',
    styleUrls: ['./form-event.page.scss'],
})
export class FormEventPage implements OnInit {

    constructor(
        private apiService: APIService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    submit(form) {
        // TODO: also support update!
        this.apiService.createEvent(form.value).subscribe((res)=>{
            this.router.navigateByUrl('tabs');
        });
    }

}
