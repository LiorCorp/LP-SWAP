import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token } from '../models/token.model';
import { Contract } from './../models/contract.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private readonly httpClient: HttpClient) {}

  baseUrlBsccan = 'https://api.bscscan.com/api';
  baseUrlCoincecko = 'https://api.coingecko.com/api/v3';
  apiKey = 'XG8292THT91I1S1CTNJZ54PIYFQHMSV9XQ';

  getTokensData(): Observable<Token[]> {
    return this.httpClient
      .get('../../assets/data/token.json')
      .pipe(map((res: any) => res.tokens));
  }

  getContractsData(): Observable<Contract[]> {
    return this.httpClient
      .get('../../assets/data/token.json')
      .pipe(map((res: any) => res.contracts));
  }

  getTokenData(tokenId: string): Observable<Token> {
    return this.httpClient
      .get('../../assets/data/token.json')
      .pipe(
        map((res: any) =>
          res.tokens.find((token: Token) => (token.id = tokenId))
        )
      );
  }

  getContractData(id: string): Observable<Contract> {
    return this.httpClient
      .get('../../assets/data/token.json')
      .pipe(
        map((res: any) =>
          res.contracts.find((contract: Contract) => (contract.id = id))
        )
      );
  }

  getTokenBalance(contractAddress: string, address: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrlBsccan}?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${this.apiKey}`
    );
  }

  getPriceToken(id: string, vsCurrency): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrlCoincecko}/simple/price?ids=${id}&vs_currencies=${vsCurrency}`
    );
  }

  getTotalSupplyContract(contractAddress: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrlBsccan}?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${this.apiKey}`
    );
  }
}
