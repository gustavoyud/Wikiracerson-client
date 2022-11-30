import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LobbyService } from 'src/app/shared/services/lobby.service';

@Component({
  selector: 'lsds-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <mat-form-field appearance="outline">
      <mat-label>Nome</mat-label>
      <input matInput [type]="'text'" [formControl]="name" />
    </mat-form-field>
    <button (click)="login()" mat-raised-button color="primary">Logar</button>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public name = new FormControl('');

  public login(): void {
    const user = {
      meuNome: this.name.value,
    };
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['lobby']);
  }

  constructor(private lobby: LobbyService, private router: Router) {}

  public ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['lobby']);
    }
  }
}
