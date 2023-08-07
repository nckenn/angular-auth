import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { AuthService, User } from '../authentication';
import { LocalStorageService } from 'src/app/shared/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(
    private authService: AuthService,
    private permissonsService: NgxPermissionsService,
    private rolesService: NgxRolesService,
    private storageService: LocalStorageService
  ) {}

  /**
   * Load the application only after get the essential informations
   * such as permissions and roles.
   */
  load() {
    return new Promise<void>((resolve, reject) => {
      const user = this.storageService.get('user');
      this.setPermissions(user);

      return resolve();
    });
  }

  private setPermissions(user: User) {
    this.rolesService.flushRoles();
    this.permissonsService.flushPermissions();
    user.roles?.map((role) =>
      this.rolesService.addRoleWithPermissions(role, [])
    );
  }
}
