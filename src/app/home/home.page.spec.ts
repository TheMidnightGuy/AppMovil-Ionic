import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { HomePage } from './home.page';
import { By } from '@angular/platform-browser';

describe('(#1) PAGINA PRINCIPAL' , () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(),
                HttpClientTestingModule,
                Router,
                ActivatedRoute,
                RouterTestingModule
              ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe Existir HomePage', () => {
    const fixture = TestBed.createComponent(HomePage);
    const home = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  //Redireccionar a Login
  it('Redireccionar a login', () => {
    const button = fixture.debugElement.query(By.css('ion-button'))
    button.nativeElement.click();
    fixture.whenStable();
    expect(router.navigate).toBe('/login');
  });

  //Redireccionar a Registro
  it('Redireccionar a registro', () => {
    const button = fixture.debugElement.query(By.css('ion-button'))
    button.nativeElement.click();
    fixture.whenStable();
    expect(router.navigate).toBe('/registro');
  });






});


