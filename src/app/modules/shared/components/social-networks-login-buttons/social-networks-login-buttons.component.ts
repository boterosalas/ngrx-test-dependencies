import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
declare const google: any;
declare const FB: any;

@Component({
  selector: 'app-social-networks-login-buttons',
  templateUrl: './social-networks-login-buttons.component.html',
  styleUrls: ['./social-networks-login-buttons.component.scss']
})
export class SocialNetworksLoginButtonsComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn: ElementRef;
  @Input() isLogin: boolean = true;
  @Output() user: EventEmitter<any> = new EventEmitter();
  origin = environment.URL_BLOB;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngAfterViewInit(): void {
    this.fbInit();
  }

  fbInit() {
    (<any>window).fbAsyncInit = function () {
      FB.init({
        appId: environment.FACEBOOK_SIGNIN_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v15.0'
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  facebookLogin() {
    const emit = this.user.emit.bind(this);
    const isLogin = this.isLogin;
    FB.login(function ({ authResponse }) {
      const { accessToken } = authResponse;
      if (authResponse) {
        FB.api('/me?fields=id,email,first_name,last_name', (res) => {
          if (isLogin) {
            const { email } = res;
            emit({
              token: accessToken,
              username: email,
            });
          } else {
            const { email, first_name, last_name } = res;
            emit({
              email,
              firstName: first_name,
              lastName: last_name,
              origin: 'FACEBOOK',
              token: accessToken,
            });
          }
        })
      }
    }, {
      scope: 'email',
      return_scopes: true
    })
  }

  googleLogin() {
    google.accounts.oauth2.initTokenClient({
      client_id: environment.GOOGLE_SIGNIN_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/userinfo.profile',
      callback: this.googleLoginCallback.bind(this),
    }).requestAccessToken();
  }

  googleLoginCallback(response: any) {
    const { access_token } = response;
    this.httpClient.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`).subscribe((res: any) => {
      if (this.isLogin) {
        const { email } = res;
        this.user.emit({
          token: access_token,
          username: email,
        })
      } else {
        const { email, given_name, family_name } = res;
        this.user.emit({
          email,
          firstName: given_name,
          lastName: family_name,
          origin: 'GOOGLE',
          token: access_token,
        })
      }
    })
  }

}
