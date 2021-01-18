import {Component, OnInit, ViewChild} from '@angular/core';
import {
  DetailsViewService,
  FileManagerComponent,
  NavigationPaneService,
  ToolbarService
} from '@syncfusion/ej2-angular-filemanager';
import {MessengerService} from '../../MessengerService';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
  providers: [ NavigationPaneService, ToolbarService, DetailsViewService]
})
export class FilesComponent implements OnInit {
   public hostUrl = this.messenger.urlServer + 'Documentos';
  public ajaxSettings: object;
  public enablePersistence: boolean;
  public enableRtl: boolean;
  @ViewChild('filemanager', {static: true})
  public filemanagerObj: FileManagerComponent;
  public view: string;
  public curso: string;
  public isAdmin: boolean;
  public grupo: number;
  constructor(public messenger: MessengerService) {
    this.curso = this.messenger.curso.codigo;
    this.grupo = this.messenger.curso.grupo;
  }

  public ngOnInit(): void {
    this.ajaxSettings = {
      url: this.hostUrl + '/FileOperations',
      getImageUrl: this.hostUrl + '/GetImage',
      uploadUrl: this.hostUrl + '/Upload',
      downloadUrl: this.hostUrl + '/Download'
    };
    this.view = 'Details';
    this.enableRtl = true;
    this.enablePersistence = true;
    this.isAdmin = true;
  }
  // File Manager's file onSuccess function
  onAjaxSuccess(args: any): any {
    console.log('Ajax request successful');
  }
  // File Manager's file onError function
  onAjaxFailure(args: any): any {
    console.log('Ajax request has failed');
    try{
      const header = args.response.headers;
      let statusMessage = header.slice(header.indexOf('status'), header.indexOf('date'));
      statusMessage = statusMessage.slice(statusMessage.indexOf(',') + 1);
      args.statusText = statusMessage.trim();
    }
    catch {
      return;
    }
  }

  // File Manager's beforeSend event
  beforeSend(args: any): any {
    // Add custom parameter
    if (args.action === 'Upload' && this.messenger.tipoUsuario === 'profesor') {
      const data = JSON.parse(args.ajaxSettings.data);
      // Allow custom data for upload operations
      data.push({ Curso: this.curso});
      data.push({ Grupo: this.grupo});
      data.push({ Ubic: this.filemanagerObj.path});
      data.push({ admin: this.isAdmin});
      args.ajaxSettings.data = JSON.stringify(data);
      args.ajaxSettings.beforeSend = function(args) {
        // Setting authorization header
        args.httpRequest.setRequestHeader('Authorization', 'Bearer-1233');
      };
    }
    else{
      const Curso = JSON.parse(args.ajaxSettings.data);
      // Declare a custom parameter "column"
      Curso.Curso = this.curso;
      Curso.Grupo = this.grupo;
      Curso.admin = this.isAdmin;
      Curso.Ubic = this.filemanagerObj.path;
      // Add custom parameter to ajax settings
      args.ajaxSettings.data = JSON.stringify(Curso);
      // Ajax beforeSend event
      args.ajaxSettings.beforeSend = function(args) {
        // Setting authorization header
        args.httpRequest.setRequestHeader('Authorization', 'Bearer-1233');
      };
    }
  }

  public toolbarClick(args: any): void {
    if (args.item.id === this.filemanagerObj.element.id + '_tb_download') {
      // Preventing default download using toolbar
      args.cancel = true;
      this.customDownload([]);
    }
  }
  public menuClick(args: any): void {
    if (args.item.id === this.filemanagerObj.element.id + '_cm_download') {
      // Preventing default download using context menu
      args.cancel = true;
      this.customDownload(args.fileDetails);
    }
  }
  public customDownload(files): void {
    const flag = (this.filemanagerObj.selectedItems.length !== 0);
    if ((files.length !== 0) || flag) {
      // Creating data for the controller
      const data = {
        action: 'download',
        curso: this.curso,
        path: this.filemanagerObj.path,
        names: flag ? this.filemanagerObj.selectedItems : [''],
        data: files.length === 0 ? this.filemanagerObj.getSelectedFiles() : files,
        grupo: this.grupo,
        admin: this.isAdmin
      };
      // initiating a XHR request
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.open('POST', this.filemanagerObj.ajaxSettings.downloadUrl, true);
      xhr.responseType = 'blob';
      xhr.onload = function() {
        if (this.status === 200) {
          let name = '';
          // Getting file name from content-disposition header
          const header: string = xhr.getResponseHeader('Content-Disposition');
          if (header && header.indexOf('attachment') !== -1) {
            const regex = /name[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = regex.exec(header);
            if (matches != null && matches[1]) {
              name = matches[1].replace(/['"]/g, '');
            }
          }
          // saving the file locally using anchor tag
          const blob: Blob = new Blob([this.response], { type: xhr.getResponseHeader('Content-Type') });
          const anchorUrl: string = window.URL.createObjectURL(blob);
          if (name) {
            const anchor: HTMLAnchorElement = document.createElement('a');
            anchor.href = anchorUrl;
            anchor.download = name;
            anchor.click();
          }
          else {
            window.location = (anchorUrl as any);
          }
          setTimeout(function() { URL.revokeObjectURL(anchorUrl); }, 100);
        }
      };
      const fdata: FormData = new FormData();
      fdata.append('downloadInput', JSON.stringify(data));
      // Custom Header Added to XHR
      xhr.setRequestHeader('Custom-Header', 'Syncfusion');
      xhr.send(fdata);
    }
  }


  beforeImage(args: any): any {
    args.imageUrl = args.imageUrl + '&Curso=' + this.curso + '&Grupo=' + this.grupo.toString() + '&Ubic=' + this.filemanagerObj.path;
  }
}
