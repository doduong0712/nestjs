import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';

@Module({
  imports: [ 
    MongooseModule.forRoot('mongodb+srv://doduong:04060064@cluster0.8pcps1b.mongodb.net/student?retryWrites=true&w=majority'),
    StudentModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
