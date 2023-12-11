import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { CursoPage } from './curso.page';




describe('(#7) Curso', () => {
  let component: CursoPage;
  let fixture: ComponentFixture<CursoPage>;

 

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [CursoPage],
      imports: [IonicModule.forRoot(),
                HttpClientTestingModule,
                getFirestore,
                provideFirestore
               ],

    }).compileComponents();

    

    fixture = TestBed.createComponent(CursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
