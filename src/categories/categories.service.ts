import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { Category } from './category.entity';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(Category) 
                private categoryRepository: Repository<Category>) {
    }

    readAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }
    
    async readOne(id: number): Promise<Category> {
        const category: Category = await this.categoryRepository.findOne(id);
        if (!category) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
        return category;
    }

    async create(categoryDto: CategoryDto): Promise<Category> {
        const insertResult: InsertResult = await this.categoryRepository.insert(categoryDto);
        const insertedId = insertResult.identifiers[0].id;
        return this.categoryRepository.findOne(insertedId);
    }

    async update(id: number, categoryDto: CategoryDto): Promise<void> {
        const updateResult: UpdateResult = await this.categoryRepository.update(id, categoryDto);
        if (updateResult.affected === 0) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
    }

    async delete(id: number): Promise<void> {
        const deleteResult: DeleteResult = await this.categoryRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
    }

}



