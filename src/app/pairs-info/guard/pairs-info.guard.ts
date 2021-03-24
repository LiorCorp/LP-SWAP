import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contract } from 'src/app/models/contract.model';
import { Token } from 'src/app/models/token.model';
import {
  FetchContracts,
  FetchTokens,
} from 'src/app/store/app-state/app.actions';
import { AppState } from 'src/app/store/app-state/app.state';

@Injectable({
  providedIn: 'root',
})
export class PairsInfoGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const contracts: Contract[] = this.store.selectSnapshot(AppState.contracts);
    const tokens: Token[] = this.store.selectSnapshot(AppState.tokens);
    if (contracts.length < 1 || tokens.length < 1) {
      return this.store.dispatch([FetchContracts, FetchTokens]).pipe(
        map((res) => {
          if (res) {
            return true;
          }
        })
      );
    }
    return true;
  }
}
