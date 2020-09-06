import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private core: CoreService) { }

  ngOnInit(): void {
  }

  isServerConnected(): boolean {
      return this.core.isSocketConnected();
  }
}
