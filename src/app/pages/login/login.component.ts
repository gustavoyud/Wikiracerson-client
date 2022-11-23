import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LobbyService } from 'src/app/shared/services/lobby.service';

@Component({
  selector: 'lsds-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [class]="'inputs-wrapper'">
      <input [type]="'text'" [formControl]="name" />
      <button (click)="login()">Logar</button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .inputs-wrapper {
        display: flex;
        gap: 5px;
      }

      button {
        color: var(--lsds-white);
        font-family: 'Roboto', sans-serif;
        border: none;
        background: var(--lsds-action);
        border-radius: 4px;
        padding: 8px 22px;
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
