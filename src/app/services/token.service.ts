import { Injectable } from "@angular/core";
import decode from "jwt-decode";


@Injectable({
  providedIn: "root"
})
export class TokenService {
  constructor() {
  }

  user: any;
  token = localStorage.getItem("ACCESS_TOKEN");

  public userInfo() {
    if (this.token !== null) {
      this.user = decode(this.token);
      return this.user;
     }
  }
  
}
