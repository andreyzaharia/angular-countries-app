import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class ContriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: [],
    },
    byCountries: {
      term: '',
      countries: [],
    },
    byRegions: {
      region: '',
      countries: [],
    },
  };

  constructor(private http: HttpClient) {
    //this.loadFromLocalStorage();
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    //pipe sirve para hacer algo con la respuesta (doc rxjs)
    return this.http.get<Country[]>(url).pipe(
      //of devuelve un array vacio de countries
      catchError(() => of([])),
      delay(1000)
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url: string = `${this.apiUrl}/alpha/${code}`;

    //pipe sirve para hacer algo con la respuesta (doc rxjs)
    return this.http.get<Country[]>(url).pipe(
      //regresa un pais si lo encuentra o null
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      //of devuelve un array vacio de countries
      catchError(() => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCapital = { term, countries })),
      //tap(() => this.saveLocalStorage())
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCountries = { term, countries })),
      //tap(() => this.saveLocalStorage())
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byRegions = { region, countries })),
      //tap(() => this.saveLocalStorage())
    );
  }
/*
  private saveLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }*/
}
