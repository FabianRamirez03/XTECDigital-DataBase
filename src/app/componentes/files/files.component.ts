import {Component, OnInit, ViewChild} from '@angular/core';
import {
  DetailsViewService,
  FileManagerComponent,
  NavigationPaneService,
  ToolbarService
} from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
  providers: [ NavigationPaneService, ToolbarService, DetailsViewService]
})
export class FilesComponent implements OnInit {
   public hostUrl = 'https://localhost:5001/Documentos';
  // public hostUrl = 'http://localhost:62869/';
  public ajaxSettings: object;
  public enablePersistence: boolean;
  public enableRtl: boolean;
  @ViewChild('filemanager', {static: true})
  public filemanagerObj: FileManagerComponent;
  public view: string;
  public curso: string;
  public grupo: number;
  constructor() {this.curso = 'CE3101'; this.grupo = 1; }

  public ngOnInit(): void {
    this.ajaxSettings = {
      url: this.hostUrl + '/FileOperations',
      getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
      uploadUrl: this.hostUrl + '/Upload',
      downloadUrl: this.hostUrl + '/Download'
    };
    this.view = 'Details';
    this.enableRtl = true;
    this.enablePersistence = true;
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
    if (args.action === 'Upload') {
      const data = JSON.parse(args.ajaxSettings.data);
      // Allow custom data for upload operations
      data.push({ Curso: this.curso});
      data.push({ Grupo: this.grupo});
      args.ajaxSettings.data = JSON.stringify(data);
      args.ajaxSettings.beforeSend = function(args) {
        // Setting authorization header
        args.httpRequest.setRequestHeader('Authorization', 'Bearer-1233');
      };
    }
    else{
      const Curso = JSON.parse(args.ajaxSettings.data);
      // Declare a custom parameter "column"
      Curso.Curso = 'CE3101';
      Curso.Grupo = 1;
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
        curso: 'CE3101',
        path: this.filemanagerObj.path,
        names: flag ? this.filemanagerObj.selectedItems : [''],
        data: files.length === 0 ? this.filemanagerObj.getSelectedFiles() : files,
        grupo: 1
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


}
