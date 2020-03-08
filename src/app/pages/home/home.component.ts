import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { WebdavCli, WebdavCliServer, getRandomString, RIGHTS } from 'webdav-cli';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ElectronService } from "../../shared/services/electron.service";
import { StorageService } from "../../shared/services/storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @ViewChild('logsRef') logsRef: ElementRef;
  checkoutForm: FormGroup;
  webdavCliRights = RIGHTS;
  webdavCliServer: WebdavCliServer;
  logs = ['Homepage: https://github.com/svtslv/webdav-gui'];

  constructor(
    public ngZone: NgZone,
    public formBuilder: FormBuilder,
    public storageService: StorageService,
    public electronService: ElectronService,
  ) {}

  ngOnInit(): void {
    const config = this.storageService.getLocalStorage('webDAVConfig') || {};

    const defaultConfig = {
      path: './',
      host: '127.0.0.1',
      port: 1900,
      digest: false,
      username: getRandomString(16),
      password: getRandomString(16),
      ssl: false,
      sslKey: undefined,
      sslCert: undefined,
      rights: undefined,
    };

    this.checkoutForm = this.formBuilder.group({ ...defaultConfig, ...config });
  }

  async addLogs(logs) {
    this.logs = [...this.logs.slice(0, 1000), ...logs];
    setTimeout(() => this.logsRef.nativeElement.scrollTop = this.logsRef.nativeElement.scrollHeight, 100);
  }

  async getPath() {
    const response = await this.electronService.remote.dialog.showOpenDialog({ properties: ['openDirectory']});
    console.log(response.filePaths[0]);
    return this.checkoutForm.patchValue({ path: response.filePaths[0] });
  }

  async getSSLKey() {
    const response = await this.electronService.remote.dialog.showOpenDialog({ properties: ['openFile']});
    return this.checkoutForm.patchValue({ sslKey: response.filePaths[0] });
  }

  async getSSLCert() {
    const response = await this.electronService.remote.dialog.showOpenDialog({ properties: ['openFile']});
    return this.checkoutForm.patchValue({ sslCert: response.filePaths[0] });
  }

  async onWebdavStart(config) {
    this.storageService.setLocalStorage('webDAVConfig', config);
    config.rights = config.rights && config.rights[0] ? config.rights : undefined;

    const webdavCli = new WebdavCli(config);
    this.webdavCliServer = await webdavCli.start();

    if(this.webdavCliServer && this.webdavCliServer.config) {
      this.addLogs([
        `Server running at ${ this.webdavCliServer.config.url }`,
        `[rights]: ${ this.webdavCliServer.config.rights }`,
        `[digest]: ${ this.webdavCliServer.config.digest }`,
        `username: ${ this.webdavCliServer.config.username }`,
        `password: ${ this.webdavCliServer.config.password }`,
      ]);
      this.webdavCliServer.on('log', (ctx, fs, path, log) => {
        this.ngZone.run(() => this.addLogs([log]));
      });
    }
  }

  async onWebdavStop() {
    await this.webdavCliServer.stopAsync();
    this.webdavCliServer = null;
    this.addLogs(['Server is stopped']);
  }
}
