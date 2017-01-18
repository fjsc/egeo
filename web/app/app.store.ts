import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/distinctUntilChanged';

export interface State {
   /// defeine your state here
};

const defaultState: State = {
   /// define your initial state here
};

const store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class AppStore {
   private _store: any = store;

   change: any = this._store
      .asObservable()
      .distinctUntilChanged();

   setState(state: State): void {
      this._store.next(state);
   }

   getState(): State {
      return this._store.value;
   }

   purge(): void {
      this._store.next(defaultState);
   }
}
