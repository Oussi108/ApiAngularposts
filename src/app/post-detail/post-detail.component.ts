import { Component, Input } from '@angular/core';
import { PostItem } from '../list-screen/models/postItem';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../list-screen/services/PostService';
import { Location } from '@angular/common';
import { CommentItem } from '../list-screen/models/CommentItem';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent {
  @Input() post?: PostItem;
  comments: CommentItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(id).subscribe(post => {
      if (post) {
        this.post = post;
        this.fetchComments(post.id);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
  fetchComments(postId: number): void {
    this.postService.getComments(postId).subscribe(comments => {
      this.comments = comments;
    });
  }
  
}
