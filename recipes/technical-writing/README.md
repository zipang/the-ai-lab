# Technical Writing

## Intent

Write and review technical prose in ASD-STE100 Simplified Technical English (STE). STE is a controlled natural language with restricted writing rules and a controlled vocabulary. It removes the "AI slop" from agent-written text and makes technical documentation clear and unambiguous.

## History and purpose

STE comes from the aerospace industry. In the late 1970s, European airlines asked the European aerospace industry to make maintenance documentation easier to read. Most of their mechanics did not speak English as a native language. Complex sentences and ambiguous words caused misunderstandings. Misunderstandings in maintenance can cause accidents.

The European Association of Aerospace Industries (AECMA, now ASD) developed the first version with support from the American aerospace industry. The AECMA Simplified English Guide appeared in 1986. The document became an international specification in 2005 and an international standard in 2025. Today the ASD Simplified Technical English Maintenance Group (STEMG) maintains the standard as ASD-STE100.

STE limits the language to a set of approved words, each with one meaning. It also restricts sentence structure: short sentences, one topic per sentence, and active voice. These rules make technical text easy to understand for all readers, native speakers or not.

AI agents can apply the same discipline to the prose they write. The skill fixes the form of AI-generated text, the part that reads like "slop". It enforces active voice, plain verbs, and consistent naming. It cannot make a hollow paragraph true, but it makes the form clean. Use STE-flavored mode for general prose such as READMEs, docs, and pull-request text. Use strict mode for procedures, runbooks, and error messages.

The full standard is free to download at [https://asd-ste100.org](https://asd-ste100.org).

## Usage

Ask the agent to load the `technical-writing` skill, then give it the text to write or review. The skill applies to technical documentation, READMEs, agent skills and instructions, pull-request text, error messages, release notes, and comments. It does not apply to code, identifiers, or command syntax. It is not for marketing copy or essays.

Deployment follows the process in the root `AGENTS.md` of this lab.

## References

| Component | Source |
| :-------- | :----- |
| Skill | [`skills/technical-writing/`](./skills/technical-writing/SKILL.md) |
