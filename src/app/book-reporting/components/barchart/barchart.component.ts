import { Component, OnInit } from '@angular/core';
import {BookServiceService} from '../../../services/book-service.service'
import { IBook } from 'src/app/models/book';
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  listOfBooks:IBook[];
  constructor(private bookService:BookServiceService) { }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public barChartLabels = ['Roman', 'Klasik', 'Biografi', 'Informatik'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];

  ngOnInit() {

      this.listOfBooks=this.bookService.getAllBooks();

      let foundRoman = this.listOfBooks.filter(book=>{
        return book.bookCategory==='Roman'
      });
      let foundKlasik = this.listOfBooks.filter(book=>{
        return book.bookCategory==='Klasik'
      });
      let foundBiografi = this.listOfBooks.filter(book=>{
        return book.bookCategory==='Biografi'
      });
      let foundInformatik = this.listOfBooks.filter(book=>{
        return book.bookCategory==='Informatik'
      });

      this.barChartData.push({data: [foundRoman.length, foundKlasik.length, foundBiografi.length, foundInformatik.length], label: 'Nr of Books'});

     
  }

}
