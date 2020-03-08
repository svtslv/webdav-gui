import { Component } from '@angular/core';
import { ElectronService } from './shared/services/electron.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(
    public electronService: ElectronService
  ) {
    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
}
