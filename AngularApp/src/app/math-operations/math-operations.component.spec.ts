import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathOperationsComponent } from './math-operations.component';

describe('MathOperationsComponent', () => {
  let component: MathOperationsComponent;
  let fixture: ComponentFixture<MathOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MathOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
