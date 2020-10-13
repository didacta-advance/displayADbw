// input.onButtonPressed(Button.A, function () {

// })
basic.pause(1500);
function ispis(tekst: string) {
    let dd = tekst.length
    if (dd < 31) {
        salji(tekst)
    } else {
        salji("" + tekst.substr(0, 30) + "+")
        salji(tekst.substr(30, dd))
    }
}

function salji(tekst: string) {
    let duz = tekst.length
    let buf = pins.createBuffer(duz);
    for (let n = 0; n <= duz - 1; n++) {
        let bb = tekst.charCodeAt(n);
        buf.setNumber(NumberFormat.UInt8LE, n, bb);
    }
    pins.i2cWriteBuffer(0x11, buf, false);
    basic.pause(duz*8);
}



enum odabir {
    //% block=" "
    Bijelo = 0,
    //% block="#"
    Crno = 1
}


//% color=218 weight=103 
namespace Display {


    


    //% block="$x1 $x2 $x3 $x4 $x5 $x6 $x7 $x8"
    //% blockId="displayRed"
    //% blockHidden=true
    //% inlineInputMode=inline
    export function __red(x1: odabir, x2: odabir, x3: odabir, x4: odabir, x5: odabir, x6: odabir, x7: odabir, x8: odabir): number {
        return (
            x8
            | x7 << 1
            | x6 << 2
            | x5 << 3
            | x4 << 4
            | x3 << 5
            | x2 << 6
            | x1 << 7);
    }

    //% weight=100
    //% blockId=fooo
    //% block="BITMAP number %bitbr| $foof $foof1 $foof2 $foof3 $foof4 $foof5 $foof6 $foof7"
    //% foof.shadow="displayRed"
    //% foof1.shadow="displayRed"
    //% foof2.shadow="displayRed"
    //% foof3.shadow="displayRed"
    //% foof4.shadow="displayRed"
    //% foof5.shadow="displayRed"
    //% foof6.shadow="displayRed"
    //% foof7.shadow="displayRed"
    //% blockExternalInputs=true
    export function fooo(bitbr: number, foof: number, foof1: number, foof2: number, foof3: number, foof4: number, foof5: number, foof6: number, foof7: number): void {
        ispis("BIT;" + bitbr.toString() + ";" + foof.toString() + ";" + foof1.toString() + ";" + foof2.toString() + ";" + foof3.toString() + ";" + foof4.toString() + ";" + foof5.toString() + ";" + foof6.toString() + ";" + foof7.toString());
    }

    //% weight=99
    //% blockId=bit8x8
    //% block="SAVE: bitmap number (0-9) %n 8 x (0-255) | %red1 %red2 %red3 %red4 %red5 %red6 %red7 %red8 "
    //% inlineInputMode=inline
    export function bit8x8(n: number, red1: number, red2: number, red3: number, red4: number, red5: number, red6: number, red7: number, red8: number): void {
        ispis("BIT;" + n.toString() + ";" + red1.toString() + ";" + red2.toString() + ";" + red3.toString() + ";" + red4.toString() + ";" + red5.toString() + ";" + red6.toString() + ";" + red7.toString() + ";" + red8.toString());
        /*   let zbroj = [128,64,32,16,8,4,2,1] */
    }

    //% weight=98
    //% blockId=isbit8x8
    //% block="SHOW: bitmap number (0-9) %n on (0-84) x %x , (0-46) y %y with color (B/W) %boja"
    //% inlineInputMode=inline
    export function isbit8x8(n: number, x: number, y: number, boja: string): void {
        switch (boja) {
            case ("w"): boja = "W"; break;          
            case ("b"): boja = "B"; break;
            default: boja = "B";
        }
        ispis("SPR;" + n.toString() + ";" + x.toString() + ";" + y.toString() + ";" + boja);
    }

    //% weight=97
    //% blockId=scup
    //% block="SCROLL: UP for %n pixel"
    export function scup(n: number): void {
        ispis("SBU;" + n.toString());
    }

    //% weight=96
    //% blockId=scdown
    //% block="SCROLL: DOWN for %n pixel"
    export function scdown(n: number): void {
        ispis("SBD;" + n.toString());
    }

    //% weight=95
    //% blockId=sctxtup
    //% block="SCROLL: text UP for 1 row - loop(Y/N) %r"
    export function sctxtup(r: string): void {
        switch (r) {
            case ("y"): r = "R"; break;
            case ("n"): r = null; break;
            case ("Y"): r = "R"; break;
            case ("N"): r = null; break;
            default: r = null;
        }
        ispis("SCU;" + r);
    }

    //% weight=94
    //% blockId=sctxtdown
    //% block="SCROLL: text DOWN for 1 row - loop(Y/N) %r"
    export function sctxtdown(r: string): void {
        switch (r) {
            case ("y"): r = "R"; break;
            case ("n"): r = null; break;
            case ("Y"): r = "R"; break;
            case ("N"): r = null; break;
            default: r = null;
        }
        ispis("SCD;" + r);
    }

    //% weight=93
    //% blockId=ispunaekrana
    //% block="PAINT display: color %boja"
    export function ispunaekrana(boja: number): void {
        ispis("FIL;" + boja.toString());
    }

    //% weight=92
    //% blockId=ispispix
    //% block="SHOW: pixel - (0-84) x %x , (0-46) y %y and color(B/W or null) %boja"
    //% inlineInputMode=inline
    export function ispispix(x: number, y: number, boja: string): void {
        switch (boja) {
            case ("w"): boja = "W"; break;
            case ("b"): boja = "B"; break;
            default: boja = null;
        }
        ispis("PIX;" + x.toString() + ";" + y.toString() + ";" + boja);
    }

    //% weight=91
    //% blockId=brisi
    //% block="CLEAR SCREEN"
    export function brisi(): void {
        ispis("CLS");
    }

    //% weight=90
    //% blockId=kontrast
    //% block="SCREEN CONTRAST (0-100) %oc"
    export function kontrast(oc: number): void {
        ispis("CON;" + oc.toString());
    }

    //% weight=89
    //% blockId=isbuf
    //% block="SHOW: buffer"
    export function isbuf(): void {
        ispis("DIS");
    }

    //% weight=88
    //% blockId=ispistxtpix
    //% block="SHOW(G): text %tekst on col (0-84) x %x and row (0-48) y %y color(B/W or null) %boja"
    //% inlineInputMode=inline
    export function ispistxtpix(tekst: string, x: number, y: number, boja: string): void {
        switch (boja) {
            case ("w"): boja = "W"; break;
            case ("b"): boja = "B"; break;
            default: boja = null;
        }
        ispis(tekst + ";" + x.toString() + ";" + y.toString() + ";" + boja + ";G");
    }

    //% weight=87
    //% blockId=ispistxt
    //% block="SHOW: text %tekst - on col (0-10) x %x and row (0-5) y %y  color(B/W or null) %boja"
    //% inlineInputMode=inline
    export function ispistxt(tekst: string, x: number, y: number, boja: string): void {
        switch (boja) {
            case ("w"): boja = "W"; break;
            case ("b"): boja = "B"; break;
            default: boja = null;
        }
        ispis(tekst + ";" + x.toString() + ";" + y.toString() + ";" + boja);
    }

    //% weight=86
    //% blockId=bristxtpoz
    //% block="DELETE: text from %tekst letters on col (0-10) x %x and row (0-5) y %y"
    //% inlineInputMode=inline
    export function bristxtpoz(tekst: string, x: number, y: number, boja: string): void {
        let ispuna = [];
        for (let i = 0; i < tekst.length; i++) {
            ispuna.push(" ");
        }
        let celo = ispuna.join("");
        ispis(celo + ";" + x.toString() + ";" + y.toString() + ";0");
    }


    //% weight=85
    //% blockId=bitscrolltxt
    //% block="BIT SCROLL: (L/R) %str from col %x and row %y with loop(Y/N or null) %r"
    //% inlineInputMode=inline
    export function bitscrolltxt(str: string, x: number, y: number, r: string): void {
        switch (str) {
            case ("l"): str = "L"; break;
            case ("r"): str = "R"; break;
            default: str = "R";
        }

        switch (r) {
            case ("y"): r = "R"; break;
            case ("n"): r = null; break;
            case ("Y"): r = "R"; break;
            case ("N"): r = null; break;
            default: r = null;
        }

        ispis("SCC;" + str + ";" + x.toString() + ";" + y.toString() + ";" + r);
    }


    //% weight=84
    //% blockId=lin
    //% block="SHOW: line - x1(0-84) %x1 y1(0-48) %y1 do x2 %x2 y2 %y2 , color (B/W or null) %boja"
    //% inlineInputMode=inline
    export function lin(x1: number, y1: number, x2: number, y2: number, boja: string): void {
        switch (boja) {
            case ("w"): boja = "W"; break;
            case ("b"): boja = "B"; break;
            default: boja = null;
        }

        ispis("LIN;" + x1.toString() + ";" + y1.toString() + ";" + x2.toString() + ";" + y2.toString() + ";" + boja);
    }

    //% weight=83
    //% blockId=kruz
    //% block="SHOW: circle on x(0-84) %x y(0-48) %y , radius %r , line color (B/W) %boja and filled with (B/W or null) %isp"
    //% inlineInputMode=inline
    export function kruz(x: number, y: number, r: number, boja: string, isp: string): void {
        switch (boja) {
            case ("w"): boja = "W"; break;
            case ("b"): boja = "B"; break;
            default: boja = "B";
        }

        switch (isp) {
            case ("w"): isp = "W"; break;
            case ("b"): isp = "B"; break;
            default: isp = null;
        }

        ispis("CIR;" + x.toString() + ";" + y.toString() + ";" + r.toString() + ";" + boja + ";" + isp);
    }

    //% weight=82


    //% weight=81
    //% blockId=kvad
    //% block="SHOW: rectangle from x1 %x1 y1 %y1, with width %x2, height %y2 , color %boja (B/W) and fill %isp (B/W or null)"
    //% inlineInputMode=inline
    export function kvad(x1: number, y1: number, x2: number, y2: number, boja: string, isp: string): void {
        
        switch (boja) {
            case ("w"): boja = "W"; break;
            case ("b"): boja = "B"; break;
            default: boja = "B";
        }

        switch (isp) {
            case ("w"): isp = "W"; break;
            case ("b"): isp = "B"; break;
            default: isp = null;
        }

        ispis("REC;" + x1.toString() + ";" + y1.toString() + ";" + x2.toString() + ";" + y2.toString() + ";" + boja + ";" + isp);
    }


    //% weight=80
    //% blockId=zvuksignal
    //% block="SOUND: signal frequency %freq (0 - 500) and length %time (seconds 0 - 1000)"
    //% inlineInputMode=inline
    export function zvuksignal(freq: number, time: number){
        if(freq > 500){freq = 500;}
        if(freq < 0){freq = 0;}

        if(time > 1000){time = 1000;}
        if(time < 0){time = 0;}

        ispis("BIP;" +  freq.toString() + ";" + time.toString());
    }


    //% weight=79
    //% blockId=gumb
    //% block="BUTTON: increment (+/-) %pov direction (X ili Y) %smer for %kol (0 - 255)"
    //% inlineInputMode=inline
    export function gumb(pov: string, smer: string, kol: number){
        if ((pov != "+") && (pov != "-")){pov = "+";}
        
        switch (smer) {
            case ("x"): smer = "X"; break;
            case ("y"): smer = "Y"; break;
            case ("Y"): break;
            default: smer = "X";
        }

        if(kol > 255){kol = 255;}
        if(kol < 0){kol = 0;}

        ispis("BUT;" + pov + ";" + smer + ";" + kol.toString());
    }

    //% weight=78
    //% blockId=skok
    //% block="JUMP UP: pixel %sk (0-255)"
    //% inlineInputMode=inline
    export function skok(sk: number){
        if(sk > 255){sk = 255;}
        if(sk < 0){sk = 0;}

        ispis("JMP;" + sk.toString());
    }

    //% weight=77
    //% blockId=level
    //% block="LEVEL: auto, max.speed %maxb (20 - 255), start speed %pocb (20 - 255), change for %pr (0 - 255) speed on next level, and how much points needed to change level %bpr (0 - 255)"
    //% inlineInputMode=inline
    export function level(maxb: number, pocb: number, pr: number, bpr: number){
        if(maxb < 20){maxb = 20;}
        if(maxb > 255){maxb = 255;}

        if(pocb < 20){pocb = 20;}
        if(pocb > 255){pocb = 255;}

        if(pr > 255){pr = 255;}
        if(pr < 0){pr = 0;}

        if(bpr > 255){bpr = 255;}
        if(bpr < 0){bpr = 0;}

        ispis("LVL;" + maxb.toString() + ";" + pocb.toString() + ";" + pr.toString() + ";" + bpr.toString());
    }


    //% weight=76
    //% blockId=pozobj
    //% block="SAVE: object position  screen %bre (0-5), bitmap %brm (0-9), x pos. %x (0-9), y pos. %y (0-5) length %d (1-10)"
    //% inlineInputMode=inline
    export function pozobj(bre: number, brm: number, x: number, y: number, d: number){
        if(bre > 5){bre = 5;}
        if(bre < 0){bre = 0;}

        if(brm > 9){brm = 9;}
        if(brm < 0){brm = 0;}

        if(x > 80){x = 80;}
        if(x < 0){x = 0;}

        if(d > 10){d = 10;}
        if(d < 1){d = 1;}

        if(y > 5){y = 5;}
        if(y < 0){y = 0;}

        ispis("OBJ;" + bre.toString() + ";" + brm.toString() + ";" + x.toString() + ";" + y.toString() + ";" + d.toString());
    }


    //% weight=75
    //% blockId=prikazobj
    //% block="SHOW: screen number %bre (1-5)"
    //% inlineInputMode=inline
    export function prikazobj(bre: number){
        if(bre > 5){bre = 5;}
        if(bre < 0){bre = 1;}

        ispis("FX;" + bre.toString());
    }

    //% weight=74
    //% blockId=reset
    //% block="RESET PROGRAM"
    //% inlineInputMode=inline
    export function reset(){
        ispis("RST");
    }

    //% weight=73
    //% blockId=autoscHoriz
    //% block="GAME SCROLL horizontal %schz (y/n)"
    //% inlineInputMode=inline
    export function autoscHoriz(schz: string){
        switch (schz) {
            case ("y"): schz = "1"; break;
            case ("n"): schz = "0"; break;
            case ("Y"): schz = "1"; break;
            case ("N"): schz = "0"; break;            
            default: schz = "0";
        }

        ispis("ASD;" + schz);
    }

    //% weight=72
    //% blockId=trajanje
    //% block="GAME time %tr (0-255) sec."
    //% inlineInputMode=inline
    export function trajanje(tr: number){
        if(tr > 255){tr = 255;}
        if(tr < 0){tr = 0;}

        ispis("TIM;" + tr.toString());
    }

    //% weight=71
    //% blockId=bodovi
    //% block="POINTS at start %bod (0-255)"
    //% inlineInputMode=inline
    export function bodovi(bod: number){
        if(bod > 255){bod = 255;}
        if(bod < 0){bod = 0;}

        ispis("BOD;" + bod.toString());
    }

    //% weight=70
    //% blockId=negbodovi
    //% block="POINTS negative (yes)"
    //% inlineInputMode=inline
    export function negbodovi(){
        ispis("BON");
    }

    //% weight=69
    //% blockId=brziv
    //% block="LIVES at start %zbod (0-255)"
    //% inlineInputMode=inline
    export function brziv(zbod: number){
        if(zbod > 255){zbod = 255;}
        if(zbod < 0){zbod = 0;}

        ispis("LIV;" + zbod.toString());
    }

    //% weight=68
    //% blockId=vrata
    //% block="AUTO gate change"
    //% inlineInputMode=inline
    export function vrata(){
        ispis("DOR");
    }

    //% weight=67
    //% blockId=grav
    //% block="GRAVITY %g (y/n)"
    //% inlineInputMode=inline
    export function grav(g: string){
        switch (g) {
            case ("Y"): g = "1"; break;
            case ("N"): g = "0"; break;
            case ("y"): g = "1"; break;
            case ("n"): g = "0"; break;            
            default: g = "0";
        }

        ispis("GRV;" + g);
    }

    //% weight=66
    //% blockId=pad
    //% block="FALL %p (y/n)"
    //% inlineInputMode=inline
    export function pad(p: string){
        switch (p) {
            case ("Y"): p = "1"; break;
            case ("N"): p = "0"; break;
            case ("y"): p = "1"; break;
            case ("n"): p = "0"; break;            
            default: p = "0";
        }

        ispis("PAD;" + p);
    }

    //% weight=65
    //% blockId=brzhorsc
    //% block="GAME SCROLL speed %pix (10-255) for pixels %kol (1 - 2)"
    //% inlineInputMode=inline
    export function brzhorsc(pix: number, kol: number){
        if(pix > 255){pix = 255;}
        if(pix < 20){pix = 20;}

        if(kol > 2){kol = 2;}
        if(kol < 1){kol = 1;}

        ispis("SPD;" + pix.toString() + ";" + kol.toString());
    }

    //% weight=64
    //% blockId=pocpoz
    //% block="PLAYER start position x %x (0-9) , y %y (0-5)"
    //% inlineInputMode=inline
    export function pocpoz(x: number, y: number){
        if(x > 10){x = 10;}
        if(x < 0){x = 0;}

        if(y > 5){y = 5;}
        if(y < 0){y = 0;}

        ispis("POZ;" + x.toString() + ";" + y.toString());
    }


    //% weight=63
    //% blockId=randr
    //% block="RANDOM display flow"
    //% inlineInputMode=inline
    export function randr(){
        ispis("RND");
    }
}
