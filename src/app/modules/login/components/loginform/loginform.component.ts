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
  emailPattern = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";

  ngOnInit() {
    this.loginForm = this.fb.group({
      Username: ["",[ Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(64)]],
      Password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  };

  public login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(resp=> {
      const token = JSON.stringify(resp);
      localStorage.setItem('ACCESS_TOKEN', token);
      // this.router.navigateByUrl('/admin');
    });
  }


}
