
// https://en.wikipedia.org/wiki/CHIP-8#Opcode_table


// http://www.multigesture.net/articles/how-to-write-an-emulator-chip-8-interpreter/
// https://github.com/mwales/chip8/blob/master/customRom/helloworld.rom

var opcode = [0x00, 0x00];
var phy_mem = new Array(4096);
var registers = new Array(16);
var index_register;
var program_ounter;
var graphics = new Array(64 * 32);
var delay_timer;
var sound_timer;
var stack = new Array(16);
var stack_pointer;
var key = new Array(16);


function open_hello_world() {
    console.log(new File(".", "/helloworld.rom").getAsBinary());
}

open_hello_world();


function disam_opcode(opcode) {
    return opcode.split('');
}





function setup() {
    setupGraphics();
    setupInput();

}

function main_loop() {
    for (; ;) {
        Chip8.emulateSingleCycle();

        if (Chip8.drawFlag) {
            drawGraphics();
        }

        Chip8.setKeys();
    }
}


var Chip8 = {
    init: function() { },
    emulateSingleCycle: function() {
        // Lookup Opcode
        // Decode Opcode
        // Execute Opcode
        // Update Timers
    }
};