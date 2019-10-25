import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { APIService } from '../../services/api/api.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private user: User = null;

  constructor(
    public loadingCtrl: LoadingController,
    private apiService: APIService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    this.presentLoading(loading);

    // TODO: shouldn't just be me!
    this.apiService.getMe().subscribe((user: User) => {
        loading.dismiss();
        this.user = user;
    });
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  logout(){
    this.authService.logout()
    .then(res => {
        // TODO: redirect to splash page instead
      this.router.navigate(["/login"]);
    }, err => {
      console.log(err);
    })
  }
}
