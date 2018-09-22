import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  readonly publicKey = 'BO8Q5xwPDGMT-pISGS9B6eLSQZ1VDUxUaegDAdkasBwrAMAkBuoCpNm47CfV7yzdulw9lbgpWPNZcJQeXYWekjU';

  constructor(
    private swPush: SwPush,
    private http: HttpClient
  ) { }

  public offerNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.publicKey
    }).then( (sub: PushSubscription) => {
      console.log({ sub });
      this.http.post('/api/notifications', sub).subscribe( () => {
        console.log('sub ok !');
      }, (err) => {
        console.log('sub fail');
      });
    }).catch( () => {
      console.log('error');
    })
  }

  public sendTestNotification() {
    this.http.get('/api/notifications/test').subscribe();
  }

}
