import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReturnRequestComponent } from './add-return-request.component';

describe('AddReturnRequestComponent', () => {
  let component: AddReturnRequestComponent;
  let fixture: ComponentFixture<AddReturnRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReturnRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReturnRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
