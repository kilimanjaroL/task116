'use strict';

let readlineSync=require('readline-sync');

class Grade {      //成绩类
    constructor(subject, grade) {
        this.subject = subject;
        this.grade = grade;
    }
    Is_Correct () {
        if (this.subject[0] !== 'math' || this.subject[1] !== 'chinese' || this.subject[2] !== 'english' || this.subject[3] !== 'programming') {
            return false;
        }
        for (let i in this.grade) {
            if (this.grade[i] < 0 || this.grade[i] > 100) {
                return false;
            }
        }
        return true;
    }
}

class Student extends Grade {
    constructor (name, student_id, nation, class_number, subject, grades) {
        super(subject, grades);
        this.name = name;   //姓名
        this.student_id = student_id;  //学号
        this.nation = nation;  //民族
        this.klass = class_number;  //班级
    }
}

function main() {
    let students = [];
    while (1) {
        console.log ("1. 添加学生\n2. 生成成绩单\n3. 退出\n请输入你的选择（1～3）：");
        let choose = readlineSync.question('');
        if (choose === '1' ) {
            students.push(Insert_Student());
        }
        console.log (students);
        if (choose === '2') {
            Show_List(students);
        }
        if (choose === '3') {
            break;
        }
    }
}

function Insert_Student () {  //输入学生信息
    let student_information = readlineSync.question("请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：");
    while (1) {
        let students = student_information.split(",");
        let subject = [], grade = [];

        for (let t = 4; t < students.length; t++) {
            let individual = students[t].split(":");
            subject.push(individual[0]);
            grade.push(individual[1]);
        }
        let grades = new Grade(subject, grade);
        let student = new Student(students[0], students[1], students[2], students[3], subject, grade);
        if (grades.Is_Correct()) {
            console.log("学生" + students[0] + "的成绩被添加");
            return student;
        }
        else {
            let student_information = readlineSync.question("请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）");
        }
    }
}

function Show_List (students) {  //生成成绩单
    let student_id = readlineSync.question("请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：");
    let student_ids = student_id.split(",");
    console.log (student_ids);
    let sum, average, central_number = 0, total = [], sum_aver = 0;
    let string = "成绩单\n" +
        "姓名|数学|语文|英语|编程|平均分|总分 \n" +
        "========================\n";

    for (let i = 0; i < student_ids.length; i++) {
        for (let j = 0; j < students.length; j++) {
            if (students[j].student_id === student_ids[i]) {
                string += students[j].name;
                string += '|';
                sum = 0;
                average = 0;
                for (let k = 0; k < students[j].grade.length; k++) {
                    sum += parseInt(students[j].grade[k]);
                    string += students[j].grade[k] + '|';
                }
                total.push(sum);
                average = sum / 4;
                string += average;
                string += "|";
                string += sum;
                string += '\n';
            }
        }
    }
    string += "========================\n";
    string += "全班总分平均数:";

    total.sort();   //求全班学生总分中位数
    for (let i in total) {
        sum_aver += total[i];
    }
    if (total.length % 2 === 0) {
        central_number = (total[total.length/2] + total[total.length/2 - 1]) / 2;
    }
    else {
        central_number = total[parseInt(total.length/2)];
    }
    sum_aver /= total.length;
    string += sum_aver;
    string += "\n全班总分中位数:";
    string += central_number;
    string += "\n";
    console.log (string);
}

module.exports = main;
