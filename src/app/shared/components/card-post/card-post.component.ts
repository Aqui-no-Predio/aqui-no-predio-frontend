import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';
import { CommonModule } from '@angular/common';
import { AccessService } from '../../../core/services/access.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-post',
  imports: [CommonModule],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.css'
})
export class CardPostComponent {
  @Input() post!: Post;
  accessGranted$: Observable<boolean>;

  constructor(private accessService: AccessService) {
    this.accessGranted$ = this.accessService.accessGranted$;
  }

  ngOnInit(): void { }

  editPost(): void {
    console.log('Editar post (ID:', this.post.id, ')');
  }

  deletePost(): void {
    console.log('Deletar post (ID:', this.post.id, ')');
  }

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
