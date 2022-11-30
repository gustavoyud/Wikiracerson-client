import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize, Subject, takeUntil, tap } from 'rxjs';
import { LobbyService } from 'src/app/shared/services/lobby.service';
import { WikiService } from 'src/app/shared/services/wiki.service';

interface Player {
  meuNome?: string;
  id?: number;
  isDonoDaSala?: boolean;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ],
  selector: 'lsds-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit, OnDestroy {
  public players$ = this.lobby.getPlayers().pipe(tap(console.log));

  public isDonoDaSala$ = this.lobby.isDonoDaSala();

  public gameStarted$ = new BehaviorSubject(false);

  public articles$ = new BehaviorSubject<any>({});

  public currentArticle$ = new BehaviorSubject('');

  public destroyController$: Subject<any> = new Subject();

  public listOfArticles$ = new BehaviorSubject([]);

  public loading$ = new BehaviorSubject(false);

  constructor(
    private lobby: LobbyService,
    private route: Router,
    private wiki: WikiService,
    private snackbar: MatSnackBar
  ) {}

  public ngOnDestroy(): void {
    this.destroyController$.next(null);
    this.destroyController$.complete();
  }

  public ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.lobby.login(JSON.parse(localStorage.getItem('user')));
      this.lobby.emitPlayers();

      this.lobby
        .getArticles()
        .pipe(takeUntil(this.destroyController$))
        .subscribe((articles) => {
          this.snackbar.open('O jogo começou! 🎮', '🏃‍♂️', { duration: 2000 });
          this.articles$.next(articles);
          this.searchTheGuys(articles.start.title);
        });
    } else {
      this.route.navigate(['auth']);
    }
  }

  public start(): void {
    this.wiki
      .random()
      .pipe(takeUntil(this.destroyController$))
      .subscribe(({ body: [start, end] }) => {
        this.lobby.startGame({ start, end });
      });
  }

  /**
   * This method search the guys!
   */
  public searchTheGuys(title: string) {
    this.currentArticle$.next(title);
    this.lobby.updateHistory(title);
    this.loading$.next(true);
    this.listOfArticles$.next([]);
    this.wiki
      .parser(title)
      .pipe(
        takeUntil(this.destroyController$),
        finalize(() => this.loading$.next(false))
      )
      .subscribe(({ body }) => {
        this.listOfArticles$.next(body?.links);
      });
  }
}
