import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
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

  public gameHasFinished$ = new BehaviorSubject(false);

  public articles$ = new BehaviorSubject<any>({});

  public currentArticle$ = new BehaviorSubject('');

  public destroyController$: Subject<any> = new Subject();

  public listOfArticles$ = new BehaviorSubject([]);

  public loading$ = new BehaviorSubject(false);

  public disabled$ = new BehaviorSubject(false);

  private lastKey = '';

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
      this.listenArticles();
      this.listenToGameFinished();
      this.listenToUserHackerzaum();
    } else {
      this.route.navigate(['auth']);
    }
  }

  private listenToUserHackerzaum() {
    this.lobby
      .hasHackerzaum()
      .pipe(takeUntil(this.destroyController$))
      .subscribe((user) => {
        if (!this.disabled$.value) {
          this.snackbar.open(
            `${user.meuNome.toUpperCase()} É O HACKERZÃO DA RODADA!`,
            'TOP',
            {
              duration: 2000,
            }
          );
        }
      });
  }

  private listenArticles() {
    this.lobby
      .getArticles()
      .pipe(takeUntil(this.destroyController$))
      .subscribe((articles) => {
        this.snackbar.open('O jogo começou! 🎮', '🏃‍♂️', { duration: 2000 });
        this.articles$.next(articles);
        this.searchTheGuys(articles.start.title);
      });
  }

  private listenToGameFinished() {
    this.lobby
      .gameFinished()
      .pipe(takeUntil(this.destroyController$))
      .subscribe((value) => {
        this.snackbar.open(`${value.meuNome} é o vencedor!`, 'OK', {
          duration: 2000,
        });
        this.gameHasFinished$.next(true);
      });
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
        if (body?.pageId === this.articles$.value.end?.id) {
          this.lobby.hasWinner();
        }
        this.listOfArticles$.next(body?.links);
      });
  }

  @HostListener('document:keydown', ['$event'])
  private listen(event: KeyboardEvent) {
    if (this.articles$.value?.start?.title) {
      const COMMAND_KEY = 'MetaLeft';
      const F_KEY = 'KeyF';
      const isControl = event.ctrlKey || this.lastKey === COMMAND_KEY;

      if (this.lastKey !== event.code) {
        this.lastKey = event.code;
      }

      if (isControl && event.code === F_KEY) {
        this.lastKey = '';
        this.disabled$.next(true);
        this.lobby.emitHack();
        setTimeout(() => {
          this.disabled$.next(false);
        }, 10000);
      }
    }
  }
}
