enum Role {
    Student = "student",
    Teacher = "teacher",
  }
  
  enum Discipline {
    ComputerScience = "Computer Science",
    Mathematics = "Mathematics",
    Physics = "Physics",
    Biology = "Biology",
    Chemistry = "Chemistry",
  }
  
  enum AcademicStatus {
    Active = "active",
    AcademicLeave = "academic leave",
    Graduated = "graduated",
    Expelled = "expelled",
  }
  
  class UniversityError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "UniversityError";
    }
  }
  
  class University {
    name: string;
    courses = [];
    groups = [];
    people = [];
  
    constructor(name: string) {
      this.name = name;
    }
  
    addCourse(course) {
      this.courses.push(course);
    }
  
    addGroup(group) {
      this.groups.push(group);
    }
  
    addPerson(person) {
      this.people.push(person);
    }
  
    findGroupByCourse(course) {
      return this.groups.find((group) => group.course === course);
    }
  
    getAllPeopleByRole(role: Role) {
      switch (role) {
        case Role.Student:
          return this.people.filter((person) => person.role === Role.Student);
        case Role.Teacher:
          return this.people.filter((person) => person.role === Role.Teacher);
        default:
          return this.assertNeverRole(role);
      }
    }
  
    assertNeverRole(role: never) {
      throw new Error(`Unhandled role: ${role}`);
    }
  }
  
  class Course {
    name: string;
    credits: number;
    discipline: Discipline;
  
    constructor(name: string, discipline: Discipline, credits: number) {
      this.name = name;
      this.credits = credits;
      this.discipline = discipline;
    }
  }
  
  class Group {
    name: string;
    course;
    teacher;
    students = [];
  
    constructor(name: string, course, teacher) {
      this.name = name;
      this.course = course;
      this.teacher = teacher;
    }
  
    addStudent(student) {
      if (this.students.includes(student)) {
        throw new UniversityError("Student is already in the group");
      }
  
      this.students.push(student);
    }
  
    removeStudentById(id: number) {
      const index = this.students.findIndex((student) => student.id === id);
  
      if (!~index) {
        throw new UniversityError("Student not found in group");
      }
  
      this.students.splice(index, 1);
    }
  
    getAverageGroupScore(): number {
      if (this.students.length) {
        return 0;
      }
  
      const totalScore = this.students.reduce(
        (sum, student) => sum + student.getAverageScore(),
        0
      );
  
      return totalScore / this.students.length;
    }
  
    getStudents() {
      return [...this.students];
    }
  }
  
  class Person {
    static nextId = 1;
  
    firstName: string;
    lastName: string;
    birthDay: Date;
    id: number;
    gender: string;
    contactInfo;
    role: Role;
  
    constructor(info, role: Role) {
      const { firstName, lastName, birthDay, gender, email, phone } = info;
  
      this.firstName = firstName;
      this.lastName = lastName;
      this.birthDay = birthDay;
      this.id = Person.nextId++;
      this.gender = gender;
      this.contactInfo = { email, phone };
      this.role = role;
    }
  
    get fullName(): string {
      return `${this.lastName} ${this.firstName}`;
    }
  
    get age(): number {
      const today = new Date();
      let age = today.getFullYear() - this.birthDay.getFullYear();
      const monthDiff = today.getMonth() - this.birthDay.getMonth();
  
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < this.birthDay.getDate())
      ) {
        age--;
      }
  
      return age;
    }
  }
  
  class Teacher extends Person {
    specializations = [];
    courses = [];
  
    constructor(info, specializations = []) {
      super(info, Role.Teacher);
      this.specializations = specializations;
    }
  
    assignCourse(course) {
      this.courses.push(course);
    }
  
    removeCourse(courseName: string) {
      this.courses = this.courses.filter((course) => course.name !== courseName);
    }
  
    getCourses() {
      return [...this.courses];
    }
  }
  
  class Student extends Person {
    academicPerformance = {
      totalCredits: 0,
      gpa: 0,
    };
    enrolledCourses = [];
    status: AcademicStatus;
  
    constructor(info) {
      super(info, Role.Student);
      this.status = AcademicStatus.Active;
    }
  
    enrollCourse(course) {
      if (this.status !== AcademicStatus.Active) {
        throw new UniversityError(
          "Cannot enroll: Student is not in active status"
        );
      }
  
      this.enrolledCourses.push(course);
      this.academicPerformance.totalCredits += course.credits;
    }
  
    getAverageScore(): number {
      return this.academicPerformance.gpa;
    }
  
    updateAcademicStatus(newStatus: AcademicStatus) {
      this.status = newStatus;
    }
  
    getEnrolledCourses() {
      return [...this.enrolledCourses];
    }
  }
  