import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {

  params: Params;
  amount = 0;
  date = new Date();
  category = '';
  description = '';
  amountFocus = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;
    Keyboard.addListener('keyboardWillHide', () => {
      if (this.amountFocus) {
        this.amountFocus = false;
      }
    });
  }

  onSubmit() {}

  onAmountFocus() {
    this.amountFocus = true;
  }
}
