import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  title: string = '';

  @Column()
  course_img: string = '';

  @Column()
  price: string = '';

  @Column()
  point: string = '';

  @Column()
  category: string = '';

  @Column()
  del: string = '';
}