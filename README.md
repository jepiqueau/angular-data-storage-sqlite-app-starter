<p align="center"><br><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="128" height="128" /></p>

<h3 align="center">Ionic/Angular Data Storage SQLite App Starter</h3>
<p align="center"><strong><code>-angular-data-storage-sqlite-app-starter</code></strong></p>
<br>
<p align="center" style="font-size:50px;color:red"><strong>CAPACITOR 3 🚧</strong></p><br>
<p align="center">
  iOS for testing only</p><br>
<p align="center">Ionic/Angular application demonstrating the use of the</p>
<p align="center"><strong><code>capacitor-data-storage-sqlite</code></strong></p>
<br>
<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2021?style=flat-square" />
  <a href="https://github.com/jepiqueau/angular-data-storage-sqlite-app-starter"><img src="https://img.shields.io/github/license/jepiqueau/angular-data-storage-sqlite-app-starter?style=flat-square" /></a>
  <a href="https://github.com/jepiqueau/angular-data-storage-sqlite-app-starter"><img src="https://img.shields.io/github/package-json/v/jepiqueau/angular-data-storage-sqlite-app-starter?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-1-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>

## Maintainers

| Maintainer        | GitHub                                    | Social |
| ----------------- | ----------------------------------------- | ------ |
| Quéau Jean Pierre | [jepiqueau](https://github.com/jepiqueau) |        |


## Installation

To start building your App using this Starter App, clone this repo to a new directory:

```bash
git clone https://github.com/jepiqueau/angular-data-storage-sqlite-app-starter.git 
cd angular-data-storage-sqlite-app-starter
git remote rm origin
```

 - then install it

```bash
npm install
```

 - then go to the building process

```bash
npm run build
npx cap update
npm run build
npx cap copy
npx cap copy web
```

the capacitor config parameters are:

```
"appId": "com.example.app.capacitor.datastoragesqlite"
"appName": "angular-data-storage-sqlite-app-starter"
```

### Building Web Code

```bash
npx cap serve
```


### Building Native Project

#### IOS

```bash
npx cap open ios
```
Once Xcode launches, you can build your finally app binary through the standard Xcode workflow.

#### Android

```bash
npx cap open android
```
Once Android Studio launches, you can build your app through the standard Android Studio workflow.

#### Electron

```bash
npx cap open electron
```

#### Resulting Output

```
The DataStore test was successful
```

At the end of the test, one un-encrypted store should have been created

```
storageSQLite.db
```

### Changing the 'secret' and 'new secret'

#### IOS

In Xcode, before building your app, 
 - Go to the ```Pods/Development Pods/CapacitorDataStorageSqlite``` folder, 
 - Modify the ```secret``` and ```newsecret```strings in the Global.swift file.

#### Android

In Android Studio, before building your app,
 - Go to the ```capacitor-data-storage-sqlite/java/com.jeep.plugin.capacitor/cdssUtils```folder,
 - Modify the ```secret``` and ```newsecret```strings in the Global.java file.

### Angular Service

A Angular Service has been defined as a wrapper to the ```capacitor-data-storage-sqlite``` plugin.

```tsx
import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';
import * as CDSSPlugin from 'capacitor-data-storage-sqlite';
const { CapacitorDataStorageSqlite, Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  store: any;
  isService: boolean = false;
  platform: string;
  constructor() {
  }
  /**
   * Plugin Initialization
   */
  async init(): Promise<void> {
    const info = await Device.getInfo();
    this.platform = info.platform;
    if (this.platform === "ios" || this.platform === "android") {
      this.store = CapacitorDataStorageSqlite;
    } else if(this.platform === "electron") {
      this.store = CDSSPlugin.CapacitorDataStorageSqliteElectron;
    } else {
      this.store = CDSSPlugin.CapacitorDataStorageSqlite;
    }
    this.isService = true;
  }
  /**
   * Open a Database
   * @param _dbName string optional
   * @param _table string optional
   * @param _encrypted boolean optional 
   * @param _mode string optional
   */  
  async openStore(_dbName?:string,_table?:string,_encrypted?:boolean,_mode?:string): Promise<boolean> {
    if(this.isService) {
      const database: string = _dbName ? _dbName : "storage";
      const table: string = _table ? _table : "storage_table";
      const encrypted:boolean = _encrypted ? _encrypted : false;
      const mode: string = _mode ? _mode : "no-encryption";
      const {result} = await this.store.openStore({database,table,encrypted,mode});
      return result;
    } else {
      return Promise.resolve(false);
    }
  }
  /**
   * Create/Set a Table
   * @param table string
   */  
  async setTable(table:string): Promise<any> {
    if(this.isService) {
      const {result,message} = await this.store.setTable({table});
      return Promise.resolve([result,message]);
    } else {
      return Promise.resolve({result:false, message:"Service is not initialized"});
    }
  }
  /**
   * Set of Key
   * @param key string 
   * @param value string
   */
  async setItem(key:string,value:string): Promise<void> {
    if(this.isService && key.length > 0) {
      await this.store.set({ key, value });
    }
  }
  /**
   * Get the Value for a given Key
   * @param key string 
   */
  async getItem(key:string): Promise<string> {
    if(this.isService && key.length > 0) {
      const {value} = await this.store.get({ key });
      console.log("in getItem value ",value)
      return value;
    } else {
      return null;
    }

  }
  async isKey(key:string): Promise<boolean> {
    if(this.isService && key.length > 0) {
      const {result} = await this.store.iskey({ key });
      return result;
    } else {
      return null;
    }

  }
  async getAllKeys(): Promise<Array<string>> {
    if(this.isService ) {
      const {keys} = await this.store.keys();
      return keys;
    } else {
      return null;
    }
  }
  async getAllValues(): Promise<Array<string>> {
    if(this.isService ) {
      const {values} = await this.store.values();
      return values;
    } else {
      return null;
    }
  }
  async getAllKeysValues(): Promise<Array<any>> {
    if(this.isService ) {
      const {keysvalues} = await this.store.keysvalues();
      return keysvalues;
    } else {
      return null;
    }
  }

  async removeItem(key:string): Promise<boolean> {
    if(this.isService && key.length > 0) {
      const {result} = await this.store.remove({ key });
      return result;
    } else {
      return null;
    }
  }
  async clear(): Promise<boolean> {
    if(this.isService ) {
      const {result} = await this.store.clear();
      return result;
    } else {
      return null;
    }
  }
  async deleteStore(_dbName?:string): Promise<boolean> {
    const database: string = _dbName ? _dbName : "storage";
    await this.init();
    if(this.isService ) {
      const {result} = await this.store.deleteStore({database});
      return result;
    }
    return;
  }
}

```

## Starting an App from Scratch

The process described below follows the instructions provided in the [Capacitor Documentation](https://capacitor.ionicframework.com/docs/getting-started/with-ionic/)

### New Ionic/Angular Project

```bash
ionic start myStorageApp tabs --type=angular --capacitor
cd ./myStorageApp
``` 

### Initialize Capacitor

```bash
npx cap init myStorageApp com.example.app
```

Your App information [appName] [appId] can be whathever you would like. 
Here we choose for the example [myStorageApp] [com.example.app]

### Install capacitor-data-storage-sqlite plugin

```bash
npm install --save capacitor-data-storage-sqlite@latest
```

### Add an Angular Service

```bash
ng g service sqlite
```

In your favorite editor open the ```store.services.ts``` file under the ```src/app/services```folder and input the code as described above

### Access the Angular Service in your App Angular Components

#### Import in your Angular Component

```ts
import { StoreService } from '../services/store.service';
```

#### Inject the StoreService in your Angular Component Constructor

```ts
  constructor(private _StoreService: StoreService) {
  }
```

#### Initialize CapacitorDataStorageSqlite plugin

```ts
  async ngAfterViewInit() {
        // Initialize the CapacitorDataStorageSQLite plugin
        await this._StoreService.init();

    ...
  }
```

#### Usage of the CapacitorDataStorageSqlite plugin in Angular Component Methods

```ts
async fooMethod(): Promise<void> {
    ...
    if(this._StoreService.isService) {
      // open the data storage
      let result:any = await this._StoreService.openStore();
      console.log('storage retCreate result',result)
      if (result) {
        await this._StoreService.clear();
        // store data in the first store
        await this._StoreService.setItem("session","Session Opened");
        result = await this._StoreService.getItem("session");
        console.log('result ',result)
        ...
      }

    } else {
      console.log("CapacitorDataStorageSqlite Service is not initialized");
    }
    ...
}
```

When the database is open, use the other methods provided by the Angular Service to setItem, getItem, removeItem, clear, ...

### Build your App

```bash
npm run build
```

### Add Platforms

```bash
npx cap add ios
npx cap add android
npx cap add electron
```

### Building and Syncing your App with Capacitor

```bash
npm run build
npx cap copy
npx cap copy web
```

### Open IDE to Build, Run and Deploy

#### IOS

```bash
npx cap open ios
```
Once Xcode launches, you can build your finally app binary through the standard Xcode workflow.

#### Android

```bash
npx cap open android
```

Once Android launches,

 - Edit the MainActivity.java and add the following import:

```java
import com.jeep.plugin.capacitor.CapacitorDataStorageSqlite;
```

 - Add the CapacitorDataStorageSQLite declaration in the this.init method

```java
add(CapacitorDataStorageSqlite.class);
```

 - you can then build your app through the standard Android Studio workflow.

#### Electron

In your application folder add the Electron platform

```bash
npx cap add electron
```

In the Electron folder of your application

```bash
npm install --save sqlite3
npm install --save-dev @types/sqlite3
npm install --save-dev electron-rebuild
```

Modify the Electron package.json file by adding a script "postinstall"

```json
  "scripts": {
    "electron:start": "electron ./",
    "postinstall": "electron-rebuild -f -w sqlite3"
  },
```

Execute the postinstall script

```bash
npm run postinstall
```
Go back in the main folder of your application
Add a script in the index.html file of your application in the body tag

```html
<body>
  <app-root></app-root>
  <script>
    try {
      if (process && typeof (process.versions.electron) === 'string' && process.versions.hasOwnProperty('electron')) {
        const sqlite3 = require('sqlite3');
        const fs = require('fs');
        const path = require('path');
        window.sqlite3 = sqlite3;
        window.fs = fs;
        window.path = path;
      }
    }
    catch {
      console.log("process doesn't exists");
    }
  </script>
</body>
```
and then build the application

```bash
 npx cap update
 npm run build
 npx cap copy
 npx cap open electron
```

The datastores created are under **YourApplication/Electron/DataStorage**


### When capacitor-data-storage-sqlite plugin is updated

Follow this process:

```bash
npm install --save capacitor-data-storage-sqlite@latest
npx cap update
npm run build
npx cap copy
npx cap copy web
npx cap open ios
npx cap open android
npx cap open electron
npx cap serve
```

### Test Capacitor-Data-Storage-SQLite access

The ```capacitor-data-storage-sqlite``` test is accessible in the Tab2 of the Application by clicking on the Store test button.


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jepiqueau"><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="100px;" alt=""/><br /><sub><b>Jean Pierre Quéau</b></sub></a><br /><a href="https://github.com/jepiqueau/angular-data-storage-sqlite-app-starter/commits?author=jepiqueau" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
