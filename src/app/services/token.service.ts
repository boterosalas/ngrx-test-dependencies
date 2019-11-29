import { Injectable } from "@angular/core";
import decode from "jwt-decode";


@Injectable({
  providedIn: "root"
})
export class TokenService {
  constructor() {
  }

  user: any;
  
  public userInfo() {
    let token = localStorage.getItem("ACCESS_TOKEN");
    if (token !== null) {
      this.user = decode(token);
      return this.user;
     }
  }
  
}
