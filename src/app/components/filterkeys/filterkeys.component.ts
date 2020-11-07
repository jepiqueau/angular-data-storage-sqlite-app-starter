import { Component, AfterViewInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-filterkeys',
  templateUrl: './filterkeys.component.html',
  styleUrls: ['./filterkeys.component.scss'],
})
export class FilterKeysComponent implements AfterViewInit {
  platform: string;
  isService: boolean = false;
  store: any = null;
  _cardStorage: HTMLIonCardElement;

  constructor(private _StoreService: StoreService) { }
  /*******************************
   * Component Lifecycle Methods *
   *******************************/

  async ngAfterViewInit() {
    // Initialize the CapacitorDataStorageSQLite plugin
    await this._StoreService.init();
  }

  /*******************************
  * Component Methods           *
  *******************************/


  async runTests(): Promise<void> {
    this._cardStorage = document.querySelector('.card-filter');

    if(this._StoreService.isService) {
      // reset the Dom in case of multiple runs
      await this.resetStorageDisplay();

      const retFirst: boolean = await this.testFilterKeys();
      console.log("retFirst : ",retFirst)
      if( retFirst) {
        document.querySelector('.filter-success1')
                                    .classList.remove('display');
      } else {
        document.querySelector('.filter-failure1')
                                    .classList.remove('display');
      }
    } else {
      console.log("Service is not initialized");
      document.querySelector('.filter-failure1')
                                    .classList.remove('display');
    }
  }
  async testFilterKeys(): Promise<boolean> {
    console.log('in testFilterKeys start ***** ')
    let result:any = await this._StoreService
              .openStore("filterStore", "filterData");
    console.log('openStore "filterStore" result',result)
    if (!result) {
      console.log('openStore "filterStore" failed to open');
    }
    await this._StoreService.clear();
    // store data in the filter store
    await this._StoreService
                .setItem("session","Session Lowercase Opened");
    let json: any = 
              {'a':20,'b':'Hello World','c':{'c1':40,'c2':'cool'}};
    await this._StoreService.setItem("testJson",JSON.stringify(json));
    await this._StoreService
                .setItem("Session1","Session Uppercase 1 Opened");
    await this._StoreService
                .setItem("MySession2foo","Session Uppercase 2 Opened");
    const num: number = 243.567;
    await this._StoreService.setItem("testNumber",num.toString());
    await this._StoreService
                .setItem("Mylsession2foo","Session Lowercase 2 Opened");
    await this._StoreService
                .setItem("EnduSession","Session Uppercase End Opened");
    await this._StoreService
                .setItem("Endlsession","Session Lowercase End Opened");
    await this._StoreService
                .setItem("SessionReact","Session React Opened");
    // Get All Values
    const values: string[] = await this._StoreService.getAllValues();
    if(values.length != 9) {
      console.log("getAllValues failed \n");
      return false;
    } else {
      for(let i = 0; i< values.length;i++) {
        console.log(' key[' + i + "] = " + values[i] + "\n");
      }
    }
    // Get Filter Values Starting with "session"
    const stValues: string[] = await this._StoreService
                                        .getFilterValues("%session");
    if(stValues.length != 3) {
      console.log("getFilterValues Start failed \n");
      return false;
    } else {
      for(let i = 0; i< stValues.length;i++) {
        console.log(' key[' + i + "] = " + stValues[i] + "\n");
      }
    }
    // Get Filter Values Ending with "session"
    const endValues: string[] = await this._StoreService
                                        .getFilterValues("session%");
    if(endValues.length != 3) {
      console.log("getFilterValues End failed \n");
      return false;
    } else {
      for(let i = 0; i< endValues.length;i++) {
        console.log(' key[' + i + "] = " + endValues[i] + "\n");
      }
    }
    // Get Filter Values Containing "session"
    const contValues: string[] = await this._StoreService
                                          .getFilterValues("session");
    if(contValues.length != 7) {
      console.log("getFilterValues End failed \n");
      return false;
    } else {
      for(let i = 0; i< contValues.length;i++) {
        console.log(' key[' + i + "] = " + contValues[i] + "\n");
      }
    }
    console.log('in testFilterKeys end ***** ')

    return true;
  }
  async resetStorageDisplay(): Promise<void> {
    for (let i:number=0;i< this._cardStorage.childElementCount;i++) {
      if(!this._cardStorage.children[i].classList.contains('display')) this._cardStorage.children[i].classList.add('display');
    }
  }
}
