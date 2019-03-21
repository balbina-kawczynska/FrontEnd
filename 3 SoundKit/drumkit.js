'use strict';
document.addEventListener('DOMContentLoaded', appStart);

const sounds = {
    // channel1: [3--]
    51: 'boom',
    52: 'clap',
    53: 'hihat',
    54: 'kick',
    55: 'openhat',
    56: 'ride',
    57: 'snare',
    48: 'tink',
    45: 'tom',
    // channel2: [w-p]
    119: 'boom',
    101: 'clap',
    114: 'hihat',
    116: 'kick',
    121: 'openhat',
    117: 'ride',
    105: 'snare',
    111: 'tink',
    112: 'tom',
    // channel3: [a-l]
    97: 'boom',
    115: 'clap',
    100: 'hihat',
    102: 'kick',
    103: 'openhat',
    104: 'ride',
    106: 'snare',
    107: 'tink',
    108: 'tom',
    // channel4: [z-.]
    122: 'boom',
    120: 'clap',
    99: 'hihat',
    118: 'kick',
    98: 'openhat',
    110: 'ride',
    109: 'snare',
    44: 'tink',
    46: 'tom'
};

let channel1 = [],
    channel2 = [],
    channel3 = [],
    channel4 = [],
    isRecording = false,
    recStart = null;

let channels = [ 
    channel1,
    channel2,
    channel3,
    channel4
];

function appStart() {
    // play one key sound
    window.addEventListener('keypress', playSound);

    // start recording, set time, change name on button
    document.querySelector('#rec').addEventListener('click',
        (e) => { 
            isRecording = !isRecording;
            recStart = Date.now();
            e.target.innerHTML = isRecording ? 'Stop' : 'Rec';
        });

    // play recorded music
    document.querySelector('#play').addEventListener('click', playMusic);


    // search all key tags for added 'playing' class
    const targetKey = document.querySelectorAll('.key'),
        keys = Array.from(targetKey);
    keys.forEach(
        key => key.addEventListener('transitionend', removeTransition)
    );

    // remove styling from played sound
    function removeTransition(e) {
        const targetKey = e.target.classList;
        if (targetKey.contains('playing')) targetKey.remove('playing');
    }
}

function playSound(e) {
    // get the name of the sound
    let soundName = sounds[e.charCode];
    // get <audio> html element
    let audioDOM = document.querySelector(`audio[id="${soundName}"]`);

    // add class to current playing sound
    const key = document.querySelector(`div[data-key="${e.charCode}"]`);
    key.classList.add('playing');

    // play sound
    audioDOM.currentTime = 0;
    audioDOM.play();

    // save the sound to channel array
    if (isRecording) {
        channels.forEach(channel => {
            channel.push({
                soundName: soundName,
                charCode: e.charCode,
                time: Date.now() - recStart
            });
        });
    }
}

//play composed music from channels
function playMusic() {
    channels.forEach(channel => {
        channel.forEach(sound => {
            setTimeout(
                () => {
                    let audioDOM = document.querySelector(`audio[id="${sound.soundName}"]`);
                    audioDOM.currentTime;
                    audioDOM.play();

                    // add class to current playing sound
                    const key = document.querySelector(`div[data-key="${sound.charCode}"]`);
                    key.classList.add('playing');
                }
                ,sound.time
            );
        });
    });
}