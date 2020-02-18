
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


let hello_world_rom = '';
let hello_world_code = '';
var oReq = new XMLHttpRequest();
oReq.open("GET", "./helloworld.rom", true);
oReq.responseType = "arraybuffer";
let arrayBuffer;
oReq.onload = function(oEvent) {
    arrayBuffer = oReq.response; // Note: not oReq.responseText
    if (arrayBuffer) {
        var byteArray = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteArray.byteLength; i++) {
        }
    }
    //     console.log(byteArray); end of scope that byteArray is available
    for (byt in byteArray) {

        hello_world_rom +=
            ('00' + byteArray[byt].toString(16)).slice(-2) || '';
    }
    hello_world_code = (hello_world_rom.toString().match(/.{1,4}/g));
    document.querySelector("p").innerHTML += hello_world_code
};

oReq.send(null)



// function open_hello_world() {
//     let fr = new FileReader();
//     console.log(fr.readAsBinaryString("helloworld.rom"));
// }

// open_hello_world();


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


/* OPCODES FOR HELLO WORLD
   0: "6278"  6XNN	Const	Vx = NN	Sets VX to NN. i.e sets addr#27 to 78.
   1: "a500"  ANNN	MEM	I = NNN	Sets I to the address NNN.
   2: "6301"  6XNN
   3: "6401"  6XNN
   4: "f10a"
   5: "00e0"  0NNN	Call		Calls RCA 1802 program at address NNN. 
   Not necessary for most ROMs.
   6: "f218"  FX18	Sound	sound_timer(Vx)	    Sets the sound timer to VX.
   7: "f129"  FX29	MEM	I=sprite_addr[Vx]   Sets I to the location of the 
   sprite for the character in VX. 
   Characters 0-F (in hexadecimal) 
   are represented by a 4x5 font.
   8: "d345" DXYN	Disp	draw(Vx,Vy,N)	    Draws a sprite at coordinate 
   (VX, VY) that has a width of 
   8 pixels and a height of N pixels. 
   Each row of 8 pixels is read as 
   bit-coded starting from memory 
   location I; I value doesn’t change
   after the execution of this 
   instruction. As described above, 
   VF is set to 1 if any screen pixels
   are flipped from set to unset when 
   the sprite is drawn, and to 0 if 
   that doesn’t happen.
   9: "1200"
*/


var Chip8 = {
    registers: { index: 0 },
    memory: {},
    init: function() {
        index = 0;
    },
    emulateSingleCycle: function() {
        // Lookup Opcode
        // Decode Opcode
        // Execute Opcode
        // Update Timers
    },
    lookupOpcode: function(op) {
        if (op.length == 4) {   // ensure opcode is 4 bytes
            this.decodeOpcode(op);
        }
    },
    decodeOpcode: function(op) {
        let dest, src;
        switch (op[0]) {
            case '6':
                dest = op.substr(1, 2);
                src = op.substr(2, 3);
                return Chip8.memory[dest] = src;
            case 'a':
            case 'A':
                Chip8.registers.index = op.substr(1, 4);
                console.log(Chip8.registers.index);
                return Chip8.registers.index;
        }

    }
};

