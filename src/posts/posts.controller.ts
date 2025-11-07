import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  createPost(@Body() createPostDto: CreatePostDto, @UploadedFile() image) {
    return this.postsService.createPost(createPostDto, image);
  }
}
