import React from 'react';
import { TypewriterEffectSmooth } from './homeSectionTypewriterEffect ';

interface TextRevealTypewriterProps{
    words: any;
}

export default function TextRevealTypewriter ({words}: TextRevealTypewriterProps) {
    return (
        <>
           <TypewriterEffectSmooth words={words} />
        </>
    )
}