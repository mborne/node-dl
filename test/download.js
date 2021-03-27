const expect = require("chai").expect;

const fs = require('fs');
const download = require('../index');

describe("Test download", function () {
    it("should work for a github readme", async function () {
        let targetPath = await download({
            sourceUrl: 'https://raw.githubusercontent.com/mborne/satis-gitlab/master/README.md',
            targetPath: '/tmp/readme.md',
            downloadIfExists: true
        });
        let content = fs.readFileSync(targetPath,'utf-8');
        expect(content).to.contain("Create SATIS project");
    });


    it("should not create file on failure", async function () {
        if ( fs.existsSync('/tmp/not-found.md') ){
            fs.unlinkSync('/tmp/not-found.md');
        }
        let catched = false;
        try {
            await download({
                sourceUrl: 'https://raw.githubusercontent.com/mborne/satis-gitlab/master/NOT-FOUND.md',
                targetPath: '/tmp/not-found.md',
                downloadIfExists: true
            });
        }catch(e){
            catched = true;
        }
        expect(fs.existsSync('/tmp/not-found.md')).to.equal(false);
        expect(catched).to.equal(true);
    });
});
