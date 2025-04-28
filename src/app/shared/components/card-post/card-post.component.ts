import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-card-post',
  imports: [],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.css'
})
export class CardPostComponent {
  @Input() post!: Post;

  dateFormatter(): string {
    const data = this.post.postDate;

    const OPTIONS: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    const FORMATTEDDATE = data.toLocaleDateString('pt-BR', OPTIONS);

    return FORMATTEDDATE;
  }
}
