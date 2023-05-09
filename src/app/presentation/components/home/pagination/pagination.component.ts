import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  avalaiblePagesOptions: number[] = [];
  currentPage: number = 1;

  @Input() pagesByPosts!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.currentPage = parseInt(params.get('page') ?? '1');
      this.getAvalaiblePageOptions();
    });
  }

  private getAvalaiblePageOptions() {
    let list: number[] = [];
    if (this.currentPage <= 5) {
      list = [1, 2, 3, 4, 5, 6];
    } else {
      let counter = 0;
      while (counter < 3) {
        list.push(this.currentPage + counter);
        list.unshift(this.currentPage - counter);
        counter++;
      }
    }
    this.avalaiblePagesOptions = [...new Set(list)];
  }
}
