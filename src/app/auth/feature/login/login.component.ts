import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/authentication';
import { Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  #fb = inject(FormBuilder);
  #toast = inject(HotToastService);
  #auth = inject(AuthService);
  #router = inject(Router);
  #cdr = inject(ChangeDetectorRef);

  isSubmitting: boolean = false;

  loginForm = this.#fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    console.log(this.#auth.check());
    if (this.#auth.check()) {
      this.#router.navigateByUrl('/');
    }
  }

  login() {
    this.isSubmitting = true;
    this.#auth
      .login(this.username!.value || '', this.password!.value)
      .pipe(filter((authenticated) => authenticated))
      .subscribe({
        next: () => {
          this.#toast.show('👏 Successfully logged in.');
          this.#router.navigateByUrl('/');
          this.isSubmitting = false;
        },
        error: (errorRes: HttpErrorResponse) => {
          if (errorRes.status === 422) {
            const form = this.loginForm;
            const errors = errorRes.error.errors;
            Object.keys(errors).forEach((key) => {
              form.get(key === 'email' ? 'username' : key)?.setErrors({
                remote: errors[key][0],
              });
            });
          }

          if (errorRes.status === 401 || errorRes.status === 404) {
            this.#toast.warning('Invalid username or password.');
          }
          this.isSubmitting = false;

          this.#cdr.markForCheck();
        },
      });
  }
}
