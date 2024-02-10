import { Component,OnInit } from '@angular/core';
import { PostItem} from './models/postItem';
import { PostService } from './services/PostService';
import { Router } from '@angular/router';
import { AppConfig } from '../config';


@Component({
  selector: 'app-list-screen',
  templateUrl: './list-screen.component.html',
  styleUrls: ['./list-screen.component.css']
})
export class ListScreenComponent implements OnInit {
  posts: PostItem[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  postsPerPage: number = AppConfig.postsPerPage;
  totalPosts: number = 0;
  

  constructor(private postService: PostService,private router: Router) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.totalPosts = this.posts.length; // Update total number of posts
    });
  }

  searchPosts() {
    if (this.searchTerm.trim() !== '') {
      this.postService.searchPosts(this.searchTerm).subscribe(posts => {
        this.posts = posts;
        this.totalPosts = this.posts.length; // Update total number of posts
      });
    } else {
      this.loadPosts(); // Reload all posts if search term is empty
    }
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(() => {
      this.loadPosts(); // Refresh posts after deletion
    });
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }
  showPostDetails(post: PostItem) {
    this.router.navigate(['/detail', post.id]);
  }
  get totalPages(): number[] {
    const totalPagesArray: number[] = [];
    for (let i = 1; i <= Math.ceil(this.totalPosts / this.postsPerPage); i++) {
      totalPagesArray.push(i);
    }
    return totalPagesArray;
  }

  get paginatedPosts(): PostItem[] {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = Math.min(startIndex + this.postsPerPage, this.totalPosts);
    return this.posts.slice(startIndex, endIndex);
  }
}


