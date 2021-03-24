import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Contract } from '../models/contract.model';
import { Token } from '../models/token.model';
import { TokenService } from '../services/token.service';
import { AppState } from './../store/app-state/app.state';

@Component({
  selector: 'app-pairs-info',
  templateUrl: './pairs-info.component.html',
  styleUrls: ['./pairs-info.component.scss'],
})
export class PairsInfoComponent implements OnInit {
  @Select(AppState) appState$: Observable<any>;
  title = 'wallet';
  token1: Token;
  token2: Token;
  tokens: Token[];
  token1Balance: number;
  token2Balance: number;
  token1Price: number;
  token2Price: number;
  totalSupplyLPToken: number;
  lpTokens = 1;
  contract: Contract;

  constructor(
    private readonly tokenService: TokenService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    const contractId = this.route.snapshot.paramMap.get('id');
    this.appState$.subscribe((state) => {
      console.warn(state);

      const contracts = state.contracts;
      this.tokens = state.tokens;
      this.contract = contracts.find((contract) => contract.id == contractId);
      this.token1 = this.tokens.find(
        (token) => token.id == this.contract.token1
      );
      this.token2 = this.tokens.find(
        (token) => token.id == this.contract.token2
      );

      this.tokenService
        .getTokenBalance(this.token1.address, this.contract.address)
        .subscribe((res) => {
          this.token1Balance = res.result / Math.pow(10, 18);
        });
      this.tokenService
        .getTokenBalance(this.token2.address, this.contract.address)
        .subscribe((res) => {
          this.token2Balance = res.result / Math.pow(10, 18);
        });
      this.tokenService
        .getTotalSupplyContract(this.contract.address)
        .subscribe((res) => {
          this.totalSupplyLPToken = res.result / Math.pow(10, 18);
        });
      this.tokenService
        .getPriceToken(this.token1.id, 'usd')
        .subscribe((res) => {
          this.token1Price = res[this.token1.id].usd;
        });
      this.tokenService
        .getPriceToken(this.token2.id, 'usd')
        .subscribe((res) => {
          this.token2Price = res[this.token2.id].usd;
        });
    });
  }
}
