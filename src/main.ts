import { enableProdMode } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
enableProdMode();

const ELEMENT_TAG = 'angular17-app';

createApplication().then((appRef) => {
  const elementConstructor = createCustomElement(AppComponent, {
    injector: appRef.injector,
  });
  if (!customElements.get(ELEMENT_TAG)) {
    customElements.define(ELEMENT_TAG, elementConstructor);
    console.log(`Custom element defined as ${ELEMENT_TAG}.`);
  }
});
