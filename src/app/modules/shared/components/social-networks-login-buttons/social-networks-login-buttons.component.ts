import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import decode from 'jwt-decode';
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

  ngAfterViewInit(): void {
    this.googleInit();
    this.fbInit();
  }

  emit(user: any) {
    this.user.emit(user);
  }

  fbInit() {
    (<any>window).fbAsyncInit = function () {
      FB.init({
        appId: environment.FACEBOOK_SIGNIN_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v15.0'
      });
      FB.getLoginStatus((response) => {
        console.log(response);
        if (response.status === 'connected') {
          FB.logout();
        }
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  fbLogin() {
    const emit = this.handleCredentialResponse.bind(this);
    FB.login(function(response){
      console.log('response', response)
      if (response.authResponse) {
        FB.api('/me?fields=id,email,first_name,last_name', (res) => {
          emit(res);
        })
      }
    }, {
      scope: 'email',
      return_scopes: true
    })
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: environment.GOOGLE_SIGNIN_CLIENT_ID,
      callback: this.handleCredentialResponse.bind(this),
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      // customization attributes
      {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: this.isLogin ? 'continue_with' : 'signup_with',
        shape: 'rectangular',
        logo_alignment: 'center',
        width: '300',
        height: '100'
      }
    );
  }

  handleCredentialResponse(response: any) {
    const user: any = {}
    if(response.credential){
      const token = decode(response.credential);
      user.email = token.email;
      user.firstName = token.given_name;
      user.lastName = token.family_name;
      user.id = token.sub
    }else{
      user.email = response.email;
      user.firstName = response.first_name;
      user.lastName = response.last_name;
      user.id = response.id;
    }
    this.user.emit(user);
  }

}
