import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Books {
  @Prop()
  id: string;
  @Prop()
  name: string;
  @Prop()
  year: number;
}

export const BooksSchema = SchemaFactory.createForClass(Books);
