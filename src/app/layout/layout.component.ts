import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../core';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export default class LayoutComponent {
  #auth = inject(AuthService);
  #router = inject(Router);

  signOut() {
    this.#auth
      .logout()
      .subscribe(() => this.#router.navigateByUrl('/auth/login'));
  }
}
