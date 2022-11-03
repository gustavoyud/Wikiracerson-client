import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LobbyService } from 'src/app/shared/services/lobby.service';

interface Player {
  meuNome?: string;
  id?: number;
  isDonoDaSala?: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'lsds-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  public name = new FormControl('');

  public players$ = this.lobby.getPlayers();

  public isDonoDaSala$ = this.lobby.isDonoDaSala();

  public isUserLogged$ = new BehaviorSubject(false);

  constructor(private lobby: LobbyService) {}

  public ngOnInit(): void {}

  public login(): void {
    this.lobby.login({
      meuNome: this.name.value,
      id: Math.floor(Math.random() * 1000),
    });
    this.lobby.emitPlayers();
    this.isUserLogged$.next(true);
  }
}
