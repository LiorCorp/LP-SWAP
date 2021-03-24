import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Contract } from '../models/contract.model';
import { AppState } from '../store/app-state/app.state';

@Component({
  selector: 'app-pairs',
  templateUrl: './pairs.component.html',
  styleUrls: ['./pairs.component.scss'],
})
export class PairsComponent implements OnInit {
  @Select(AppState.contracts) contracts: Observable<Contract[]>;
  constructor() {}

  ngOnInit(): void {}
}
