import { CapitalizeSentencePipe } from './capitalize-sentence.pipe';

describe('CapitalizeSentencePipe', () => {
    let pipe: CapitalizeSentencePipe;

    beforeEach(() => {
        pipe = new CapitalizeSentencePipe();
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should capitalize only the first letter of a sentence', () => {
        expect(pipe.transform('hello world')).toBe('Hello world');
    });

    it('should handle sentences with mixed casing', () => {
        expect(pipe.transform('hElLo WoRLd')).toBe('Hello world');
    });

    it('should return an empty string if input is empty', () => {
        expect(pipe.transform('')).toBe('');
    });

    it('should handle single-letter input', () => {
        expect(pipe.transform('a')).toBe('A');
    });

    it('should handle already capitalized sentences', () => {
        expect(pipe.transform('Hello world')).toBe('Hello world');
    });

    it('should handle whitespace before the sentence', () => {
        expect(pipe.transform('   hello world')).toBe('   Hello world');
    });

    it('should handle null and undefined values', () => {
        expect(pipe.transform(null as any)).toBe('');
        expect(pipe.transform(undefined as any)).toBe('');
    });
});
