import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(public updates: SwUpdate, private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: object) {
    if (updates.isEnabled) {
      this.ngZone.runOutsideAngular(() => {
        interval(6 * 60 * 60).subscribe(() => updates.checkForUpdate());
      });
    }
  }

  public checkForUpdates(): void {
    this.updates.available.subscribe((event) => this.promptUser());
  }

  private promptUser(): void {
    console.log('updating to new version');
    this.updates.activateUpdate().then(() =>
      Swal.fire({
        title: '¡Nueva versión disponible!',
        text: 'Haz clic en el botón aceptar.',
        type: 'info',
        allowEscapeKey: false,
        allowOutsideClick: false,
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'update-success',
        customClass: 'paymentData',
      }).then(() => {
        if (isPlatformBrowser(this.platformId)) {
          window.location.reload();
        }
      })
    );
  }
}
