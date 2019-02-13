import { CashFlow, Transaction, CashService } from './../../services/cash.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-flow-modal',
  templateUrl: './cash-flow-modal.page.html',
  styleUrls: ['./cash-flow-modal.page.scss'],
})
export class CashFlowModalPage implements OnInit {

  categories = [
    { name: 'Vegetables', icon: 'nutrition' },
    { name: 'Drinks', icon: 'beer' },
    { name: 'Meat', icon: 'restaurant' },
    { name: 'Sports', icon: 'fitness' },
    { name: 'Education', icon: 'school'}
  ];

  created_at = new Date().toISOString();

  transaction: Transaction = {
    created_at: Date.now(),
    title: '',
    value: 0,
    type: CashFlow.Expense,
    category: this.categories[0]
  };

  constructor(private modalCtrl: ModalController, private cashService: CashService,
    private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  addTransaction() {
    this.transaction.type = +this.transaction.type;
    this.transaction.created_at = new Date(this.created_at).getTime();

    if (this.transaction.type == CashFlow.Income) {
      this.transaction.category = { name: 'Income', icon: 'flag' };
    }

    this.cashService.addTransaction(this.transaction).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Transaction saved',
        duration: 2000
      });
      toast.then(toast => toast.present());
      this.modalCtrl.dismiss({reload: true});
    });

  }

  close() {
    this.modalCtrl.dismiss();
  }

}
