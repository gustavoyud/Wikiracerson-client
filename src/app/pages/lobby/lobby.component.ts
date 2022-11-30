import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { LobbyService } from 'src/app/shared/services/lobby.service';
import { WikiService } from 'src/app/shared/services/wiki.service';

interface Player {
  meuNome?: string;
  id?: number;
  isDonoDaSala?: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  selector: 'lsds-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  public players$ = this.lobby.getPlayers().pipe(tap(console.log));

  public isDonoDaSala$ = this.lobby.isDonoDaSala();

  public gameStarted$ = new BehaviorSubject(false);

  public articles$ = this.lobby.getArticles();

  constructor(
    private lobby: LobbyService,
    private route: Router,
    private wiki: WikiService
  ) {}

  public ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.lobby.login(JSON.parse(localStorage.getItem('user')));
      this.lobby.emitPlayers();
    } else {
      this.route.navigate(['auth']);
    }
  }

  public start(): void {
    this.wiki.random().subscribe(({ body: [start, end] }) => {
      this.lobby.startGame({ start, end });
    });
  }
}
