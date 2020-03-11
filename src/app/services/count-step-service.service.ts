import { Injectable } from '@angular/core';
import {Gyroscope, GyroscopeOptions, GyroscopeOrientation} from '@ionic-native/gyroscope/ngx';
import {DeviceMotion, DeviceMotionAccelerationData} from '@ionic-native/device-motion/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Result} from '../model/Result';
import { Data } from '../model/Data';

const apiUrl = 'https://185.216.25.16:5000/datas';

@Injectable({
  providedIn: 'root'
})
export class CountStepServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  public Array = [];
  public step = 0;
  public Data: Data;
  public stepStatus = false;

  public result: Result;

  public maxX: number;
  public minX: number;

  public maxY: number;
  public minY: number;

  public maxZ: number;
  public minZ: number;

  public x = 0;
  public y = 0;
  public z = 0;

  public accX = 0;
  public accY = 0;
  public accZ = 0;

  public positionX = 0;
  public positionY = 0;
  public positionZ = 0;

  public accuracy: any;
  public long: any;
  public lat: any;
  public speed: any;

  public timestamp: any;

  constructor(private gyroscope: Gyroscope,
              private geolocation: Geolocation,
              private device: Device,
              private deviceMotion: DeviceMotion,
              private api: HttpClient) {
    this.minX = 0;
    this.maxX = 0;
    this.minY = 0;
    this.maxY = 0;
    this.minZ = 0;
    this.maxZ = 0;
    this.gyro();
  }
  setstep(param1) {
    this.step = param1;
  }

  getstep() {
    const temp = this.step;
    return temp;
  }

  clearstep() {
    this.step = undefined;
  }

  gyro() {
    this.geolocation.getCurrentPosition().then((resp) => {}).catch((error) => {
      this.accuracy = 'error';
      this.long = 'error';
      this.lat = 'error';
      this.speed = 'error';
    });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.speed = data.coords.speed;
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      this.accuracy = data.coords.accuracy;
    });

    const options: GyroscopeOptions = {
      frequency: 50
    };

    this.gyroscope.getCurrent(options).then().catch();


    this.gyroscope.watch().subscribe((orientation: GyroscopeOrientation) => {
      this.x = orientation.x;
      this.z = orientation.z;
      this.y = orientation.y;
    });


    this.deviceMotion.getCurrentAcceleration().then().catch();

    this.deviceMotion.watchAcceleration({frequency: 50}).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.accX = acceleration.x;
      this.accZ = acceleration.z;
      this.accY = acceleration.y;
      this.timestamp = acceleration.timestamp;
    });

    setInterval(() => {
      this.position(this.accX, this.accY, this.accZ);
      if (this.minX > this.accX) {
        this.minX = this.accX;
      }
      if (this.maxX < this.accX) {
        this.maxX = this.accX;
      }
      if (this.minY > this.accY) {
        this.minY = this.accY;
      }
      if (this.maxY < this.accY) {
        this.maxY = this.accY;
      }
      if (this.minZ > this.accZ) {
        this.minZ = this.accZ;
      }
      if (this.maxZ < this.accZ) {
        this.maxZ = this.accZ;
      }
      this.Data = {
        x: this.x,
        y: this.y,
        z: this.z,
        positionX: this.positionX,
        positionY: this.positionY,
        positionZ: this.positionZ,
        accX: this.accX,
        accY: this.accY,
        accZ: this.accZ,
        steps: this.step,
        accuracy: this.accuracy,
        long: this.long,
        lat: this.lat,
        speed: this.speed,
        timestamp: this.timestamp,
        id_device: this.device.uuid
      };

      this.Array.push(this.Data);
    }, 50);

    setInterval(() => {
      const x = (this.maxX - this.minX);
      const y = (this.maxY - this.minY);
      const z = (this.maxZ - this.minZ);
      this.result = {
        X: x,
        Y: y,
        Z: z,
      };
      const AxeMax = Math.max(this.result.X, this.result.Y, this.result.Z);

      if ( this.result.X === AxeMax) {
        const treshold = ((this.minX + this.maxX) / 2);
        let somme = 0;
        let moyenne = 0;


        this.Array.forEach(function(element) {
          moyenne += element.accX;
        });
        moyenne = (moyenne / this.Array.length );

        for (let i = 0; i < this.Array.length; i++) {
          somme += (Math.pow(this.Array[i].accX - moyenne, 2));
        }
        let stepValid = 0;
        for (let i = 0; i < this.Array.length; i++) {
          const a = i + 1;
          if (this.Array[i].accX <= 8.5 && this.Array[i].accX >= -8.5) {
            const et = Math.sqrt((somme / (this.Array.length - 1)));
            if (i !== (this.Array.length - 1) && (this.Array[i].accX < et || this.Array[i].accX > (et * -1))) {
              if (this.Array[i].accX >= treshold && this.Array[a].accX <= treshold) {
                stepValid++;
              }
            }
          }
        }
        if ( this.stepStatus ) {
          if (stepValid <= 3 && stepValid >= 1) {
            this.step = (Number(this.step) + Number(stepValid));
          } else {
            this.stepStatus = false;
          }
        } else {
          if (stepValid <= 3 && stepValid >= 1) {
            this.stepStatus = true;
          }
        }
      }
      if ( this.result.Y === AxeMax ) {
        const treshold = ((this.minY + this.maxY) / 2);
        let somme = 0;
        let moyenne = 0;
        let stepValid = 0;
        this.Array.forEach(function(element) {
          moyenne += element.accY;
        });
        moyenne = (moyenne / this.Array.length );

        for (let i = 0; i < this.Array.length; i++) {
          somme += (Math.pow(this.Array[i].accY - moyenne, 2));
        }


        for (let i = 0; i < this.Array.length; i++) {
          const a = i + 1;
          if (this.Array[i].accY <= 8.5 && this.Array[i].accY >= -8.5) {
            const et = Math.sqrt((somme / (this.Array.length - 1)));

            if (i !== (this.Array.length - 1) && (this.Array[i].accY < et || this.Array[i].accY > (et * -1))) {
              if (this.Array[i].accY >= treshold && this.Array[a].accY <= treshold) {
                stepValid++;
              }
            }
          }
        }
        if ( this.stepStatus ) {
          if (stepValid <= 3 && stepValid >= 1) {
            this.step = (Number(this.step) + Number(stepValid));
          } else {
            this.stepStatus = false;
          }
        } else {
          if (stepValid <= 3 && stepValid >= 1) {
            this.stepStatus = true;
          }
        }
      }
      if ( this.result.Z == AxeMax ) {
        const treshold = ((this.minZ + this.maxZ) / 2);
        let somme = 0;
        let moyenne = 0;
        let stepValid = 0;
        this.Array.forEach(function(element) {
          moyenne += element.accZ;
        });
        moyenne = (moyenne / this.Array.length );

        for (let i = 0; i < this.Array.length; i++) {
          somme += (Math.pow(this.Array[i].accZ - moyenne, 2));
        }
        for (let i = 0; i < this.Array.length; i++) {
          const a = i + 1;
          if (this.Array[i].accZ <= 8.5 && this.Array[i].accZ >= -8.5) {
            const et = Math.sqrt((somme / (this.Array.length - 1)));
            if (i !== (this.Array.length - 1) && (this.Array[i].accZ < et || this.Array[i].accZ > (et * -1))) {
              if (this.Array[i].accZ >= treshold && this.Array[a].accZ <= treshold) {
                stepValid++;
              }
            }
          }
        }
        if ( this.stepStatus ) {
          if (stepValid <= 3 && stepValid >= 1) {
            this.step = (Number(this.step) + Number(stepValid));
          } else {
            this.stepStatus = false;
          }
        } else {
          if (stepValid <= 3 && stepValid >= 1) {
            this.stepStatus = true;
          }
        }
      }
      if (this.stepStatus && this.step > 0) {
        this.api.post(apiUrl + '/add', JSON.stringify(this.Array), this.httpOptions).subscribe();
      }
      this.Array.splice(0, 100);
      this.result.X = 0;
      this.result.Y = 0;
      this.result.Z = 0;
      this.maxX = 0;
      this.minX = 0;
      this.maxY = 0;
      this.minY = 0;
      this.maxZ = 0;
      this.minZ = 0;
    }, 1000);
  }
  position(accX, accY, accZ) {
    this.positionX = Number(accX * 0.5 * 0.01) + Number(this.positionX) + Number(accX * 0.01);
    this.positionY = Number(accY * 0.5 * 0.01) + Number(this.positionY) + Number(accY * 0.01);
    this.positionZ = Number(accZ * 0.5 * 0.01) + Number(this.positionZ) + Number(accZ * 0.01);
  }
}
