import { afterEach, beforeEach, describe } from "mocha";
import { expect } from "chai";
import { CourseRepository } from "../src/repository/courseRepository";
import { createCourse, deleteCourse, filteredCourses, getCourses } from "../src/services/courseService";
import { before } from "node:test";



describe ('Testes de repositório', function() {

    let repo: CourseRepository;

    beforeEach( function() {
        repo = new CourseRepository();
        repo.deleteAllCourses();
    });

    afterEach( function() {
        repo.deleteAllCourses();
    });

    it ('creates a new course', async function() {

        const p1 = await repo.createCourse("P1");
        
        expect(p1.dataValues.name).to.equal("P1");
    });

    it ('verifies if the number of courses in the db is the same as those created and saved', async function() {

        let beforeCourses = await repo.getAllCourses();

        expect(beforeCourses.length).to.equal(0);

       await repo.createCourse("P1");
       await repo.createCourse("LP1");
       await repo.createCourse("FMCC1");
       await repo.createCourse("IC");
       await repo.createCourse("Lingua Portuguesa");

        
        let courses = await repo.getAllCourses();
        console.log(courses);
        expect(courses.length).to.equal(5);

    });

    it ('creates a number of different courses and tests the filtering function', function() {

        repo.createCourse("EDA");
        repo.createCourse("LEDA");
        repo.createCourse("FMCC1");
        repo.createCourse("FMCC2");

        const matched = repo.filteredCourses("FMCC");
        const unmatched = repo.filteredCourses("EDA");

        expect(matched).to.contain("FMCC1","FMCC2");
        expect(matched).to.not.contain("EDA","LEDA");

        expect(unmatched).to.contain("EDA", "LEDA");
        expect(unmatched).to.not.contain("FMCC1","FMCC2");

    });

    it ('deletes a valid course', async function() {
        
        const p1 = await repo.createCourse("PDW");
        repo.deleteCourse(p1.id);

        expect(repo.getAllCourses.length).to.equal(0);

    });

    it ('tries to delete a course with an invalid id', async function() {

        const pdw = await repo.createCourse("PDW");

        expect(repo.deleteCourse(pdw.id+1)).to.throw("Invalid course id");
        expect(repo.getAllCourses.length).to.equal(1);

    });

});

describe ('Testes de service', function() {

    let repo: CourseRepository;

    beforeEach( function() {
        repo = new CourseRepository();
        repo.deleteAllCourses();
    });

    afterEach( function() {
        repo.deleteAllCourses();
    });

    it ('creates a new valid course', async function() {

        const pdw = await createCourse("PDW");
        const courses = await getCourses();

        expect(courses.length).to.equal(1);
        expect(courses[0]).to.contain(pdw.name);

    });

    it ('tries to create a new course with an invalid (blank) name', function() {

        expect(createCourse("          ")).to.throw("Invalid course name");
        expect(getCourses.length).to.equal(0);

    });

    it ('tries to create a new course with an invalid (empty) name', function() {

        expect(createCourse("")).to.throw("Invalid course name");
        expect(getCourses.length).to.equal(0);

    });

    it ('verifies the number of created courses', async function() {

        createCourse("PDW");
        createCourse("TECCGI");
        createCourse("ING");
        createCourse("IA");
        createCourse("PC");

        const cadastradas = await getCourses();
        expect(cadastradas.length).to.equal(5);

    });

    it ('verifies the filter function', async function() {

        createCourse("EDA");
        createCourse("LEDA");
        createCourse("FMCC1");
        createCourse("FMCC2");

        const validFilter1 = await filteredCourses("eda");
        const validFilter2 = await filteredCourses("fmcc");

        expect(validFilter1.length).to.equal(2);
        expect(validFilter2.length).to.equal(2);
        expect(filteredCourses("")).to.throw("Invalid course name");

    });

    it ('deletes a valid course using its id', async function() {

        const c = await createCourse("PS");
        deleteCourse(c.dataValues.id)

        const db = await getCourses();
        expect(db.length).to.equal(0);

    });

    it ('tries to delete a course using an invalid id', async function() {

        const c = await createCourse("PS");
        expect(deleteCourse(c.id+1)).to.throw("Invalid course id");
        
        const db = await getCourses();
        expect(db.length).to.equal(1);

    });

});

describe ('Testes de controller', function() {

    let repo: CourseRepository;
    
    beforeEach( function() {
        repo = new CourseRepository();
        repo.deleteAllCourses();
    });

    afterEach( function() {
        repo.deleteAllCourses();
    });

    it ('posts a valid course', async function() {

        //

    });

    it ('tries to post a course with an invalid name', async function() {

        //

    });

    it ('recovers all registered courses', async function() {

        //

    });

    it ('deletes a course based on its id', async function() {

        //

    });

    it ('tries to delete a course based on its id', async function() {

        //

    });

});