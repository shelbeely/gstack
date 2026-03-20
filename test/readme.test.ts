import { describe, expect, test } from 'bun:test';
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(import.meta.dir, '..');
const GSTACK_MD_BLOCK_PATTERN = /```md\n## gstack[\s\S]*?\n```/;
const isGstackSkillDirectory = (entry: fs.Dirent) =>
  entry.isDirectory()
  && !entry.name.startsWith('.')
  && fs.existsSync(path.join(ROOT, entry.name, 'SKILL.md.tmpl'));

const GSTACK_SKILLS = fs.readdirSync(ROOT, { withFileTypes: true })
  .filter(isGstackSkillDirectory)
  .map(entry => `/${entry.name}`)
  .sort();

describe('README', () => {
  test('documents how Agent tab users invoke gstack skills', () => {
    const content = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf-8');
    const copilotBlockMatch = content.match(GSTACK_MD_BLOCK_PATTERN);

    expect(content).toContain('This repository is the **`shelbeely/gstack` fork**');
    expect(content).toContain('## Quick start for GitHub Copilot Agent');
    expect(content).toContain('## Using gstack in the GitHub Copilot Agent tab');
    expect(content).toContain('GitHub Copilot Agent tab:** ask in plain English');
    expect(content).toContain('https://github.com/shelbeely/gstack.git');
    expect(content).not.toContain('Hi, I\'m [Garry Tan]');
    expect(content).not.toContain('garrytan/gstack');
    expect(content).not.toContain('https://github.com/garrytan/gstack');

    expect(copilotBlockMatch).not.toBeNull();
    const copilotBlock = copilotBlockMatch?.[0] ?? '';
    expect(copilotBlock).toContain('## gstack');
    expect(copilotBlock).toContain('Available gstack skills:');
    expect(copilotBlock).toContain('When a task matches one of the gstack skills below');

    for (const skill of GSTACK_SKILLS) {
      expect(copilotBlock).toContain(`- \`${skill}\``);
    }
  });
});
