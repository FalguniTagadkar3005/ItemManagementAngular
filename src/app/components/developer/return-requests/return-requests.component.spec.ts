import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRequestsComponent } from './return-requests.component';

describe('ReturnRequestsComponent', () => {
  let component: ReturnRequestsComponent;
  let fixture: ComponentFixture<ReturnRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
