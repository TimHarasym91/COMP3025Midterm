import { Component } from '@angular/core';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

import {
  NavController,
  AlertController,
  ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: FirebaseListObservable<any>;
  lists: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, af: AngularFire, public actionSheetCtrl: ActionSheetController) {
    this.items = af.database.list('/items');
    this.lists = af.database.list('/lists');
  }

// Add new item to the list
  addItem(){
    let prompt = this.alertCtrl.create({
      title: 'Item',
      message: "Enter an item",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.items.push({
              title: data.title,
              status: false,
              amount: 1
            });
          }
        }
      ]
    });
    prompt.present();
  }

  // Delete a specific item from the list
  removeItem(itemId: string){
    this.items.remove(itemId);
  }

// Increase the amount on an item
increaseItem(itemId, itemAmount){
  itemAmount++;
  this.items.update(itemId,{
    amount: itemAmount
  });
}

//Decrease the amount on an item
decreaseItem(itemId, itemAmount){
  itemAmount--;
  if(itemAmount <= 0 ){
    itemAmount = 0;
  }
  this.items.update(itemId,{
    amount: itemAmount
  });
}

//Clear the entire List
clearList(){
  let prompt = this.alertCtrl.create({
    title: 'Clear List',
    message: "Are you sure you wish to delete this list?",
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
        console.log('Cancel clicked');
        }
      },
      {
        text: 'Clear',
        handler: data => {
          this.items.remove();
        }
      }
    ]
  });
  prompt.present();
}

saveList(){
}

}
