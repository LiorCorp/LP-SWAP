import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token } from 'src/app/models/token.model';
import { Contract } from './../../models/contract.model';
import { TokenService } from './../../services/token.service';
import { FetchContracts, FetchTokens } from './app.actions';

export interface AppStateModel {
  contracts: Contract[];
  tokens: Token[];
}

@State<AppStateModel>({
  name: 'appState',
  defaults: {
    contracts: [],
    tokens: [],
  },
})
@Injectable()
export class AppState {
  constructor(private readonly tokenService: TokenService) {}

  @Selector()
  static contracts(state: AppStateModel): Contract[] {
    return state.contracts;
  }

  @Selector()
  static tokens(state: AppStateModel): Token[] {
    return state.tokens;
  }

  @Action(FetchContracts)
  fetchContracts({
    getState,
    patchState,
  }: StateContext<AppStateModel>): Observable<void> {
    return this.tokenService.getContractsData().pipe(
      map((contracts: Contract[]) => {
        patchState({ ...getState(), contracts: contracts });
      })
    );
  }

  @Action(FetchTokens)
  fetchTokens({
    getState,
    patchState,
  }: StateContext<AppStateModel>): Observable<void> {
    return this.tokenService.getTokensData().pipe(
      map((tokens: Token[]) => {
        patchState({ ...getState(), tokens: tokens });
      })
    );
  }
}
