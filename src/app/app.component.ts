import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent {}
