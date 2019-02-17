import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Data } from '../providers/data';

@Component({
  selector: 'app-education',
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss'],
})
export class EducationPage implements OnInit {

@ViewChild('slides') slides: any;

hasAnswered = false;
  score: any;
  questions: any;

  constructor(public navCtrl: NavController, public dataService: Data) { }
  ionViewDidLoad() {

    this.slides.lockSwipes(true);

    this.dataService.load().then((data) => {

      data.map((question) => {

        const originalOrder = question.answers;
        question.answers = this.randomizeAnswers(originalOrder);
        return question;

      });

      this.questions = data;

    });

  }

  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  selectAnswer(answer, question) {

    this.hasAnswered = true;
    answer.selected = true;
    question.flashCardFlipped = true;

    if (answer.correct) {
      this.score++;
    }

    setTimeout(() => {
      this.hasAnswered = false;
      this.nextSlide();
      answer.selected = false;
      question.flashCardFlipped = false;
    }, 3000);
  }

  randomizeAnswers(rawAnswers: any[]): any[] {

    for (let i = rawAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = rawAnswers[i];
      rawAnswers[i] = rawAnswers[j];
      rawAnswers[j] = temp;
    }

    return rawAnswers;

  }

  restartQuiz() {
    this.score = 0;
    this.slides.lockSwipes(false);
    this.slides.slideTo(1, 1000);
    this.slides.lockSwipes(true);
  }

  ngOnInit() {
  }

}
