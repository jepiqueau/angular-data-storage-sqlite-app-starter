import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { TeststoreComponentModule } from '../components/teststore/teststore.module';
import { FilterKeysComponentModule } from '../components/filterkeys/filterkeys.module';
import { MultitablesstoreComponentModule } from '../components/multitablesstore/multitablesstore.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TeststoreComponentModule,
    FilterKeysComponentModule,
    MultitablesstoreComponentModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
