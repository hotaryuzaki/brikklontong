import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, NotAcceptableException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

function generateUniqueFilename(originalName: string): string {
  const name = originalName.split('.')[0];
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  const timestamp = Date.now();
  const fileExtName = extname(originalName);

  return `${name}-${randomName}-${timestamp}${fileExtName}`;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Save images to 'uploads' folder
        filename: (req, file, cb) => {
          const uniqueFilename = generateUniqueFilename(file.originalname);
          cb(null, uniqueFilename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(
            new NotAcceptableException(
              'Only image (jpg|jpeg|png|gif) files are allowed!',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.create(createProductDto, file);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Save images to 'uploads' folder
        filename: (req, file, cb) => {
          const uniqueFilename = generateUniqueFilename(file.originalname);
          cb(null, uniqueFilename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(
            new NotAcceptableException(
              'Only image (jpg|jpeg|png|gif) files are allowed!',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      // You can pass the file along with the updateProductDto to your service
      return this.productsService.update(+id, updateProductDto, file);
    }
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
