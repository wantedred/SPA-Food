import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.css']
})
export class ValidateEmailComponent implements OnInit {

  validationToken: string = null;
  username: string = null;

  checking: boolean = false;
  errorMessage: string = null;

  constructor(
    private route: ActivatedRoute,
    private accService: AccountService,
    private router: Router) { 
    this.route.queryParams.subscribe(params => {
      this.validationToken = params['t'];
      this.username = params['u'];
    });
    if (this.validationToken == null || this.validationToken == "" || this.username == null || this.username == "") {
      this.router.navigateByUrl("/");
      return;
    }
    this.validationToken = decodeURIComponent(this.validationToken);
    this.username = decodeURIComponent(this.username);
  }

  ngOnInit(): void {
    this.checking = true;

    const resp: Promise<string> = this.accService.confirmEmail(this.username, this.validationToken);

    resp.then(msg => {
      if (msg != null) {
        this.errorMessage = msg;
        this.checking = false;
        return;
      }
      this.checking = false;
      this.router.navigateByUrl("/account/");
    });
  }

}
