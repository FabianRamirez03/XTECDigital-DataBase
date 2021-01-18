import {Injectable, InjectionToken} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  usuario: any = {};
  tipoUsuario: any;
  curso: any = {};
  evaluacion: any = {};
  // urlServer = 'https://localhost:5001/';
  urlServer = 'https://xtecdigicalserver.azurewebsites.net/';
  private messageSource: BehaviorSubject<string> = new BehaviorSubject('initialValue');
  public message = this.messageSource.asObservable();
  public setMessage(value: any): void{
    this.messageSource.next(value);
  }
}
export const MESSENGER_SERVICE = new InjectionToken<MessengerService>('messengerservice');
