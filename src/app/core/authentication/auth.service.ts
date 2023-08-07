import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, iif, merge, of } from 'rxjs';
import { catchError, map, share, switchMap, tap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/shared/services/storage.service';
import { ApiService } from 'src/app/shared/data-access/api/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #storageService = inject(LocalStorageService);
  #http = inject(HttpClient);

  check() {
    return this.#storageService.has('user');
  }

  login(username: string, password: string) {
    return this.#http.post('/Account/SignIn', { username, password }).pipe(
      tap((user) => this.#storageService.set('user', user)),
      map(() => this.check())
    );
  }

  logout() {
    return of(this.#storageService.remove('user'));
  }
}
