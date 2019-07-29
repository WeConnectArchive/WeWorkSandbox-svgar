import { CreatePredicate } from "./create";
import { expect } from 'chai';
import 'mocha';
import { Project } from "../../models/schema/Project";

describe('given the predicate create', () => {

    describe('when staging a new project', () => {

        it('should return an empty project', () => {
            let Create = new CreatePredicate();
    
            const result = Create.Project("empty");
            expect(result).to.be.instanceOf(Project)
        });

    });

    describe('when creating name data', () => {

        let Create = new CreatePredicate();
        const result = Create.NameData("Test Name");

        it('should create a key for "original-name"', () => {
            expect(result["original-name"]).to.not.equal(undefined);
        })

        it('should store unmodified input under the key "original-name"', () => {
            expect(result["original-name"]).to.equal("Test Name");
        });

        it('should create a key for "sanitized-name"', () => {
            expect(result["sanitized-name"]).to.not.equal(undefined);
        })

        it('should store the input in snake_case under the key "sanitized-name"', () => {
            expect(result["sanitized-name"]).to.equal("test_name");
        });

    });

});