import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  public hostUrl = 'https://ej2-aspcore-service.azurewebsites.net/';
  public ajaxSettings: object;
  public enablePersistence: boolean;
  constructor() { }

  public ngOnInit(): void {
    this.ajaxSettings = {
      url: this.hostUrl + 'api/FileManager/FileOperations',
      getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
      uploadUrl: this.hostUrl + 'api/FileManager/Upload',
      downloadUrl: this.hostUrl + 'api/FileManager/Download'
    };
    this.enablePersistence = true;
  }

  // File Manager's file onSuccess function
  onAjaxSuccess(args: any): any {
    console.log('Ajax request successful');
  }
  // File Manager's file onError function
  onAjaxFailure(args: any): any {
    console.log('Ajax request has failed');
  }

}
