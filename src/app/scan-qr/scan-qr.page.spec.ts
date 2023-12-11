import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarcodeScanner} from '@capacitor-community/barcode-scanner';
import { ScanQRPage } from './scan-qr.page';


describe('(#5 Scan QR)', () => {
  let component: ScanQRPage;
  let fixture: ComponentFixture<ScanQRPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScanQRPage],
      providers: [
        {
          provide: BarcodeScanner,
          useValue: {
            checkPermission: () => Promise.resolve({ granted: true }), // Simular el escenario de permiso concedido
            hideBackground: () => {}, // Simular función
            startScan: () =>
              Promise.resolve({ hasContent: true, content: 'some-content' }), // Simular el escaneo con contenido
            stopScan: () => {}, // Simular función
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScanQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Comenzar escaneo QR', async () => {
    component.startScanner();
    await fixture.whenStable(); // Esperar a que las promesas se resuelvan

    expect(component.scanActive).toBe(true); // Verificar que el scanner está activado  expect(component.enviarCorreo).toHaveBeenCalled(); // Verificar que enviarCorreo fue llamado
  });



});
