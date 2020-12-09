import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  public hostUrl = 'https://localhost:5001/Documentos';
 // public hostUrl = 'http://localhost:62869/';
  public ajaxSettings: object;
  public enablePersistence: boolean;
  public Path : string;
  public enableRtl: boolean;
  public view: string;
  constructor() {}

  public ngOnInit(): void {
    this.ajaxSettings = {
      url: this.hostUrl + '/FileOperations',
      getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
      uploadUrl: this.hostUrl + 'api/FileManager/Upload',
      downloadUrl: this.hostUrl + 'api/FileManager/Download'
    };
    this.view = 'Details';
    // this.Path = '/CE3101';
    this.enableRtl = true;
    this.enablePersistence = false;
  }
  // File Manager's file onSuccess function
  onAjaxSuccess(args: any): any {
    console.log('Ajax request successful');
  }
  // File Manager's file onError function
  onAjaxFailure(args: any): any {
    console.log('Ajax request has failed');
  }

  // File Manager's beforeSend event
  beforeSend(args: any): any {
    // Add custom parameter
    const Curso = JSON.parse(args.ajaxSettings.data);
    // Declare a custom parameter "column"
    Curso.Curso = 'CE3101';
    Curso.Grupo = 1;
    // Add custom parameter to ajax settings
    args.ajaxSettings.data = JSON.stringify(Curso);
    // Ajax beforeSend event
    args.ajaxSettings.beforeSend = function (args) {
      // Setting authorization header
      args.httpRequest.setRequestHeader('Authorization', 'Bearer-1233')
    };
  }

}
