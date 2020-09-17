import { addMarkTag, addMarkTagWithOnClickHandler } from './helpers';

describe('test method addMarkTag', () => {
    it('should add mark tag with the given list of keywords ', () => {
        const keywords = ['cold', 'patient'];
        const text = 'In my opinion, this patient have cold and .....';
        const markedText = addMarkTag(text, keywords);
        console.log(markedText);
        const expectMarkedText = `In my opinion, this <mark onclick="alert('patient')">patient</mark> have <mark onclick="alert('cold')">cold</mark> and .....`;
        expect(markedText).toBe(expectMarkedText);
    });
});

describe('test method addMarkTagWithOnClickHandler', () => {
    it('should add mark tag with the given list of keywords ', () => {
        const keywords = ['cold', 'patient'];
        const text = 'In my opinion, this patient have cold and .....';
        const markedText = addMarkTagWithOnClickHandler(
            text,
            keywords,
            'alert'
        );
        console.log(markedText);
        const expectMarkedText = `In my opinion, this <mark onclick="alert('patient')">patient</mark> have <mark onclick="alert('cold')">cold</mark> and .....`;
        expect(markedText).toBe(expectMarkedText);
    });
});
