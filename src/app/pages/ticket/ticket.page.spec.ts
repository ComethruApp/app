import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TicketPage } from './ticket.page';

describe('TicketPage', () => {
  let component: TicketPage;
  let fixture: ComponentFixture<TicketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
