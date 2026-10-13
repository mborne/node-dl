import { expect } from "chai";

import {readFileSync, writeFileSync, existsSync, unlinkSync, mkdtempSync, readdirSync} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import download from "../index.js";

describe("Test download", function () {
    it("should work for a github readme", async function () {
        let targetPath = await download({
            sourceUrl: 'https://raw.githubusercontent.com/mborne/satis-gitlab/master/README.md',
            targetPath: '/tmp/readme.md'
        });
        let content = readFileSync(targetPath,'utf-8');
        expect(content).to.contain("Create SATIS project");
    });

    it("should remove existing", async function () {
        writeFileSync('/tmp/readme.md.part', 'incomplete previous download...');
        let targetPath = await download({
            sourceUrl: 'https://raw.githubusercontent.com/mborne/satis-gitlab/master/README.md',
            targetPath: '/tmp/readme.md'
        });
        let content = readFileSync(targetPath,'utf-8');
        expect(content).to.contain("Create SATIS project");
        expect(existsSync('/tmp/readme.md.part')).to.equal(false);
    });

    it("should respect downloadIfExists", async function () {
        const SAMPLE_CONTENT = 'should-not-change';
        writeFileSync('/tmp/readme.md', SAMPLE_CONTENT);
        let targetPath = await download({
            sourceUrl: 'https://raw.githubusercontent.com/mborne/satis-gitlab/master/README.md',
            targetPath: '/tmp/readme.md',
            downloadIfExists: false
        });
        let content = readFileSync(targetPath,'utf-8');
        expect(content).to.contain(SAMPLE_CONTENT);
    });


    it("should work for a github readme without ssl checks", async function () {
        let targetPath = await download({
            sourceUrl: 'https://raw.githubusercontent.com/mborne/satis-gitlab/master/README.md',
            targetPath: '/tmp/readme.md',
            downloadIfExists: true,
            unsafeSsl: true
        });
        let content = readFileSync(targetPath,'utf-8');
        expect(content).to.contain("Create SATIS project");
    });


    it("should not create file on failure", async function () {
        if ( existsSync('/tmp/not-found.md') ){
            unlinkSync('/tmp/not-found.md');
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
        expect(existsSync('/tmp/not-found.md')).to.equal(false);
        expect(catched).to.equal(true);
    });

    it("should reject with an Error when temp file can't be created", async function () {
        let error = null;
        try {
            await download({
                sourceUrl: 'https://raw.githubusercontent.com/mborne/satis-gitlab/master/README.md',
                targetPath: '/tmp/not-found-dir/readme.md'
            });
        }catch(e){
            error = e;
        }
        expect(error).to.be.instanceOf(Error);
    });

    it("should not interpret shell syntax in targetPath and sourceUrl", async function () {
        const dir = mkdtempSync(join(tmpdir(), 'node-dl-'));
        const targetPath = await download({
            sourceUrl: 'https://raw.githubusercontent.com/mborne/satis-gitlab/master/README.md?$(touch ' + join(dir, 'INJECTED-URL') + ')',
            targetPath: join(dir, 'readme$(touch INJECTED).md')
        });
        expect(targetPath).to.equal(join(dir, 'readme$(touch INJECTED).md'));
        expect(existsSync(targetPath)).to.equal(true);
        expect(readdirSync(dir)).to.deep.equal(['readme$(touch INJECTED).md']);
    });
});
