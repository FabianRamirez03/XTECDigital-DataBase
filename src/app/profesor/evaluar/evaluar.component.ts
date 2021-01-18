import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.component.html',
  styleUrls: ['./evaluar.component.scss']
})
export class EvaluarComponent implements OnInit {
  rubro = 'Examenes';
  evaluaciones = ['Examen 1', 'Examen 2'];
  imageByte: string;
  constructor() {
  }
  ngOnInit(): void {
  }

  setByteArray(files): void {
    const reader = new FileReader();
    // this.profile.image = files;
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      const bytes = reader.result;
      this.imageByte = bytes.toString();
    };
  }

}
