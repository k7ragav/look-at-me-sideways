const {testName, lams, options, mocks, log} = require('../../../../lib/test-commons.js')(__dirname,{dirnameOffset:-2})
 
describe('Projects', () => {
	describe(testName, () => {
		let {spies, process, console} = mocks()
		let messages
		beforeAll( async () => {
			messages = await lams(options,{process, console});

			log(messages.filter(m=>m.rule=="F3"))
		})
		it("should not error out", ()=> {
			expect(console.error).not.toHaveBeenCalled()
		});
		it("it should not contain any unexpected parser (P0) errors", ()=> {
			expect({messages}).not.toContainMessage({
				rule: "P0",
				level: "error"
			});
		});
		it("it should not contain any parser syntax (P1) errors", ()=> {
			expect({messages}).not.toContainMessage({
				rule: "P1",
				level: "error"
			});
		});

		it("it should not error, because exempt, on F3 (counts must be filtered)", ()=> {
			expect({messages}).not.toContainMessage({
				rule: "F3",
				level: "error"
			});
		});

		it("it should provide aggregate info (1 match, 1 exempt, 0 error)", ()=> {
			expect({messages}).not.toContainMessage({
				rule: "F3",
				level: "info",
				description: "Evaluated 0 matches, with 1 exempt and 0 erroring"
			});
		});
	});
});