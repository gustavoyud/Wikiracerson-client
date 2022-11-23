import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LobbyService } from 'src/app/shared/services/lobby.service';

interface Player {
  meuNome?: string;
  id?: number;
  isDonoDaSala?: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'lsds-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  public players$ = this.lobby.getPlayers().pipe(tap(console.log));

  public isDonoDaSala$ = this.lobby.isDonoDaSala();

  constructor(private lobby: LobbyService, private route: Router) {}

  public ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.lobby.login(JSON.parse(localStorage.getItem('user')));
      this.lobby.emitPlayers();
    } else {
      this.route.navigate(['auth']);
    }
  }
}
