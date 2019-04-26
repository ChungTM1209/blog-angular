import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private keyword = new BehaviorSubject('');
    currentKeyword = this.keyword.asObservable();
    changeKeyword(keyword: string) {
        return this.keyword.next(keyword);
    }

    constructor() {
    }
}
