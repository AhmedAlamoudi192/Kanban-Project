import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLoginpageComponent } from './email-loginpage.component';

describe('EmailLoginpageComponent', () => {
  let component: EmailLoginpageComponent;
  let fixture: ComponentFixture<EmailLoginpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailLoginpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailLoginpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
