import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-loginform",
  templateUrl: "./loginform.component.html",
  styleUrls: ["./loginform.component.scss"]
})
export class LoginformComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  loginForm: FormGroup;
  isSubmitted  =  false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["",[ Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(64)]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    });
  };

  public login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value);
    // this.router.navigateByUrl('/admin');
  }


}
