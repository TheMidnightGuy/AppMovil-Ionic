import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';

import { ErrorPagePage } from './error-page.page';

describe('(#8) PAGINA 404', () => {
  let component: ErrorPagePage;
  let fixture: ComponentFixture<ErrorPagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorPagePage],
      imports: [IonicModule.forRoot(),
                HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
