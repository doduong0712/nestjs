import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
// import { IStudent } from './interface/student.interface';
import { StudentDocument, Student } from './schema/student.schema';
import { Model } from "mongoose";
import { UpdateStudentDto } from './dto/update-student.dto';


@Injectable()
export class StudentService {

    constructor(@InjectModel('Student') private studentModel: Model<StudentDocument>) { }

    async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
        const newStudent = await new this.studentModel(createStudentDto);
        return newStudent.save();
    }

    async updateStudent(studentId: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
        const existingStudent = await this.studentModel.findByIdAndUpdate(studentId, updateStudentDto, { new: true });
        if (!existingStudent) {
            throw new NotFoundException(`Student #${studentId} not found`);
        }
        return existingStudent;
    }

    async getAllStudents(): Promise<Student[]> {
        const studentData = await this.studentModel.find().exec();
        if (!studentData || studentData.length == 0) {
            throw new NotFoundException('Students data not found!');
        }
        return studentData;
    }

    async getStudent(studentId: string): Promise<Student> {
        const existingStudent = await this.studentModel.findById(studentId).exec();
        if (!existingStudent) {
            throw new NotFoundException(`Student #${studentId} not found`);
        }
        return existingStudent;
    }

    async deleteStudent(studentId: string): Promise<Student> {
        const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
        if (!deletedStudent) {
            throw new NotFoundException(`Student #${studentId} not found`);
        }
        return deletedStudent;
    }
}