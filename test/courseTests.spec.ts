import { afterEach, beforeEach, describe } from "mocha";
import { expect } from "chai";
import { CourseRepository } from "../src/repository/courseRepository";
import { createCourse, deleteCourse, filteredCourses, getCourses } from "../src/services/courseService";
import { before } from "node:test";


describe('Testes de repositório Course', function () {

    let repo: CourseRepository;

    before(async function () {
        repo = new CourseRepository();
    });

    beforeEach(async function () {
        await repo.deleteAllCourses();
    });


    it('creates a new course', async function () {

        const p1 = await repo.createCourse("P1");

        expect(p1.dataValues.name).to.equal("P1");
    });

    it('verifies if the number of courses in the db is the same as those created and saved', async function () {

        let beforeCourses = await repo.getAllCourses();

        expect(beforeCourses.length).to.equal(0);

        await repo.createCourse("P1");
        await repo.createCourse("LP1");
        await repo.createCourse("FMCC1");
        await repo.createCourse("IC");
        await repo.createCourse("Lingua Portuguesa");


        let courses = await repo.getAllCourses();
        expect(courses.length).to.equal(5);

    });

    it('creates a number of different courses and tests the filtering function', async function () {

        let eda = await repo.createCourse("EDA");
        let leda = await repo.createCourse("LEDA");
        let fmcc1 = await repo.createCourse("FMCC1");
        let fmcc2 = await repo.createCourse("FMCC2");

        const matched = await repo.filteredCourses("FMCC");
        const unmatched = await repo.filteredCourses("EDA");

        expect(matched.length).to.equal(2);
        expect(matched[0].dataValues.name).to.equal(fmcc1.dataValues.name);
        expect(matched[1].dataValues.name).to.equal(fmcc2.dataValues.name);

        expect(unmatched.length).to.equal(2);
        expect(unmatched[0].dataValues.name).to.equal(eda.dataValues.name);
        expect(unmatched[1].dataValues.name).to.equal(leda.dataValues.name);
    });

    it('deletes a valid course', async function () {

        const p1 = await repo.createCourse("PDW");
        await repo.deleteCourse(p1.dataValues.id);

        expect((await repo.getAllCourses).length).to.equal(0);

    });

    it('should throw an error when course ID is invalid', async () => {
        try {
            const pdw = await repo.createCourse("PDW");
            await repo.deleteCourse(pdw.dataValues.id + 1);
        } catch (err: any) {
            expect(err.message).to.equal("Invalid course id");
        }
    });

});

describe('Testes de service Course', function () {

    let repo: CourseRepository;

    before(async function () {
        repo = new CourseRepository();
    });

    beforeEach(async function () {
        await repo.deleteAllCourses();
    });

    it('creates a new valid course', async function () {

        const pdw = await createCourse("PDW");
        const courses = await getCourses();

        expect(courses.length).to.equal(1);
        expect(courses[0].dataValues.name).to.equal(pdw.dataValues.name);

    });

    it('tries to create a new course with an invalid (blank) name', async function () {
        try {
            await createCourse("     ")
        }
        catch (err: any) {
            expect(err.message).to.equal("Invalid course name");
            expect(await getCourses.length).to.equal(0);

        }
    });

    it('tries to create a new course with an invalid (empty) name', async function () {
        try {
            await createCourse("")
        }
        catch (err: any) {
            expect(err.message).to.equal("Invalid course name");
            expect(await getCourses.length).to.equal(0);

        }
    });

    it('verifies the number of created courses', async function () {

        await createCourse("PDW");
        await createCourse("TECCGI");
        await createCourse("ING");
        await createCourse("IA");
        await createCourse("PC");

        const cadastradas = await getCourses();
        expect(cadastradas.length).to.equal(5);

    });

    it('verifies the filter function', async function () {
        await createCourse("EDA");
        await createCourse("LEDA");
        await createCourse("FMCC1");
        await createCourse("FMCC2");

        const validFilter1 = await filteredCourses("EDA");
        const validFilter2 = await filteredCourses("FMCC");

        expect(validFilter1.length).to.equal(2);
        expect(validFilter2.length).to.equal(2);

    });

    it('deletes a valid course using its id', async function () {

        const c = await createCourse("PS");
        await deleteCourse(c.dataValues.id)

        const db = await getCourses();
        expect(db.length).to.equal(0);

    });

    it('tries to delete a course using an invalid id', async function () {
        try {
            const c = await createCourse("PS");
            await deleteCourse(c.dataValues.id + 1);
        } catch (err: any) {
            expect(err.message).to.equal("Invalid course id");
            const db = await getCourses();
            expect(db.length).to.equal(1);
        }
    });

});

describe('Testes de controller', function () {

    let repo: CourseRepository;

    beforeEach(function () {
        repo = new CourseRepository();
        repo.deleteAllCourses();
    });

    afterEach(function () {
        repo.deleteAllCourses();
    });

    it('posts a valid course', async function () {

        //

    });

    it('tries to post a course with an invalid name', async function () {

        //

    });

    it('recovers all registered courses', async function () {

        //

    });

    it('deletes a course based on its id', async function () {

        //

    });

    it('tries to delete a course based on its id', async function () {

        //

    });

});