import { Component, OnInit } from '@angular/core';
import { BarcodeScanner} from '@capacitor-community/barcode-scanner';
import { ConsumoAPIService } from '../services/consumo-api.service';
import { Firestore, getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query } from '@angular/fire/firestore';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQRPage implements OnInit {

  scanActive: boolean = false;

  constructor(private userService: ConsumoAPIService) { }

  ngOnInit() {
  }

    // ----- INICIO SECCION QR -----

    async checkPermission() {
      return new Promise(async (resolve, reject) => {
        const status = await BarcodeScanner.checkPermission({ force: true });
        if (status.granted) {
          resolve(true);
        } else if (status.denied) {
          BarcodeScanner.openAppSettings();
          resolve(false);
        }
      });
    }
  
    async startScanner() {
      const allowed = await this.checkPermission();
  
      if (allowed) {
        this.scanActive = true;
        BarcodeScanner.hideBackground();
  
        const result = await BarcodeScanner.startScan();
  
        if (result.hasContent) {
          this.scanActive = false;
          alert(result.content); //The QR content will come out here
          const alumno = {
            nombre: 'Juan',
            apellido: 'Pérez',
            asistencia: 'Presente'
          };
          const response = await this.userService.addAlumno(alumno);
          //Handle the data as your heart desires here
        } else {
          alert('NO DATA FOUND!');
        }
      } else {
        alert('NOT ALLOWED!');
      }
    }
  
    stopScanner() {
      BarcodeScanner.stopScan();
      this.scanActive = false;
    }
  
    ionViewWillLeave() {
      BarcodeScanner.stopScan();
      this.scanActive = false;
    }

}