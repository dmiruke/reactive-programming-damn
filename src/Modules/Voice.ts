export module Voice {
    export function configureVoiceRecognition(commands: Object) {
        // Add our commands to annyang
        annyang.addCommands(commands);
        // Start listening. You can call this here, or attach this call to an event, button, etc.
        annyang.start();
    }

    export function say(phrase: string) {
        if (!speechSynthesis) return;
        var speechUtterance = new SpeechSynthesisUtterance(phrase);
        speechSynthesis.speak(speechUtterance);
    }
}