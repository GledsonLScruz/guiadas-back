import { afterEach, beforeEach, describe } from "mocha";
import { expect } from "chai";
import { createClass, deleteClass, getClasses } from "../src/services/classService";
import { ClassRepository } from "../src/repository/classRepository";
/** 
let semester = "2024.2";

function courseIdCreator(){
    const max = 9999999;
    const min = 1000000;
    return Math.floor(Math.random() * (max-min+1)+min);
}

describe ('Testes de repositório', function() {

    let repo: ClassRepository;

    beforeEach( function() {
        repo = new ClassRepository();
    });
    
    afterEach( function() {
        repo.deleteAllClasses();
    });

    it ('creates a new class entity', async function() {

        const pdw = await repo.createClass("PDW",semester,1411335);

        expect(pdw.dataValues.name).to.equals("PDW");
        expect(pdw.dataValues.semester).to.equals(semester);
        expect(pdw.dataValues.courseId).to.equals(1411335);

    });

    it ('verifies if all created classes are in the db', async function() {

        repo.createClass("P1",semester,courseIdCreator());
        repo.createClass("LP1",semester,courseIdCreator());
        repo.createClass("P2",semester,courseIdCreator());
        repo.createClass("LP2",semester,courseIdCreator());
        repo.createClass("PC",semester,courseIdCreator());

        const db = await repo.getAllClasses();

        expect(db.length).to.equal(5);
        
    });

    it ('tests the filtering function', async function() {

        const eda = await repo.createClass("EDA",semester,courseIdCreator());
        const leda = await repo.createClass("LEDA",semester,courseIdCreator());
        const fmcc1 = await repo.createClass("FMCC1",semester,courseIdCreator());
        const fmcc2 = await repo.createClass("FMCC2",semester,courseIdCreator());

        const f1 = (await repo.filteredClasses(eda.courseId))[0];
        const f2 = (await repo.filteredClasses(leda.courseId))[0];
        const f3 = (await repo.filteredClasses(fmcc1.courseId))[0];
        const f4 = (await repo.filteredClasses(fmcc2.courseId))[0];

        expect(eda.dataValues.name).to.equal(f1.dataValues.name);
        expect(eda.dataValues.semester).to.equal(f1.dataValues.semester);

        expect(leda.dataValues.name).to.equal(f2.dataValues.name);
        expect(leda.dataValues.semester).to.equal(f2.dataValues.semester);

        expect(fmcc1.dataValues.name).to.equal(f3.dataValues.name);
        expect(fmcc1.dataValues.semester).to.equal(f3.dataValues.semester);

        expect(fmcc2.dataValues.name).to.equal(f4.dataValues.name);
        expect(fmcc2.dataValues.semester).to.equal(f4.dataValues.semester);


    });

    it ('deletes a valid class', async function() {

        const p1 = await repo.createClass("P1",semester,courseIdCreator());

        repo.deleteClass(p1.id);

        expect((await repo.getAllClasses()).length).to.equals(0);
        
    });

    it ('tries to delete a class using an invalid id', async function() {

        const p1 = await repo.createClass("P1",semester,courseIdCreator());

        repo.deleteClass(p1.id+1);

        const classes = await repo.getAllClasses();
        expect(classes.length).to.equal(1);
        
    });

});

describe ('Testes de service', function() {

    let repo: ClassRepository;

    beforeEach( function() {
        repo = new ClassRepository();
    });
    
    afterEach( function() {
        repo.deleteAllClasses();
    });

    it ('creates a new valid class entity', async function() {

        const c1 = await createClass("p1",semester,1111111);

        expect(c1.dataValues.name).to.equal("p1");
        expect(c1.dataValues.semester).to.equal(semester);
        expect(c1.dataValues.courseId).to.equal(1111111);

    });

    it ('tries to create a class with invalid name (empty)', async function() {

        expect(createClass("",semester,courseIdCreator())).to.throw("Invalid class name"); 
        const classes = await getClasses();
        expect(classes.length).to.equal(0);

    });

    it ('tries to create a class with invalid name (blank)', async function() {

       
        expect(createClass("         ",semester,courseIdCreator())).to.throw("Invalid class name");
        const classes = await getClasses();
        expect(classes.length).to.equal(0);

    });

    it ('tries to create a class with an invalid semester (empty)', async function() {

        expect(createClass("P1","",courseIdCreator())).to.throw("Invalid semester"); 
        const classes = await getClasses();
        expect(classes.length).to.equal(0);

    });

    it ('tries to create a class with an invalid semester (blank)', async function() {

        expect(createClass("P1","       ",courseIdCreator())).to.throw("Invalid semester");
        const classes = await getClasses();
        expect(classes.length).to.equal(0);

    });

    it ('tries to create a class with an invalid semester (not long enough)', async function() {

        
        expect(createClass("P1","24.2",courseIdCreator())).to.throw("Invalid semester");
        const classes = await getClasses();
        expect(classes.length).to.equal(0);

    });

    it ('tries to create a class with an invalid semester (too long)', async function() {

        
        expect(createClass("P1","2024.2 (Gregoriano)",courseIdCreator())).to.throw("Invalid semester");
        const classes = await getClasses();
        expect(classes.length).to.equal(0);

    });

    it ('tries to create a class with an invalid course id (smaller than expected)', async function() {

        expect(createClass("P1",semester,111111)).to.throw("Invalid semester");

    });

    it ('tries to create a class with an invalid course id (larger than expected)', async function() {

        expect(createClass("P1",semester,11111111)).to.throw("Invalid semester");

    });

    it ('deletes a class through its id', async function() {

        const p1 = await createClass("P1",semester,courseIdCreator());

        deleteClass(p1.id);

        const classes = await getClasses();
        expect(classes.length).to.equal(0);

    });

    it ('tries to delete a class using an invalid id', async function() {

        const p1 = await createClass("P1",semester,courseIdCreator());

        expect(deleteClass(p1.id+1)).to.throw("Class could not be deleted");

        const classes = await getClasses();
        expect(classes.length).to.equal(1);

    });

});

describe ('Testes de controller', function() {

    let repo: ClassRepository;

    beforeEach( function() {
        repo = new ClassRepository();
    });
    
    afterEach( function() {
        repo.deleteAllClasses();
    });

    it ('creates a new class', async function() {

        //

    });

    it ('tries to create a new class using invalid attributes', async function() {

        //

    });

    it ('deletes a class using its id', async function() {

        //

    });

    it ('tries to delete a class using an invalid id', async function() {

        //

    });

});*/