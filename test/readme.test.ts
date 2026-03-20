import { describe, expect, test } from 'bun:test';
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(import.meta.dir, '..');

describe('README', () => {
  test('documents how Agent tab users invoke gstack skills', () => {
    const content = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf-8');

    expect(content).toContain('### Using gstack in the GitHub Copilot Agent tab');
    expect(content).toContain('gstack skills are usually invoked by **intent**, not by typing literal slash commands');
    expect(content).toContain('If your Copilot client exposes a `/skills` picker');
    expect(content).toContain('## gstack');
    expect(content).toContain('use gstack by asking Copilot to use the matching skill in plain English');
    expect(content).toContain('If gstack skills are missing or stale');
  });
});
