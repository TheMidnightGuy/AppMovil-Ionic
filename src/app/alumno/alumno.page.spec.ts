import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AlumnoPage } from './alumno.page';
import { By } from '@angular/platform-browser';

describe('(#4) Vista alumno', () => {
  let component: AlumnoPage;
  let fixture: ComponentFixture<AlumnoPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [AlumnoPage],
      imports: [IonicModule.forRoot(),
                HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });









});
