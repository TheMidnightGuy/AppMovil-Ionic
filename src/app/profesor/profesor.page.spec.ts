import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';


import { ProfesorPage } from './profesor.page';
import { By } from '@angular/platform-browser';

describe('(#6) Vista Profesor', () => {
  let component: ProfesorPage;
  let fixture: ComponentFixture<ProfesorPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ProfesorPage],
      imports: [IonicModule.forRoot(),
                HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
