import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  //esto es para la query hacerla cuando el usuario deje de escribir
  private debouncer: Subject<string> = new Subject<string>();

  //? pq cuando se monta = null
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public value: string = '';

  @Output() //cambiado por debounce
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  emitValue(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      //espera 1s esperando que el usuario pare de escribir y luego ejecuta la peticion
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  //se hace cuando la subscribe esta en onInit
  //cuando la instancia es destruida, por ej, cambiar de pestaña
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();

  }
}
