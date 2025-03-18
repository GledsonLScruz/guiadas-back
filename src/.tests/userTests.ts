import { afterEach, beforeEach, describe } from "mocha";
import { expect } from "chai";
import { User } from "../models/user";
import { UserRepository } from "../repository/userRepository";
import { getUsers, createUser, deleteUser, updateUser } from "../services/userService";
import { get } from "http";

let repo = new UserRepository();
let username = "Maníaco do Café";
let email = "joab@admin.ufcg.edu.br";
let password = "empadadefrango";
let semester = "2024.2";
let courseId = 1101101;

beforeEach( function() {
    repo = new UserRepository();
});

afterEach( function() {
    repo.deleteAllUsers();
});
// username, email, password, startsemester, courseid / all string except courseid
describe ('Testes de repositório', function() {

    it ('creates a new user', async function() {

        const u1 = await repo.createUser(username, email, password, semester, courseId);

        expect(u1.username).to.equal(username);
        expect(u1.email).to.equal(email);
        expect(u1.password).to.equal(password);
        expect(u1.startSemester).to.equal(semester);
        expect(Number(u1.enrolledCourseId)).to.equal(courseId);

    });

    it ('verifies if all new users are in the db', async function() {

        const u1 = await repo.createUser(username, email, password, semester, courseId);
        const u2 = await repo.createUser("seu"+username, "o"+email, password+12345, semester, courseId);

        const users = await getUsers();

        expect(users.length).to.equal(2);
    });

    it ('updates an existing user', async function() {

        const u1 = await repo.createUser(username, email, password, semester, courseId);

        expect(await repo.updateUser(u1.id,username, email, "password", semester, courseId)).to.equal(1);
        
    });

    it ('deletes an existing user', async function() {

        const u1 = await repo.createUser(username, email, password, semester, courseId);

        deleteUser(u1.id);

        const users = await getUsers();

        expect(users.length).to.equal(0);
        
    });

    it ('tries to delete an user using an invalid id', async function() {

        const u1 = await repo.createUser(username, email, password, semester, courseId);

        expect(deleteUser(u1.id+1)).to.equal(0);

        const users = await getUsers();

        expect(users.length).to.equal(0);
        
    });

});

describe ('Testes de service', function() {

    it ('creates a valid user', async function() {

        const u1 = await createUser(username, email, password, semester, String(courseId));

        expect(u1.username).to.equal(username);
        expect(u1.email).to.equal(email);
        expect(u1.password).to.equal(password);
        expect(u1.startSemester).to.equal(semester);
        expect(u1.enrolledCourseId).to.equal(String(courseId));

    });

    it ('tries to create a user with a blank username', async function() {

        expect(await createUser("      ", email, password, semester, String(courseId))).to.throw("Invalid name");

    });

    it ('tries to create a user with an empty username', async function() {

        expect(await createUser("", email, password, semester, String(courseId))).to.throw("Invalid name");

    });

    it ('tries to create a user using an invalid email', async function() {

        expect(await createUser(username, "emaildocurso#ufcg.edu.br", password, semester, String(courseId))).to.throw("Invalid email");

    });

    it ('tries to create a user with invalid email (non-UFCG)', async function() {

        expect(await createUser(username, "claudiolucena@ccj.uepb.edu.br", password, semester, String(courseId))).to.throw("Invalid email");

    });

    it ('tries to create a user with blank password', async function() {

        expect(await createUser(username, email, "      ", semester, String(courseId))).to.throw("Invalid password");

    });

    it ('tries to create a user with empty password', async function() {

        expect(await createUser(username, email, "", semester, String(courseId))).to.throw("Invalid password");

    });

    it ('tries to create a user with a short password', async function() {

        expect(await createUser(username, email, "senha", semester, String(courseId))).to.throw("Invalid password");

    });

    it ('tries to create a user with a blank start semester', async function() {

        expect(await createUser(username, email, password, "   ", String(courseId))).to.throw("Invalid semester");

    });

    it ('tries to create a user with an empty start semester', async function() {

        expect(await createUser(username, email, password, "", String(courseId))).to.throw("Invalid semester");

    });

    it ('tries to create a user with a wrong-sized semester', async function() {

        expect(await createUser(username, email, password, "24.2", String(courseId))).to.throw("Invalid semester");

    });

    it ('tries to create a user with blank course id', async function() {

        expect(await createUser(username, email, password, semester, "     ")).to.throw("Invalid course id");

    });

    it ('tries to create a user with empty course id', async function() {

        expect(await createUser(username, email, password, semester, "")).to.throw("Invalid course id");

    });

    it ('tries to create a user with wrong course id (size != 7)', async function() {

        expect(await createUser(username, email, password, semester, "96321")).to.throw("Invalid course id");

    });

    it ('successfully updates a user', async function() {

        const u1 = await createUser(username, email, password, semester, String(courseId));

        updateUser(u1.id, username, email, "novasenha", semester, String(courseId));

        const user = await getUsers()[0];
        expect(user.password).to.equal("novasenha")

    });

    it ('tries to update a user using a wrong id', async function() {

        const u1 = await createUser(username, email, password, semester, String(courseId));

        updateUser(u1.id+1, username, email, "novasenha", semester, String(courseId));

        const user = await getUsers()[0];
        expect(user.password).to.equal(password);

    });

    it ('deletes a user using its id', async function() {

        const u1 = await createUser(username, email, password, semester, String(courseId));

        deleteUser(u1.id);

        const user = await getUsers();
        expect(user.length).to.equal(0);

    });

    it ('tries to delete a user using a wrong id', async function() {

        const u1 = await createUser(username, email, password, semester, String(courseId));

        deleteUser(u1.id+1);

        const user = await getUsers();
        expect(user.length).to.equal(1);

    });
    
});

describe ('Testes de controller', function() {

    it ('creates a new user', async function() {

        //

    });

    it ('tries to create a new user with invalid attributes', async function() {

        //

    });

    it ('updates an existing user', async function() {

        //

    });

    it ('tries to update an existing user using an invalid id', async function() {

        //

    });

    it ('deletes an existing user', async function() {

        //

    });

    it ('tries to delete an existing user using an invalid id', async function() {

        //

    });

});