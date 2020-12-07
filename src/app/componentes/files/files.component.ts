import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  public hostUrl = 'https://localhost:5001/Documentos';
  public ajaxSettings: object;
  public enablePersistence: boolean;
  public Path = '/CE3101';
  public enableRtl: boolean;
  constructor() {alert(this.Path); }

  public ngOnInit(): void {
    this.ajaxSettings = {
      url: this.hostUrl + '/FileOperations',
      getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
      uploadUrl: this.hostUrl + 'api/FileManager/Upload',
      downloadUrl: this.hostUrl + 'api/FileManager/Download'
    };
    this.Path = '/CE3101';
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
  }

}
